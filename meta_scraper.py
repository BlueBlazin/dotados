import asyncio
from tqdm import tqdm
import numpy as np
from aiohttp import ClientSession
from bs4 import BeautifulSoup
from pathlib import Path
import cv2
from utils import fetch, run_task, BASE_DOTA_URL, BASE_URL, read_players

log = []


async def fetch_img_url(session, player):
    url = f"{BASE_DOTA_URL}/{player}"

    html = await fetch(session, url)

    soup = BeautifulSoup(html, 'html.parser')

    data = soup.find('div', class_='infobox-image')
    src = data.find('img').attrs['src']
    return f"{BASE_URL}{src}"


# async def download_image(session, player):
#     save_dir = Path('.') / 'raw_images'

#     if not save_dir.exists():
#         save_dir.mkdir()

#     path = save_dir / f'{player}.jpg'

#     if "<!--" not in player:
#         try:
#             url = await fetch_img_url(session, player)
#             if url != "":
#                 async with session.get(url, verify_ssl=False) as response:
#                     try:
#                         data = await response.read()
#                         async with aiofiles.open(path.resolve(), 'wb') as f:
#                             await f.write(data)
#                             return
#                     except Exception:
#                         log.append(player)
#         finally:
#             data = np.full((100, 100, 3), fill_value=255)
#             cv2.imwrite(str(path), data)


async def download_image(session, player, save_dir):
    url = await fetch_img_url(session, player)

    path = save_dir / f'{player}.jpg'

    async with session.get(url, verify_ssl=False) as response:
        data = await response.read()
        with path.open('wb') as f:
            f.write(data)


async def download_player_images():
    players = read_players()

    save_dir = Path('.') / 'raw_images'
    if not save_dir.exists():
        save_dir.mkdir()

    async with ClientSession() as session:
        for player in tqdm(players[:994]):
            try:
                await download_image(session, player, save_dir)
            except Exception:
                path = save_dir / f'{player}.jpg'
                cv2.imwrite(str(path), np.full((100, 100, 3), fill_value=255))
            await asyncio.sleep(5)


if __name__ == "__main__":
    run_task(download_player_images())

    print("The following players need to be handled manually:\n", log)

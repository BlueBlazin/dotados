import asyncio
from pathlib import Path

BASE_URL = "https://liquipedia.net"
BASE_DOTA_URL = f"{BASE_URL}/dota2"


async def fetch(session, url):
    async with session.get(url, verify_ssl=False) as response:
        return await response.text()


def run_task(task):
    loop = asyncio.get_event_loop()
    loop.run_until_complete(task)


def read_players():
    path = Path('.') / 'data' / 'players.csv'

    with path.open('r') as f:
        players = f.read().split('\n')[1:]

    return players

import pickle
import itertools
import cv2
from pathlib import Path
from graph_scraper import Team  # noqa
from edit_image import center_and_save, resize_image
from concurrent.futures import ProcessPoolExecutor


def get_all_players(teams):
    players = set([])

    for team in teams:
        try:
            for roster in team.rosters:
                roster = [p.strip() for p in roster]
                players |= set(roster)
        except AttributeError:
            continue

    return players


def write_all_players():
    path = Path('.') / 'data' / 'players.csv'

    if path.exists():
        return

    with open('team_rosters.pkl', 'rb') as f:
        teams = pickle.load(f)

    players = get_all_players(teams)

    with path.open('w') as csvfile:
        csvfile.write("Player\n")
        csvfile.writelines("\n".join(players))


def process_image(src: Path):
    name = src.name
    dst = Path('.') / 'data' / 'images' / name

    center_and_save(str(src), str(dst))


def process_all_images():
    dst_path = Path('.') / 'data' / 'images'

    if not dst_path.exists():
        dst_path.mkdir()

    pattern = '*.jpg'

    all_globs = [
        (Path('.') / f'raw_images{s}').glob(pattern) for s in ['', '2']]
    all_paths = itertools.chain(*all_globs)

    with ProcessPoolExecutor() as executor:
        executor.map(process_image, all_paths)


def filter_image(src: Path):
    name = src.name
    dst = Path('.') / 'data' / 'filtered_images' / name

    img = cv2.imread(str(src), cv2.IMREAD_UNCHANGED)
    dims = img.shape

    if dims[0] == 200 and dims[1] == 200:
        if img[0, 0, 0] == 255 and img[0, 0, 1] == 255 and img[0, 0, 2] == 255:
            if img[-1, -1, 0] == 255 and img[-1, -1, 1] == 255 and img[-1, -1, 2] == 255:
                return

    img = resize_image(img, 75)
    cv2.imwrite(str(dst), img)


def filter_images():
    src_path = Path('.') / 'data' / 'images'

    dst_dir = Path('.') / 'data' / 'filtered_images'

    if not dst_dir.exists():
        dst_dir.mkdir()

    all_paths = src_path.glob('*.jpg')

    with ProcessPoolExecutor() as executor:
        executor.map(filter_image, list(all_paths))


if __name__ == "__main__":
    write_all_players()

    if False:
        process_all_images()
        filter_images()

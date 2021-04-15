import asyncio
from aiohttp import ClientSession
from bs4 import BeautifulSoup
import itertools
from pathlib import Path
from parser import parse_template
import pickle
from utils import fetch, run_task, BASE_URL, BASE_DOTA_URL, Team
import time
from more_itertools import chunked
from tqdm import tqdm


TEAMS_URL = f"{BASE_DOTA_URL}/Portal:Teams"
TI_URL = f"{BASE_DOTA_URL}/The_International"
TIER_ONE_URL = f"{BASE_DOTA_URL}/Tier_1_Tournaments"


##############################################################################
# Get teams
##############################################################################

async def get_tier1_tournaments(session):
    html = await fetch(session, TIER_ONE_URL)

    soup = BeautifulSoup(html, 'html.parser')

    links = soup.find_all('div', class_='Tournament')
    links = [f"{BASE_URL}{link.b.a['href']}" for link in links]

    return links


async def get_teams_from_tournament(session, url):
    html = await fetch(session, url)

    soup = BeautifulSoup(html, 'html.parser')

    team_cards = soup.find_all('div', class_='teamcard')
    teams = [card.find('a') for card in team_cards]

    teams = [team.text for team in teams if team is not None]

    return teams


async def get_teams_from_region(session, region):
    url = f"{TEAMS_URL}/{region}"

    html = await fetch(session, url)

    soup = BeautifulSoup(html, 'html.parser')

    teams = soup.find_all('span', class_='team-template-text')
    teams = [team.text for team in teams]

    return teams


async def get_teams_from_ti(session, year):
    url = f"{TI_URL}/{year}"

    return await get_teams_from_tournament(session, url)


async def get_teams(session):
    teams_from_regions = [
        get_teams_from_region(session, "Europe"),
        get_teams_from_region(session, "Americas"),
        get_teams_from_region(session, "China"),
        get_teams_from_region(session, "Southeast_Asia")
    ]

    # teams_from_tis = [get_teams_from_ti(session, str(year))
    #                   for year in range(2011, 2020)]
    tier1_tournaments = await get_tier1_tournaments(session)

    teams_from_tier1_tournaments = [get_teams_from_tournament(session, url)
                                    for url in tier1_tournaments]

    combined_futures = [*teams_from_regions, *teams_from_tier1_tournaments]

    return await asyncio.gather(*combined_futures)


async def write_all_teams(overwrite=False):
    path = Path('.') / 'data' / 'teams.csv'

    if overwrite or not path.exists():
        async with ClientSession() as session:
            teams = await get_teams(session)
            teams = list(set(itertools.chain(*teams)))

        with path.open('w') as f:
            f.write("Teams\n")
            f.write("\n".join(teams))

##############################################################################
# Build graph
##############################################################################


def read_teams():
    teams_path = Path('.') / 'data' / 'teams.csv'

    with teams_path.open('r') as f:
        teams = f.read().split('\n')[1:]

    return teams


async def get_rosters(session, team):
    url = f"{BASE_DOTA_URL}/index.php?title={team}&action=edit&section=3"

    html = await fetch(session, url)

    soup = BeautifulSoup(html, 'html.parser')

    textarea = soup.find_all('textarea')

    if textarea is not None and textarea != []:
        rosters = parse_template(textarea[0].text)
        return Team(name=team, rosters=rosters)
    else:
        return []


async def get_all_team_rosters(overwrite=False):
    save_path = Path('.') / 'team_rosters.pkl'

    if not overwrite and save_path.exists():
        return

    teams = read_teams()

    async with ClientSession() as session:
        all_rosters = []

        for teams_chunk in tqdm(list(chunked(teams, 3))):
            futures = [get_rosters(session, team) for team in teams_chunk]

            chunk_rosters = await asyncio.gather(*futures)
            all_rosters.extend(chunk_rosters)
            time.sleep(2)

    with save_path.open('wb') as f:
        pickle.dump(all_rosters, f)


##############################################################################
if __name__ == "__main__":
    # run_task(write_all_teams(overwrite=True))

    # print("Finished scraping all team URLs. Scraping players.")
    time.sleep(2)

    run_task(get_all_team_rosters(overwrite=True))

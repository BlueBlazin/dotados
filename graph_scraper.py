import asyncio
from aiohttp import ClientSession
from bs4 import BeautifulSoup
import itertools
from pathlib import Path
from parser import parse_template
from dataclasses import dataclass
from typing import List
import pickle
from utils import fetch, run_task, BASE_DOTA_URL


TEAMS_URL = f"{BASE_DOTA_URL}/Portal:Teams"
TI_URL = f"{BASE_DOTA_URL}/The_International"


##############################################################################
# Get teams
##############################################################################


async def get_teams_from_region(session, region):
    url = f"{TEAMS_URL}/{region}"

    html = await fetch(session, url)

    soup = BeautifulSoup(html, 'html.parser')

    teams = soup.find_all('span', class_='team-template-text')
    teams = [team.text for team in teams]

    return teams


async def get_teams_from_ti(session, year):
    url = f"{TI_URL}/{year}"

    html = await fetch(session, url)

    soup = BeautifulSoup(html, 'html.parser')

    team_cards = soup.find_all('div', class_='teamcard')
    teams = [card.find('a') for card in team_cards]

    teams = [team.text for team in teams if team is not None]

    return teams


async def get_teams(session):
    teams_from_regions = [
        get_teams_from_region(session, "Europe"),
        get_teams_from_region(session, "Americas"),
        get_teams_from_region(session, "China"),
        get_teams_from_region(session, "Southeast_Asia")
    ]

    teams_from_tis = [get_teams_from_ti(session, str(year))
                      for year in range(2011, 2020)]

    combined_futures = [*teams_from_regions, *teams_from_tis]

    return await asyncio.gather(*combined_futures)


async def write_all_teams():
    path = Path('.') / 'data' / 'teams.csv'

    if not path.exists():
        async with ClientSession() as session:
            teams = await get_teams(session)
            teams = set(itertools.chain(*teams))
            teams = [team.replace(' ', '_') for team in teams]

        with path.open('w') as csvfile:
            csvfile.write("Teams\n")
            csvfile.write("\n".join(teams))

##############################################################################
# Build graph
##############################################################################


@dataclass
class Team:
    name: str
    rosters: List[List[str]]


def read_teams():
    teams_path = Path('.') / 'data' / 'teams.csv'

    with teams_path.open('r') as f:
        teams = f.read().split('\n')[1:]

    return teams


async def get_rosters(session, team):
    url = f"https://liquipedia.net/dota2/index.php?title={team}&action=edit"

    html = await fetch(session, url)

    soup = BeautifulSoup(html, 'html.parser')

    textarea = soup.find('textarea')

    if textarea is not None:
        rosters = parse_template(textarea.text)
        return Team(name=team, rosters=rosters)
    else:
        return []


async def get_all_team_rosters():
    save_path = Path('.') / 'team_rosters.pkl'

    if save_path.exists():
        return

    teams = read_teams()

    async with ClientSession() as session:
        futures = [get_rosters(session, team) for team in teams]

        all_rosters = await asyncio.gather(*futures)

    with save_path.open('wb') as f:
        pickle.dump(all_rosters, f)


##############################################################################
if __name__ == "__main__":
    run_task(write_all_teams())

    run_task(get_all_team_rosters())

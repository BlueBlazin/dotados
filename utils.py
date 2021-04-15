import pickle
import asyncio
from pathlib import Path
from dataclasses import dataclass
from typing import List

BASE_URL = "https://liquipedia.net"
BASE_DOTA_URL = f"{BASE_URL}/dota2"


@dataclass
class Team:
    name: str
    rosters: List[List[str]]


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


def rectify_team_rosters():
    src_path = Path('.') / 'team_rosters_merged.pkl'
    dst_path = Path('.') / 'team_rosters_merged.pkl'

    with src_path.open('rb') as f:
        teams = pickle.load(f)

    new_teams = []

    for team in teams:
        if team == []:
            continue

        corrected_rosters = []

        for roster in team.rosters:
            roster = [p.split('<!--')[0] for p in roster]
            roster = [p.strip() for p in roster]
            corrected_rosters.append(roster)

        new_team = Team(name=team.name, rosters=corrected_rosters)
        new_teams.append(new_team)

    with dst_path.open('wb') as f:
        pickle.dump(new_teams, f)


def merge_team_rosters(files):
    dst_path = Path('.') / 'team_rosters_merged.pkl'
    all_teams = []
    seen = set()

    for filepath in files:
        with open(filepath, 'rb') as f:
            teams = pickle.load(f)

        for team in teams:
            if team != [] and team.name not in seen:
                all_teams.append(team)
                seen.add(team.name)

    with dst_path.open('wb') as f:
        pickle.dump(all_teams, f)


def read_teams():
    path = Path('.') / 'team_rosters_merged.pkl'

    with path.open('rb') as f:
        teams = pickle.load(f)

    return teams


if __name__ == "__main__":
    # merge_team_rosters(['team_rosters.pkl',
    #                     'team_rosters2.pkl',
    #                     'team_rosters_old.pkl',
    #                     'team_rosters.pkl copy'])
    rectify_team_rosters()

from utils import read_teams, Team
from collections import defaultdict
from pathlib import Path
import json


def add_roster_to_graph(roster, team, g):
    players = set([name.lower() for name in roster])

    for player in players:
        teammates = players - {player}

        if player not in g:
            g[player] = defaultdict(set)

        for teammate in teammates:
            g[player][teammate].add(team)


def add_team_to_graph(team: Team, g):
    for roster in team.rosters:
        add_roster_to_graph(roster, team.name, g)


def construct_graph():
    teams = read_teams()

    g = {}

    for team in teams:
        add_team_to_graph(team, g)

    return g


def cleanup_graph(g):
    for player in g:
        for teammate in g[player]:
            g[player][teammate] = list(g[player][teammate])

    return g


def write_graph():
    path = Path('.') / 'data' / 'graph.json'

    g = construct_graph()

    g = cleanup_graph(g)

    with path.open('w') as f:
        json.dump(g, f, indent=2)


if __name__ == "__main__":
    write_graph()

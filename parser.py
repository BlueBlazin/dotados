def parse_roster(lines, i):
    roster = []

    while i < len(lines):
        line = lines[i].strip()

        if line.startswith(r"{{Roster player"):
            values = line.split("|")

            for value in values:
                if value.startswith("player="):
                    player = value.split("=")[-1]
                    roster.append(player)
            i += 1
        else:
            return i, roster


def parse_template(source: str):
    lines = source.split("\n")

    rosters = []

    i = 0
    while i < len(lines):
        line = lines[i].strip()

        if line.startswith(r"{{Roster start"):
            i, roster = parse_roster(lines, i + 1)

            if len(roster) >= 2:
                rosters.append(roster)
        else:
            i += 1

    return rosters

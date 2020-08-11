export class Graph {
  constructor(data) {
    this.g = data;
    this.players = Object.keys(this.g);
  }

  findSeparation(playerA, playerB) {
    if (!this.g[playerA]) {
      return null;
    }

    const queue = [playerA];
    const parents = { [playerA]: playerA };

    let player;

    while (queue.length > 0) {
      player = queue.shift();

      if (player === playerB) {
        return this.makePath(parents, playerB);
      }

      for (let teammate of Object.keys(this.g[player])) {
        if (!parents[teammate]) {
          queue.push(teammate);
          parents[teammate] = player;
        }
      }
    }

    return null;
  }

  makePath(parents, player) {
    const path = [];

    let parent;

    while (parents[player] !== player) {
      parent = parents[player];

      path.push({
        player1: parent,
        player2: player,
        teams: this.g[parent][player],
      });

      player = parent;
    }

    path.reverse();

    return path;
  }
}

import React, { useState, useEffect } from "react";
import { data } from "../../data/graph";
import { Graph } from "../../graph";

import PlayerSelectBox from "../PlayerSelectBox";
import ConnectionPath from "../ConnectionPath";
import DegreesCircle from "../DegreesCircle";
import styles from "./separation.module.scss";

function Separation({ playerA, playerB, setPlayerA, setPlayerB, graph }) {
  // const graph = new Graph(data);

  // const [playerA, setPlayerA] = useState(null);
  // const [playerB, setPlayerB] = useState(null);
  const [degrees, setDegrees] = useState(0);
  const [path, setPath] = useState([]);

  useEffect(() => {
    if (playerA && playerB) {
      const path = graph.findSeparation(playerA, playerB);

      if (path !== null) {
        setPath(path);
        setDegrees(path.length);
        return;
      }
    }

    setPath([]);
    setDegrees(0);
  }, [playerA, playerB]);

  return (
    <div className={styles.container}>
      <div className={styles["player_select_container"]}>
        <PlayerSelectBox
          playerStr="A"
          playerNames={graph.players}
          handleInputChange={(event, newValue) => {
            setPlayerA(newValue);
          }}
          value={playerA}
        />
        <DegreesCircle degrees={degrees} />
        <PlayerSelectBox
          playerStr="B"
          playerNames={graph.players}
          handleInputChange={(event, newValue) => {
            setPlayerB(newValue);
          }}
          value={playerB}
        />
      </div>
      <ConnectionPath path={path} />
    </div>
  );
}

export default Separation;

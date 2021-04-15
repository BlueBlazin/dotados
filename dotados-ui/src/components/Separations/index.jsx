import React, { useState, useEffect } from "react";

import PlayerSelectBox from "../PlayerSelectBox";
import ConnectionPath from "../ConnectionPath";
import DegreesCircle from "../DegreesCircle";
import styles from "./separation.module.scss";

function Separation({ playerA, playerB, updatePlayerA, updatePlayerB, graph }) {
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
            updatePlayerA(newValue);
          }}
          value={playerA}
        />
        <DegreesCircle degrees={degrees} />
        <PlayerSelectBox
          playerStr="B"
          playerNames={graph.players}
          handleInputChange={(event, newValue) => {
            updatePlayerB(newValue);
          }}
          value={playerB}
        />
      </div>
      <ConnectionPath path={path} />
    </div>
  );
}

export default Separation;

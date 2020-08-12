import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { data } from "./data/graph";
import { Graph } from "./graph";
import Separation from "./components/Separations";
import styles from "./app.module.scss";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  const graph = new Graph(data);

  const [playerA, setPlayerA] = useState(null);
  const [playerB, setPlayerB] = useState(null);

  const getRandomPlayer = () => {
    return graph.players[Math.floor(Math.random() * graph.players.length)];
  };

  function randomPlayer() {
    setPlayerA(getRandomPlayer());
    setPlayerB(getRandomPlayer());
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={styles.header}>
        <Tooltip title="all random">
          <div onClick={randomPlayer} className={styles["random-aegis"]}></div>
        </Tooltip>
      </div>
      <div className={styles.container}>
        <Separation
          playerA={playerA}
          playerB={playerB}
          setPlayerA={setPlayerA}
          setPlayerB={setPlayerB}
          graph={graph}
        />
      </div>
      <div className={styles.footer}>
        <span>
          <Link to="/about">About</Link>
        </span>

        <span>Thanks for the connections • Thanks for the Dota</span>

        <span>
          <Link to="/attributions">Attributions</Link>
        </span>
      </div>
    </ThemeProvider>
  );
}

export default App;

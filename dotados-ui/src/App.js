import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Link, useParams, useHistory } from "react-router-dom";

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
  const history = useHistory();
  const { playerA = null, playerB = null } = useParams();

  function updatePlayerA(value) {
    if (value === null) {
      history.push(`/`);
    } else {
      if (playerB === null) {
        history.push(`/${value}`);
      } else {
        history.push(`/${value}/${playerB}`);
      }
    }
  }

  function updatePlayerB(value) {
    if (playerA !== null) {
      if (value === null) {
        history.push(`/${playerA}`);
      } else {
        history.push(`/${playerA}/${value}`);
      }
    }
  }

  const getRandomPlayer = () => {
    return graph.players[Math.floor(Math.random() * graph.players.length)];
  };

  function randomPlayer() {
    history.push(`/${getRandomPlayer()}/${getRandomPlayer()}`);
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
          updatePlayerA={updatePlayerA}
          updatePlayerB={updatePlayerB}
          graph={graph}
        />
      </div>
      <div className={styles.footer}>
        <span>
          <Link to="/about">About</Link>
        </span>

        {/* <span>Thanks for the connections • Thanks for the Dota</span> */}
        <span>Thanks for the Dota</span>

        <span>
          <Link to="/attributions">Attributions</Link>
        </span>
      </div>
    </ThemeProvider>
  );
}

export default App;

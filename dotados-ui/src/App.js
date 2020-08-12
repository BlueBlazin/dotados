import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
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
        <span>Thanks for the connections • Thanks for the Dota</span>
      </div>
    </ThemeProvider>
  );
}

export default App;

// const styles = {
//   backgroundColor: "#222831",
//   display: "flex",
//   justifyContent: "center",
// };

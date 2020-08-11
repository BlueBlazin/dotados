import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Separation from "./components/Separations";
import styles from "./app.module.scss";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <div className={styles.container}>
          <Separation />
        </div>
        <div className={styles.footer}>
          <span>Thanks for the connections • Thanks for the Dota</span>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;

// const styles = {
//   backgroundColor: "#222831",
//   display: "flex",
//   justifyContent: "center",
// };

import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Separation from "./components/Separations";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div style={styles}>
        <Separation />
      </div>
    </ThemeProvider>
  );
}

export default App;

const styles = {
  backgroundColor: "#222831",
  display: "flex",
  justifyContent: "center",
};

import React from "react";
import Card from "@material-ui/core/Card";

import FadeIn from "../FadeIn";
import styles from "./connectionpath.module.scss";

function ConnectionPath({ path }) {
  const capitalize = (name) => `${name[0].toUpperCase()}${name.slice(1)}`;

  return (
    <div className={styles.container}>
      <div>
        {path.map(({ player1, player2, teams }, i) => {
          let playerOne = capitalize(player1);
          let playerTwo = capitalize(player2);
          let teamsFormatted = teams.map((team) => team.replaceAll("_", " "));

          return (
            <FadeIn key={`${player1}-${player2}`} mass={1 + 3 * i}>
              <Card elevation={3} className={styles.card}>
                <span style={{ fontWeight: "bold" }}>{playerOne}</span>
                {" played with "}
                <span style={{ fontWeight: "bold" }}>{playerTwo}</span>
                {` on ${teamsFormatted.join(", ")}.`}
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
}

export default ConnectionPath;

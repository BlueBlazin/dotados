import React from "react";
import Card from "@material-ui/core/Card";
import { AnimatedList } from "react-animated-list";

import styles from "./connectionpath.module.scss";

function ConnectionPath({ path }) {
  const capitalize = (name) => `${name[0].toUpperCase()}${name.slice(1)}`;

  return (
    <div className={styles.container}>
      <AnimatedList animation="grow">
        {path.map(({ player1, player2, teams }) => {
          let playerOne = capitalize(player1);
          let playerTwo = capitalize(player2);
          let teamsFormatted = teams.map((team) => team.replace("_", " "));

          return (
            <Card
              elevation={3}
              className={styles.card}
              key={`${player1}-${player2}`}
            >
              <span style={{ fontWeight: "bold" }}>{playerOne}</span>
              {" played with "}
              <span style={{ fontWeight: "bold" }}>{playerTwo}</span>
              {` on ${teamsFormatted.join(", ")}.`}
            </Card>
          );
        })}
      </AnimatedList>
    </div>
  );
}

export default ConnectionPath;

// {/* {path && (
//         <FlipMove>
//           {path.map(({ player1, player2, teams }) => {
//             let playerOne = capitalize(player1);
//             let playerTwo = capitalize(player2);
//             let teamsFormatted = teams.map((team) => team.replace("_", " "));

//             return (
//               <Card
//                 elevation={3}
//                 className={styles.card}
//                 key={`${player1}-${player2}`}
//               >
//                 <span style={{ fontWeight: "bold" }}>{playerOne}</span>
//                 {" played with "}
//                 <span style={{ fontWeight: "bold" }}>{playerTwo}</span>
//                 {` on ${teamsFormatted.join(", ")}.`}
//               </Card>
//             );
//           })}
//         </FlipMove>
//       )} */}

//       {/* {path.length > 0 && (
//         <FlipMove>
//           {path.map(({ player1, player2, teams }) => {
//             let playerOne = capitalize(player1);
//             let playerTwo = capitalize(player2);
//             let teamsFormatted = teams.map((team) => team.replace("_", " "));

//             return (
//               <Card
//                 elevation={3}
//                 className={styles.card}
//                 key={`${player1}-${player2}`}
//               >
//                 <span style={{ fontWeight: "bold" }}>{playerOne}</span>
//                 {" played with "}
//                 <span style={{ fontWeight: "bold" }}>{playerTwo}</span>
//                 {` on ${teamsFormatted.join(", ")}.`}
//               </Card>
//             );
//           })}
//         </FlipMove>
//       )} */}

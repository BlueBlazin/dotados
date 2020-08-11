import React from "react";
import Card from "@material-ui/core/Card";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";

import styles from "./connectionpath.module.scss";

// function ConnectionPath({ path }) {
//   const capitalize = (name) => `${name[0].toUpperCase()}${name.slice(1)}`;

//   return (
//     <div className={styles.container}>
//       <Timeline>
//         {path &&
//           path.map(({ player1, player2, teams }) => {
//             let playerOne = capitalize(player1);
//             let playerTwo = capitalize(player2);

//             return (
//               <TimelineItem>
//                 <TimelineSeparator>
//                   <TimelineDot style={{ backgroundColor: "#393e46" }}>
//                     {/* <div className={styles.dot} /> */}
//                   </TimelineDot>
//                   <TimelineConnector className={styles.connector} />
//                 </TimelineSeparator>
//                 <TimelineContent>
//                   <Card
//                     elevation={3}
//                     className={styles.card}
//                     key={`${player1}-${player2}`}
//                   >
//                     <span style={{ fontWeight: "bold" }}>{playerOne}</span>
//                     {" played with "}
//                     <span style={{ fontWeight: "bold" }}>{playerTwo}</span>
//                     {` on ${teams.join(", ")}.`}
//                   </Card>
//                 </TimelineContent>
//               </TimelineItem>
//             );
//           })}
//       </Timeline>
//     </div>
//   );
// }

function ConnectionPath({ path }) {
  const capitalize = (name) => `${name[0].toUpperCase()}${name.slice(1)}`;

  return (
    <div className={styles.container}>
      {path &&
        path.map(({ player1, player2, teams }) => {
          let playerOne = capitalize(player1);
          let playerTwo = capitalize(player2);

          return (
            <Card
              elevation={3}
              className={styles.card}
              key={`${player1}-${player2}`}
            >
              <span style={{ fontWeight: "bold" }}>{playerOne}</span>
              {" played with "}
              <span style={{ fontWeight: "bold" }}>{playerTwo}</span>
              {` on ${teams.join(", ")}.`}
            </Card>
          );
        })}
    </div>
  );
}

export default ConnectionPath;

import React from "react";
import Card from "@material-ui/core/Card";

import styles from "./degreescircle.module.scss";

function DegreesCircle({ degrees }) {
  const radius = 55;
  const strokeWidth = 15;
  const size = 150;
  const viewBox = `0 0 ${size} ${size}`;

  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * degrees) / 6;

  return (
    <Card className={styles.container}>
      <svg width={size} height={size} viewBox={viewBox}>
        <circle
          className={styles.circle}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          className={styles.progress}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
            stroke: "#d65a31",
          }}
        />
        <text
          className={styles.text}
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
        >
          {degrees}
        </text>
      </svg>
    </Card>
  );
}

export default DegreesCircle;

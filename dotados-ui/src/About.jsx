import React from "react";

function About() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#222831",
        padding: 100,
        boxSizing: "border-box",
        color: "#eeeeee",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "60vw" }}>
        <div>
          <span style={{ fontSize: 28 }}>About</span>
        </div>
        <div>
          <p>
            I love it when I find out about an unexpected connection between two
            Dota players. I made this website to discover some more. Good luck,
            have fun!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;

import React from "react";

function Attributions() {
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
          <span style={{ fontSize: 28 }}>Attributions</span>
        </div>
        <div>
          <p>
            Information about players and team rosters was acquired from
            Liquipedia:{" "}
            <a style={{ color: "#eee" }} href="https://liquipedia.net/">
              liquipedia.net
            </a>
            . Thanks to everyone at Liquipedia for maintaining the wiki and
            keeping it up to date. Your efforts are appreciated.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Attributions;

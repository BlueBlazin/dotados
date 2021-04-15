import React from "react";
import styles from "./playerselectbox.module.scss";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import matchSorter from "match-sorter";

function PlayerSelectBox({ playerStr, playerNames, handleInputChange, value }) {
  const filterOptions = (options, { inputValue }) => {
    return matchSorter(options, inputValue).slice(0, 20);
  };

  return (
    <Card className={styles.container}>
      <CardContent className={styles.content}>
        <div className={styles.header}>
          <Avatar alt={value} src="" />
          <div className={styles.title}>
            <Typography
              style={{
                fontSize: 19,
                alignSelf: "center",
              }}
            >
              {`Player ${playerStr}`}
            </Typography>
          </div>
        </div>

        <div className={styles.autocomplete}>
          <Autocomplete
            options={playerNames}
            renderOption={(option) => <span>{option}</span>}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Type a name"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
            value={value}
            onChange={handleInputChange}
            filterOptions={filterOptions}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default PlayerSelectBox;

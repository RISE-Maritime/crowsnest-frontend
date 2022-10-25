import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
// Icons
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const GridCenter = styled(Grid)(({ theme }) => ({
  display: "grid",
  placeItems: "center",
  borderStyle: "solid",
  borderColor: theme.palette.primary.main,
  borderRadius: "0.4rem",
  margin: "1rem",
}));

export default function ConnectionStatus({ connectionName, isConnected }) {
  return (
    <Grid container>
      <GridCenter item xs={12}>
        <h1>{connectionName}</h1>
        <h2>
          Connected:
          {isConnected ? (
            <CheckIcon sx={{ fontSize: "2rem", color: "#2eb847" }} />
          ) : (
            <CloseIcon sx={{ fontSize: "2rem", color: "#9d1b1b" }} />
          )}
        </h2>
      </GridCenter>
    </Grid>
  );
}

ConnectionStatus.propTypes = {
  connectionName: PropTypes.string.isRequired,
  isConnected: PropTypes.bool,
};

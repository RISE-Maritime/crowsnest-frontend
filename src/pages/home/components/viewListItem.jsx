import React from "react";
import { styled } from "@mui/material/styles";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function viewListItem(props) {
  const GridCenter = styled(Grid)(() => ({
    display: "grid",
    placeItems: "center",
  }));

  return (
    <GridCenter item xs={12}>
      <Button
        component={Link}
        to={props.routeLink}
        variant="outlined"
        sx={{
          width: "95%",
          maxWidth: "350px",
          margin: "0.5rem",
          color: "#1d3658",
          display: "flex",
          justifyContent: "flex-start",
          borderColor: "#1d3658",
        }}
      >
        {props.icon}
        <h2
          style={{
            marginLeft: "2rem",
          }}
        >
          {props.viewName}
        </h2>
      </Button>
    </GridCenter>
  );
}

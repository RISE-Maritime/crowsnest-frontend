import React from "react";
import { styled , useTheme} from "@mui/material/styles";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

const GridCenter = styled(Grid)(() => ({
  display: "grid",
  placeItems: "center",
}));

export default function viewListItem(props) {
  const theme = useTheme();
  return (
    <GridCenter item xs={6}>
      <Button
        component={Link}
        to={props.routeLink}
        variant="outlined"
        sx={{
          width: "95%",
          maxWidth: "350px",
          margin: "0.5rem",
          color: theme.palette.info.main,
          display: "flex",
          justifyContent: "flex-start",
          borderColor: theme.palette.info.main,
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

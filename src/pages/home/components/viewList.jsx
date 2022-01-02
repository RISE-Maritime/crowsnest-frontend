import React from "react";
import ROUTES from "../../../ROUTES.json";
import { styled, useTheme } from "@mui/material/styles";
import { Grid } from "@mui/material";
import ViewListItem from "./viewListItem";
// Icons
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";

const GridCenter = styled(Grid)(() => ({
  display: "grid",
  placeItems: "center",
}));

export default function viewList() {

  const theme = useTheme();

  return (
    <Grid container>
      <GridCenter item xs={12}>
        <div
          style={{
            width: "95%",
            height: "0.3rem",
            backgroundColor: theme.palette.info.main,
            margin: "2rem",
            borderRadius: "1rem",
          }}
        ></div>
      </GridCenter>
      <GridCenter item xs={12}>
        <h2 style={{ color: theme.palette.primary.contrastText, }}>View list</h2>
      </GridCenter>

      <ViewListItem
        routeLink={ROUTES.DATA_FLOW}
        viewName={"Data Flow"}
  
        icon={
          <InsightsRoundedIcon
            sx={{
              fontSize: "4rem",
              color: theme.palette.info.main,
            }}
          />
        }
      />
      <ViewListItem
        routeLink={ROUTES.ECDIS}
        viewName={" ECDIS"}
        icon={
          <MapRoundedIcon
            sx={{
              fontSize: "4rem",
              color: theme.palette.info.main,
            }}
          />
        }
      />
      <ViewListItem
        routeLink={ROUTES.CONNING}
        viewName={"Conning"}
        icon={
          <SpeedRoundedIcon
            sx={{
              fontSize: "4rem",
              color: theme.palette.info.main,
            }}
          />
        }
      />
      <ViewListItem
        routeLink={ROUTES.DATA_FLOW}
        viewName={"Remote control"}
        icon={
          <SportsEsportsRoundedIcon
            sx={{
              fontSize: "4rem",
              color: theme.palette.info.main,
            }}
          />
        }
      />
    </Grid>
  );
}

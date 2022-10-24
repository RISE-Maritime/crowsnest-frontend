import React, {useEffect} from "react";
import { Grid, Stack } from "@mui/material";
import ControlThruster from "./components/ControlBowThruster";
import ControlEngPS from "./components/ControlEngPS"
import ControlRudder from "./components/ControlRudder";

// function useKeyPress(targetKey) {
//   // State for keeping track of whether key is pressed
//   const [keyPressed, setKeyPressed] = useState<boolean>(false);

 
//   };



export default function index() {

 // If pressed key is our target key then set to true
 const downHandler = ({ key }) => {
  if (key === "g") {
    // setKeyPressed(true);
    console.log(key);
  }
}

// If released key is our target key then set to false
const upHandler = ({ key }) => {
  console.log(key);
  if (key === "h") {
    // setKeyPressed(false);
    console.log("HERE",key);
  }
}

   // Add event listeners
   useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); 




  return (
    <Grid container>

      <Grid
        item
        xs={12}
        sx={{ display: "grid", placeItems: "center", height: "20vh" }}
      >



        <Stack direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}>
          <ControlEngPS />
          {/* <ControlENG /> */}

          <ControlThruster />

          <ControlRudder />


          {/* <p align="center"><iframe src="https://sensor-insight.web.app/sea_air" width="100%" height="200" scrolling="no"></iframe></p>
          <p align="center"><iframe src="https://turunavantouimarit.web.app/outside" width="100%" height="200" scrolling="no"></iframe></p> */}

        </Stack>

      </Grid>

    </Grid>
  );
}

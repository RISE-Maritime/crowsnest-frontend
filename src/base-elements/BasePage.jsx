import React from "react";
import NavigationBar from "./navbar";
import { useTheme } from "@mui/material/styles";
import FloatApp from "./components/mini_app/FloatApp";
// Recoil
import { showMiniAppsObj } from "../globalAtomsSelectors";
import { useRecoilValue } from "recoil";
export default function BasePage(props) {
  const theme = useTheme();
  let showMiniApp = useRecoilValue(showMiniAppsObj);
  return (
    <>
      <NavigationBar />

      {/* Mini APPs */}
      {showMiniApp.test ? <FloatApp /> : null}

      <div
        style={{
          minHeight: "94vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {props.children}
      </div>

      {/* { 0 === 0 ?  <FloatApp /> : null }  */}
    </>
  );
}

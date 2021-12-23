import { atom } from "recoil";

// App Settings / State 
export const appState = atom({
  key: "appState",
  default: {
    activeView: "Active view",
    activeMode: "DEMO MODE",
    activeVessel: "DEMO Vessel",
    appActiveColorTheme: "dark",
  },
});

// Mini apps show or hide mini apps (floating and resizable window)
export const showMiniAppsObj = atom({
  key: "showMiniAppsObj",
  default: {
    test: false,
  },
});

export const appNavMenuIndex = atom({
  key: "appNavMenuIndex",
  default: 0,
});

export const themeModeValue = atom({
  key: "themeModeValue",
  default: "dark",
});

export const isLoggedIn = atom({
  key: "isLoggedIn",
  default: true,
});

export const userObject = atom({
  key: "userObject",
  default: {
    access_token: "",
    name: "Demo User",
    user_group: "Test account",
    default_station: "CST",
  },
});

export interface Theme {
  primary: string;
  warning: string;
  text: string;
  title: string;
  background: string;
  surface: string;
  navBackground: string;
  border: string;
  iconColor: string;
  iconColorFocused: string;
}

export const Colors: { light: Theme; dark: Theme } = {
  dark: {
    primary: "#0074BE",
    warning: "#cc475a",
    text: "#d4d4d4",
    title: "#fff",
    background: "#252231",
    surface: "#2f2b3d",
    navBackground: "#201e2b",
    border: "#094786",
    iconColor: "#9591a5",
    iconColorFocused: "#fff",
  },

  light: {
    primary: "#0074BE",
    warning: "#cc475a",
    text: "#4A5565",
    title: "#3E4955",
    background: "#F7F9FC",
    surface: "#FFFFFF",
    navBackground: "#e8e7ef",
    border: "#094786",
    iconColor: "#686477",
    iconColorFocused: "#201e2b",
  },
};

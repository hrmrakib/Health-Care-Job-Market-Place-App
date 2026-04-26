export interface Theme {
  primary: string;
  success: string;
  error: string;
  warning: string;
  text: string;
  title: string;
  background: string;
  surface: string;
  link: string;
  navBackground: string;
  border: string;
  iconColor: string;
  iconColorFocused: string;
}

export const Colors: { light: Theme; dark: Theme } = {
  dark: {
    primary: "#0074BE",
    success: "#27AE60",
    error: "#cc475a",
    warning: "#cc475a",
    text: "#d4d4d4",
    title: "#fff",
    background: "#252231",
    surface: "#2f2b3d",
    link: "#0074BE",
    navBackground: "#201e2b",
    border: "#094786",
    iconColor: "#9591a5",
    iconColorFocused: "#fff",
  },

  light: {
    primary: "#0074BE",
    success: "#27AE60",
    error: "#cc475a",
    warning: "#cc475a",
    text: "#4A5565",
    title: "#3E4955",
    background: "#F7F9FC",
    surface: "#FFFFFF",
    link: "#0074BE",
    navBackground: "#e8e7ef",
    border: "#094786",
    iconColor: "#686477",
    iconColorFocused: "#201e2b",
  },
};

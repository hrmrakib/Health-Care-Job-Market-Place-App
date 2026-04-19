import { ReactNode } from "react";
import { ThemeProvider } from "./context/ThemeContext";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default AppLayout;

import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme/Theme.js";
import GlobalStyle from "../theme/GlobalStyle.js";

const Layout = ({ children }) => (
  <div>
    <GlobalStyle />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </div>
);

export default Layout;

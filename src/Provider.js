import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    background: "#FFFFFF",
    altBackground: "#EFF2F2",
    main: "#1A1D24",
    accent: "#E4A71A",
    secondary: "#B5BFCB",
    weakSecondary: "#DDE7F3",
    strongSecondary: "#9CA6B2",
    brandGradient: [
      "#1ee1d0",
      "#42d6d2",
      "#56cbd3",
      "#64c0d5",
      "#6fb5d7",
      "#78aad8",
      "#7f9ed9",
      "#8593db",
      "#8a86dc",
      "#8e7add",
      "#916dde"
    ]
  }
};

const Provider = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Provider;

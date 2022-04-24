import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
}
  body {
    padding: 0;
    margin: 0;
  }
  *{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  }
  a {
  color: inherit;
  text-decoration: none;
}
`;

export default GlobalStyle;

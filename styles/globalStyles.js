import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
    display: "flex";
    flex-direction: "column";
    min-height: "100%";
    width: "100%";
    -moz-osx-font-smoothing: "grayscale";
    -webkit-font-smoothing: antialiased;
  }
  body {
    padding: 0;
    margin: 0;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
    
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  #__next {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  #nprogress {
    pointer-events: none;
  }
  #nprogress .bar {
    background-color: #5048E5;
    height: 3;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2000;
  }
`;

export default GlobalStyle;

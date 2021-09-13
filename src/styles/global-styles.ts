import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: white;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  }

  * {
    box-sizing: border-box;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }

  .flex.row > section:not(:first-of-type) {
    margin-left: 0;
  }

  .flex.column > section:not(:first-of-type) {
    margin-top: 0;
  }
`;

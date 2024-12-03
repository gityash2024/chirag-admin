import { createGlobalStyle } from 'styled-components';

// GlobalStyle component to reset global styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;  // This will ensure the body has no margin
    padding: 0; // Remove any padding if present
  }
`;

export default GlobalStyle;

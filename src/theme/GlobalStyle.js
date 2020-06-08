import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 *, *::before, *::after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
    }

    #root {
        padding: 15px;
    }
`;

export default GlobalStyle;

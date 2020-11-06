import { createGlobalStyle } from "styled-components";

import { HeaderBar } from "./components";
import { Canvas } from "./containers";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }
`;

function App() {
  return (
    <>
      <GlobalStyles></GlobalStyles>
      <HeaderBar></HeaderBar>
      <Canvas></Canvas>
    </>
  );
}

export default App;

import React from "react";
import { Provider } from "./components/ui/provider";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Provider>
      <HomePage />
    </Provider>
    
  );
}

export default App;

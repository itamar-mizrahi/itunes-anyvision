import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Itunes from "./components/Itunes";
import Song from "./components/Song";
import "./components/main.css";


export const Context = React.createContext();

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Itunes} />
        <Route exact path="/itunes/:id" render={props => <Song {...props} />} />
      </div>
    </Router>
  );
};

export default App;

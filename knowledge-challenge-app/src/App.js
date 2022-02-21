import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "./Components/Homepage";

function App() {
  return (
    <div className="App-Wrapper">
      <Switch>
        <Route exact path="/">
          <Redirect to="/Homepage" />
        </Route>
        <Route path="/Homepage">
          <Homepage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;

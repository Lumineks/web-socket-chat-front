import { Container } from "@material-ui/core";
import "normalize.css";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <Container>
        <h1>Hello from frontend</h1>
        <Switch>
          <Route path="chat">
            <Chat />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;

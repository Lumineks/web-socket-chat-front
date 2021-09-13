import { useContext } from "react";
import { Container, CssBaseline } from "@material-ui/core";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import Context from "./context/userContext";

function App() {
  const userCxt = useContext(Context);
  return (
    <CssBaseline>
      <div className="App">
        <Container>
          <Switch>
            <Route path="/" exact>
              {userCxt.isLoggedIn ? (
                <Redirect to="/chat" />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>

            <Route path="/login">
              {userCxt.isLoggedIn ? <Redirect to="/chat" /> : <Login />}
            </Route>

            <Route path="/chat">
              {userCxt.isLoggedIn ? <Chat /> : <Redirect to="/login" />}
            </Route>

            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </Container>
      </div>
    </CssBaseline>
  );
}

export default App;

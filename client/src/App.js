import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import User from "./pages/User";
import store from "./redux/store";

store.subscribe(() => console.log("%cstore", "color: red", store.getState()));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Main} />
            <Route path="/user/:id" component={User} />
            <Route path="/login" component={Auth} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;

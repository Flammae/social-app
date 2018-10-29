import React from "react";
import { boolean, string } from "prop-types";
import { Route, Link } from "react-router-dom";
import "./ArrowLink.css";

const ArrowLink = ({ children, to, exact = true }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <div className={match ? "arrow-link active" : "arrow-link"}>
        <Link to={to}>{children}</Link>
      </div>
    )}
  />
);

ArrowLink.porpTpes = {
  to: string,
  exact: boolean
};

export default ArrowLink;

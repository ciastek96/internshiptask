import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "../layout/Layout";
import CompaniesView from "./CompaniesView";
import CompanyDetailTemplate from "../templates/CompanyDetailTemplate";

const Root = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={CompaniesView} />
          <Route path="/details" component={CompanyDetailTemplate} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default Root;

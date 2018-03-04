import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ListPlansComponent from './ListPlansComponent';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    const homePage = () => {
      return (
        <header className="jumbotron text-center">
          <h1 className="page-title">Bem vindo ao PlanBuilder</h1>
          <Link to={'/list-all-broadband'} className="btn btn-primary">
            Ver opções de planos
          </Link>
        </header>
      );
    }

    return (
      <Router>
        <main className="container">
            <Route exact={true} path="/" render={homePage}/>
            <Route path="/list-all-broadband" component={ListPlansComponent} />
        </main>
      </Router>
    );
  }
}

export default App;

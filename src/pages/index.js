import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from './note';
import Signup from './signup';
import Signin from './signin';
import NewNote from './new';
import Layout from '../components/Layout';
import PrivateRoute from '../components/PrivateRoute';
import EditNote from './edit';
import WebSocket from './websocket';

const Pages = () => {
  return (
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/mynotes" component={MyNotes} />
        <PrivateRoute path="/favorites" component={Favorites} />
        <Route path="/note/:id" component={NotePage} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/new" component={NewNote} />
        <Route path="/edit/:id" component={EditNote} />
        <Route path="/websocket" component={WebSocket} />
      </Layout>
    </Router>
  );
};
export default Pages;

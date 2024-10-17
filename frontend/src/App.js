import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-blue-100 flex flex-col items-center py-10">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/feed" component={Feed} />
          <Route path="/profile" component={Profile} />
        </Switch>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import InstallerList from './components/InstallerList';
import Marketplace from './components/Marketplace';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <Route exact path="/" component={InstallerList} />
                    <Route path="/marketplace" component={Marketplace} />
                    <Route path="/dashboard" component={Dashboard} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

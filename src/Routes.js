import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Signout from './sign-out/completeSignOut';
import Login from './components/Login'
import PageNotFound from "./components/PageNotFound";

// eslint-disable-next-line import/no-anonymous-default-export,no-empty-pattern
export default ({}) => (
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signout" component={Signout} />
            <Route path="*" component={PageNotFound} />
        </Switch>
    </Router>
);

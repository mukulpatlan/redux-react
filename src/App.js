import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import Auth from './pages/Auth';
import UserProfile from './components/UserProfile/UserProfile';
import HomePage from './pages/HomePage';

function App() {
  const auth = useSelector(state => state.auth.isAuthenticated);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage isAuthenticated={auth} />
        </Route>
        <Route path='/auth'>
          <Auth isAuthenticated={auth} />
        </Route>
        <Route path='/profile'>
          <UserProfile isAuthenticated={auth} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

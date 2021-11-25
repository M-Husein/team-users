import { useState, useEffect, lazy, Suspense } from 'react';// useEffect
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavMain from './parts/NavMain';
import SplashSpin from './components/SplashSpin';
import AsideMain from './parts/AsideMain';
import Page404 from './pages/Page404';

const Home = lazy(() => import('./pages/Home'));// .js
const UserDetail = lazy(() => import('./pages/UserDetail'));// .js

function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const splashScreen = document.getElementById('splashScreen');
    if(splashScreen) splashScreen.hidden = true;
  }, []);

  const onToggleOpen = () => {
    setOpen(!open);
  }

  return (
    <Router>
      <NavMain 
        openAside={open} 
        onOpenAside={onToggleOpen}
      />

      <div className="container py-4">
        <div className="row">
          <main className="col-md-9">
            <Suspense fallback={<SplashSpin />}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/user/:id" component={UserDetail} />
                <Route path="*" component={Page404} />
              </Switch>
            </Suspense>
          </main>

          <AsideMain 
            className="col-md-3" 
            open={open} 
            onToggleOpen={onToggleOpen}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;

/*
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.tsx</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
*/

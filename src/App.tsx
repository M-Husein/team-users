import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SplashSpin from './components/SplashSpin';
import RouteLazy from './components/RouteLazy';
import NavMain from './parts/NavMain';
import AsideMain from './parts/AsideMain';
import Page404 from './pages/Page404';

const Home = lazy(() => import('./pages/Home'));
const UserDetail = lazy(() => import('./pages/UserDetail'));

export default function App() {
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
                <RouteLazy exact path="/" component={Home} />
                <RouteLazy path="/user/:id" component={UserDetail} />
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

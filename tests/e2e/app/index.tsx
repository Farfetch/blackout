import './styles.css';
import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TestViewer from './TestViewer';

import { client } from '@farfetch/blackout-client';
import ErrorBoundary from './ErrorBoundary';
import StoreProvider from './StoreProvider';

client.defaults.headers.common = {
  'Accept-Language': 'en-pt',
  'FF-Country': 'PT',
  'FF-Currency': 'EUR',
};

type Fixture = {
  path: string;
  suite: string;
  name: string;
  Component: React.LazyExoticComponent<React.ComponentType<unknown>>;
};

const fixtures: Fixture[] = [];

const importFixtures = import.meta.webpackContext!('../fixtures', {
  recursive: true,
  regExp: /\.(js|ts|tsx)$/,
  mode: 'lazy',
});

importFixtures?.keys().forEach(path => {
  // import.meta.webpackContext contains paths for module alias imports and relative imports
  if (!path.startsWith('.')) {
    return;
  }

  const [suite, name] = path
    .replace('./', '')
    .replace(/\.\w+$/, '')
    .split('/');

  fixtures.push({
    path,
    suite: `e2e/${suite}`,
    name: name!,
    Component: React.lazy(() => importFixtures(path)),
  });
});

function App() {
  function computeIsDev() {
    if (window.location.hash === '#dev') {
      return true;
    }

    if (window.location.hash === '#no-dev') {
      return false;
    }

    return process.env.NODE_ENV === 'development';
  }

  const [isDev, setDev] = React.useState(computeIsDev);

  React.useEffect(() => {
    function handleHashChange() {
      setDev(computeIsDev());
    }
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  function computePath(fixture: Fixture) {
    return `/${fixture.suite}/${fixture.name}`;
  }

  return (
    <ErrorBoundary>
      <StoreProvider>
        <Router>
          <Routes>
            {fixtures.map(fixture => {
              const path = computePath(fixture);
              const FixtureComponent = fixture.Component;

              if (FixtureComponent === undefined) {
                console.warn('Missing `Component` ', fixture);

                return null;
              }

              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <TestViewer>
                      <FixtureComponent />
                    </TestViewer>
                  }
                />
              );
            })}
          </Routes>
          <div hidden={!isDev}>
            <p>
              Devtools can be enabled by appending <code>#dev</code> in the
              addressbar or disabled by appending <code>#no-dev</code>.
            </p>
            <a href="#no-dev">Hide devtools</a>
            <details>
              <summary id="my-test-summary">nav for all tests</summary>
              <nav id="tests">
                <ol>
                  {fixtures.map(test => {
                    const path = computePath(test);

                    return (
                      <li key={path}>
                        <Link to={path}>{path}</Link>
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </details>
          </div>
        </Router>
      </StoreProvider>
    </ErrorBoundary>
  );
}

const container = document.getElementById('react-root');
const children = <App />;

const root = ReactDOMClient.createRoot(container!);

root.render(children);

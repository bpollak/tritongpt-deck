import React from 'react';
import Presentation from './Presentation';
import ManagePage from './pages/ManagePage';
import ThumbnailPage from './pages/ThumbnailPage';

function App() {
  // Simple routing based on pathname
  const path = window.location.pathname;

  if (import.meta.env.DEV && path === '/__thumbnail') {
    return <ThumbnailPage />;
  }

  if (path === '/manage' || path === '/manage/') {
    return <ManagePage />;
  }

  return <Presentation />;
}

export default App;

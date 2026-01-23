import React from 'react';
import Presentation from './Presentation';
import ManagePage from './pages/ManagePage';

function App() {
  // Simple routing based on pathname
  const path = window.location.pathname;

  if (path === '/manage' || path === '/manage/') {
    return <ManagePage />;
  }

  return <Presentation />;
}

export default App;

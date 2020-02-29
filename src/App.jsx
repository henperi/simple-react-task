import React from 'react';
import './styles/responsive.scss';
import './App.css';

import RegistrationForm from './components/RegistrationForm';

/**
 * App Component
 *
 * @returns {JSX.Element} Jsx Element
 */
function App() {
  return <div className="app"><RegistrationForm /></div>;
}

export default App;

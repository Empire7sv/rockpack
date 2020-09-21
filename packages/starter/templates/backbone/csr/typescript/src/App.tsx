import React from 'react';
import logo from './logo.svg';
import styles from './App.modules.css';

const App = (): JSX.Element => (
  <div className={styles.App}>
    <header className={styles['App-header']}>
      <img src={logo} className={styles['App-logo']} alt="logo" />
    </header>
    <p>
      This project generated by
      {' '}
      <strong>Rockpack</strong>
      . Please read official
      {' '}
      <a
        href="https://github.com/AlexSergey/rock"
        target="_blank"
        rel="noopener noreferrer"
      >
        documentation
      </a>
      .
    </p>
  </div>
);

export default App;

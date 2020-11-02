import React from 'react';
import './App.css';
import { LocaleContext } from './contexts.js'
import TransactionSummary from './TransactionSummary.js'

const localeConfig = {
  locales: ['en-US'],
  currencyOptions: {
    style: 'currency', currency: 'USD'
  }
}

function App() {
  return (
    <LocaleContext.Provider value={localeConfig}>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Recent transactions
          </h1>
        </header>
        <TransactionSummary count={3} />
      </div>
    </LocaleContext.Provider>
  );
}

export default App;
import React from 'react';
import { setConfiguration } from 'react-grid-system';
import { BrowserRouter } from 'react-router-dom';

// import Header from './components/Header';
import Routes from './routes';
import GlobalStyle from './styles/global';

setConfiguration({ gutterWidth: 20 });

const App: React.FC = () => {
  return (
    <>
      {/* <Header /> */}
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
};

export default App;

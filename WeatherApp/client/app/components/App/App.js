import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import '../../styles/nav.scss'

const App = ({ children }) => (
  <>

    <main>
      {children}
    </main>

    <Footer />
  </>
);

export default App;

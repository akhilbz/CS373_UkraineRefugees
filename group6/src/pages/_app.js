import React from 'react'; // Add this line at the top of your file
import "@/styles/globals.css";
import { Provider } from 'react-redux';
import store from '../store';

export default function App({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>);
}

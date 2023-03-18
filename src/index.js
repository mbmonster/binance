/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import ReactDOM from 'react-dom/client';

import 'assets/plugins/nucleo/css/nucleo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/scss/argon-dashboard-react.scss';
import GlobalStyles from 'GlobalStyles';
import App from 'App';
import { Provider } from 'react-redux';
import { store } from 'store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <GlobalStyles>
        <Provider store={store}>
            <App />
        </Provider>
    </GlobalStyles>,
);
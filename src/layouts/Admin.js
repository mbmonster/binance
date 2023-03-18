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
import { useLocation, Route, Routes, Navigate } from 'react-router-dom';
// reactstrap components
import { Container } from 'reactstrap';
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import AdminFooter from 'components/Footers/AdminFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import routes from 'routes.js';

const Admin = ({ children }) => {
    const mainContent = React.useRef(null);
    const location = useLocation();

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
    }, [location]);

    const getBrandText = (path) => {
        for (let i = 0; i < routes.length; i++) {
            // if (props.location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
            //     return routes[i].name;
            // }
        }
        return 'Brand';
    };

    return (
        <>
            <Sidebar
                // {...props}
                routes={routes}
                logo={{
                    innerLink: '/admin/index',
                    imgSrc: require('../assets/img/brand/argon-react.png'),
                    imgAlt: '...',
                }}
            />
            <div className="main-content" ref={mainContent}>
                <AdminNavbar brandText={getBrandText('props.location.pathname')} />
                {children}
                <Container fluid>
                    <AdminFooter />
                </Container>
            </div>
        </>
    );
};

export default Admin;

import { useEffect, useRef } from 'react';
import { useLocation, Route, Routes, Navigate } from 'react-router-dom';
// reactstrap components
import { Container } from 'reactstrap';
import { useDispatch } from 'react-redux';

import { getAllDailys } from '../features/dataSlice';
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import AdminFooter from 'components/Footers/AdminFooter.js';
import Sidebar from 'components/Sidebar/Sidebar.js';

import routes from 'routes.js';

const Admin = ({ children }) => {
    const dispatch = useDispatch();

    const mainContent = useRef(null);
    const location = useLocation();

    useEffect(() => {
        dispatch(getAllDailys());
    }, []);

    useEffect(() => {
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
        return 'Ngọc Hòa';
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

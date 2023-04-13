import { Fragment, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-vertical-timeline-component/style.min.css';
import { useSelector } from 'react-redux';

import HomePage from './components/Pages/Homepage';
import routers from './routes';
function App() {
    const { user } = useSelector((state) => state.user);
    let pages = routers;

    if (!user) {
        pages = routers.filter((row) => row.isShow !== true);
    }

    return (
        <BrowserRouter>
            <Routes>
                {pages.map((rou, index) => {
                    const Page = rou.component;
                    let Layout = Fragment;
                    if (rou.layout) {
                        Layout = rou.layout;
                    }
                    return (
                        <Route
                            key={index}
                            path={rou.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        ></Route>
                    );
                })}
                <Route path="*" element={<HomePage />}></Route>
            </Routes>
            <ToastContainer position="top-center" />
        </BrowserRouter>
    );
}

export default App;

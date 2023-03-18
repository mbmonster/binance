import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './components/HomePage/index.js';
import routers from './routes';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                {routers.map((rou, index) => {
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

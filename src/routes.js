import Index from 'views/Index.js';
import Profile from 'views/examples/Profile.js';
import Maps from 'views/examples/Maps.js';
import Register from 'views/examples/Register.js';
import Login from 'views/examples/Login.js';
import Tables from 'views/examples/Tables.js';
import Icons from 'views/examples/Icons.js';

import HomePage from './components/HomePage';
import AdminLayout from './layouts/Admin';
import AuthLayout from './layouts/Auth';

var routes = [
    {
        path: '/',
        name: 'Home',
        icon: 'ni ni-tv-2 text-primary',
        component: HomePage,
        isShow: false,
    },
    {
        path: '/admin',
        name: 'Dashboard',
        icon: 'ni ni-tv-2 text-primary',
        component: Index,
        layout: AdminLayout,
        isShow: true,
    },
    {
        path: '/icons',
        name: 'Icons',
        icon: 'ni ni-planet text-blue',
        component: Icons,
        layout: AdminLayout,
        isShow: true,
    },
    {
        path: '/maps',
        name: 'Maps',
        icon: 'ni ni-pin-3 text-orange',
        component: Maps,
        layout: AdminLayout,
        isShow: true,
    },
    {
        path: '/user-profile',
        name: 'User Profile',
        icon: 'ni ni-single-02 text-yellow',
        component: Profile,
        layout: AdminLayout,
        isShow: true,
    },
    {
        path: '/tables',
        name: 'Tables',
        icon: 'ni ni-bullet-list-67 text-red',
        component: Tables,
        layout: AdminLayout,
        isShow: true,
    },
    {
        path: '/login',
        name: 'Login',
        icon: 'ni ni-key-25 text-info',
        component: Login,
        layout: AuthLayout,
        isShow: true,
    },
    {
        path: '/register',
        name: 'Register',
        icon: 'ni ni-circle-08 text-pink',
        component: Register,
        layout: AuthLayout,
        isShow: true,
    },
];
export default routes;

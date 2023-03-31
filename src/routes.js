import Index from 'views/Index.js';
import Profile from 'views/examples/Profile.js';
import Maps from 'views/examples/Maps.js';
import Tables from 'views/examples/Tables.js';
import Daily from 'views/Daily.js';
import Installment from 'views/Installment';

import HomePage from './components/Pages/Homepage';
import AdminLayout from './layouts/Admin';

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
        name: 'Trang chủ',
        icon: 'ni ni-tv-2 text-primary',
        component: Index,
        layout: AdminLayout,
        isShow: true,
    },
    {
        path: '/daily',
        name: 'Chi tiêu trong ngày',
        icon: 'ni ni-calendar-grid-58 text-blue',
        component: Daily,
        layout: AdminLayout,
        isShow: true,
    },
    {
        path: '/installment',
        name: 'Trả góp',
        icon: 'ni ni-box-2 text-orange',
        component: Installment,
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
];
export default routes;

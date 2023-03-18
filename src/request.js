import axios from 'axios';

const customRequest = axios.create({
    baseURL: 'https://localhost:44362/api',
});

export default customRequest;

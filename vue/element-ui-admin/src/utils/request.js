import axios from 'axios'

const service = axios.create({
    // 伪造域名
    baseURL: 'http://api-dev',
    timeout: 5000
});

export default service
import request from '@/utils/request'
export function fetchList(query) {
    console.log(query);
    // request 通用的公共方法
    return request({
        // 请求数据
        url: '/article/list',
        method: 'get',
        params: query
    })
}
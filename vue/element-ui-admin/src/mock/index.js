import Mock from 'mockjs'
import articleAPI from './article'
// 启动一个 URL
// mock 提供一个 url，通过正则匹配
Mock.mock(/\/article\/list/, 'get', articleAPI.getList);
export default Mock
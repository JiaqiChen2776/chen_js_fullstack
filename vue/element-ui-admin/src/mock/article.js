// 返回文章需要的所有api
import Mock from 'mockjs';
import { param2Obj } from '@/utils'

const List = [];
const count = 100;
const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_url = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i=0; i<count; i++){
    List.push(Mock.mock({
        // @ 表示要使用命令
        id: '@increment',
        // 生成一个随机的日期
        timestamp: +Mock.Random.date('yyyy/MM/dd'),
        // @first 任
        author: '@first',
        reviewer: '@first',
        // 范围为 5-10
        title: '@title(5,10)',
        content_short: '我是测试数据',
        content: baseContent,
        importance: '@integer(1,3)',
        'type|1': ['CN','US','JP','EU'],
        'status|1': ['published','draft','deleted'],
        display_time: '@datetime',
        comment_disabled: true,
        pageviews: '@integer(300,5000)',
        image_url
    }))
}

export default {
    getList: (config) => {
        console.log(config);
        // 对象解构   param2Obj   utils 提供
        const {importance, type, title, page=1, limit=20, sort} = param2Obj(config.url);

        console.log(importance, type, title, page, limit, sort);

        let mockList = List.filter(item => {
            // +importance  将其转换成整数
            if (importance && item.importance !== +importance) return false;
            if (type && item.type != type) return false;
            if (title && item.title.indexOf(title) < 0) return false;
            return true;
        })
        // 最简单的箭头函数，返回结果为布尔值，limit*page 当前页第一条， limit*(page-1) 当前页最后一条
        const pageList = mockList.filter((item, index) => index  < limit*page && index >= limit*(page-1))
        return {
            total: mockList.length,
            items: pageList
        }
    }
}
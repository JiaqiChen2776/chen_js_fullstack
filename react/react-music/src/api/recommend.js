// 提供相应接口的定制服务（模块化），相应组件中不需要处理数据相关业务
// 引入通用的 jsonp请求 的基本配置
import jsonp from './jsonp';
import { URL, PARAM, OPTION } from './config';

export function getCarousel () {
    const data = Object.assign({}, PARAM, {
        g_tk: 701075963,
        uin: 0,
        platform: "h5",
        needNewCode: 1,
        _: new Date().getTime()
    })
    return jsonp(URL.carousel, data, OPTION);
}

// 专辑信息
// 有一个数据的需求，就到 api 相应业务文件下加一个方法就好
export function getAlbumInfo(albumMid) {
    const data = Object.assign({}, PARAM, {
        albumid: albumMid,
        g_tk: 1278911659,
        hostUin: 0,
        platform: 'yqq',
        needNewCode: 0
    });
    return jsonp(URL.albumInfo, data, OPTION);
}
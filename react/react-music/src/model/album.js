// 建模
// 模型层
export class Album {
    constructor(id, mid, name, img, singer, publicTime) {
        this.id = id;
        this.mid = mid;
        this.name = name;
        this.img = img;
        this.singer = singer;
        this.publicTime = publicTime;
    }
}

export function createAlbumByList(data) {
    return new Album(
        data.album_id,
        data.album_mid,
        data.album_name,
        `http://y.gtimg.cn/music/photo_new/T002R300x300M000${data.album_mid}.jpg?max_age=2592000`,
        filterSinger(data.singers),
        data.public_time
    )
}

function filterSinger(singers) {
    let singerArr = singers.map(singer => {
        return singer.singer_name;
    })
    return singerArr.join('/');
}
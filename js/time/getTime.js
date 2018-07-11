// // ajax 带上时间戳去请求服务器，保证安全
// // 时间戳+uid  md5  值
// // 20160614134947
// function generateTime() {
//     // 年份，月份少于两位加0
//     // 日期也是两位，0，
//     var time = new Date();
//     var year = time.getFullYear()<10?'0'+time.getMonth():time.getMonth();
//     var month = time.getMonth()+1<10?'0'+(time.getMonth()+1):time.getMonth()+1;
//     var day = time.getDay();
//     var hour = time.getHours();
//     var minutes = time.getMinutes();
//     var seconds = time.getSeconds();
//     console.log(minutes);
//     return year+''+month+''+day+''+hour+''+minutes+''+seconds;
// }
// const getTime = generateTime();
// console.log(getTime);


function getCurrentTime() {
    var keep = '';
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var f = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    var rand = Math.round(Math.random() * 899 + 100);
    keep = y + '' + m + '' + d + '' + h + '' + f + '' + s;
    return keep; //20160614134947
  }
  
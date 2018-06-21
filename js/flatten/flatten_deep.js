function flatten(arr){
    // reduce() 削藩：将前一项与前一项做操作   es6用法
    return arr.reduce(function(prev, next) {
        console.log(prev, next);
        return prev.concat(Array.isArray(next)?flatten(next):next);
    }, []);
}
console.log(flatten([1,2,[3,4],[5,[6,7]]]));
/**/

module.exports = {
    lnglat2pixel: lnglat2pixel,

    pixel2lnglat: pixel2lnglat,

    tile2pixel: tile2pixel,

    pixel2tile: pixel2tile,

    getTileXY: getTileXY
}

/*
 *  经纬度转像素坐标
 */
function lnglat2pixel(lng, lat, z){
    var sin = Math.sin(lat * Math.PI / 180), pow = Math.pow(2, z);
    var x = ((lng + 180) / 360) * 256 * pow;
    var y = (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * 256 * pow;
    return [x, y];
};

/*
 *  像素坐标转经纬度
 */
function pixel2lnglat(x, y, z){
    var pow = Math.pow(2, z);
    var exp0 = Math.exp(4 * Math.PI * (0.5 - y / 256 / pow));
    var lng = x / 256 / pow * 360 - 180;
    var lat = Math.asin((exp0 - 1) / (exp0 + 1)) / Math.PI * 180;
    return [lng, lat];
};

/*
 * 切片坐标转像素
 * 返回切片 lt, rt, rb, lb点像素坐标
 */
function tile2pixel(x, y){
    var tw = 256;
    return [
        [x*tw, y*tw],
        [(x+1)*tw, y*tw],
        [(x+1)*tw, (y+1)*tw],
        [x*tw, (y+1)*tw]
    ];
};

/*
 * 像素坐标转切片
 */
function pixel2tile(x, y){
    var tw = 256;
    return [Math.floor(x/tw), Math.floor(y/tw)];
}

/*
 *  从经纬度获取切片编号
 */
function getTileXY(lng, lat, level) {
     var x, y;

     x = lng / 360 + 0.5;

     y = Math.log(Math.tan((Math.PI / 4) + (lat * Math.PI / 360)));

     y = -y * 0.5 / Math.PI + 0.5;

     x = Math.floor(Math.pow(2, level) * x);

     y = Math.floor(Math.pow(2, level) * y);

     return [x, y];
}
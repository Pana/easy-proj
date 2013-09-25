/***********************************************************
    Easy-Proj
    Proj methods that is easy to use
    https://github.com/pana/easy-proj

    Copyright © 2012-2013 Pana Wang <pana.wang@outlook.com>
    Licensed under MIT
***********************************************************/
(function(window){

    /*
        坐标系说明:
            lnglat: 经纬度坐标 wgs84
            pixel: 像素坐标
            web: 900913坐标
    */

    var proj4 = require('proj4js')
        , EPSG900913 = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs'
        , EPSG900913 = '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs +over'

    /* 经纬度转web */
    function lnglat2web(lng, lat){
        return proj4(EPSG900913).forward([lng, lat])
    }

    /* web转经纬度 */
    function web2lnglat(x, y){
        return proj4(EPSG900913).inverse([x, y])
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

    /* 
    *  切片坐标转web坐标 
    */
    function tile2web(x, y, z){
        var tmp = tile2pixel(x, y)
        return tmp.map(function(item){
            var lnglat = pixel2lnglat(item[0], item[1], z)
            return lnglat2web(lnglat[0], lnglat[1])
        })
    }


    var PROJ = {
        lnglat2pixel: lnglat2pixel,

        pixel2lnglat: pixel2lnglat,

        tile2pixel: tile2pixel,

        pixel2tile: pixel2tile,

        getTileXY: getTileXY,

        lnglat2web: lnglat2web,

        web2lnglat: web2lnglat,

        tile2web: tile2web
    }


    ///////////
    // Export
    //////////

    if(typeof(exports) !== 'undefined'){
        if(typeof(module) !== 'undefined' && module.exports){
            exports = module.exports = PROJ
        }
        exports.ep = PROJ
    }else if(typeof(define) === 'function' && define.amd){
        define(function(){
            return PROJ
        })
    }else{
        window.ep = PROJ
    }


})(this)

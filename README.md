easy-proj
================
提供JS版本使用简单的Proj方法.


## install
    
    npm install easy-proj

## example

```
var ep = require('easy-proj');
var lonLat = [119.23, 37.34], zoom = 14;
var pixel = ep.lnglat2pixel(lonLat[0], lonLat[1], zoom)
```

### 文档

* `lnglat2pixel(lng, lat, z)` 经纬度转像素
* `pixel2lnglat(x, y, z)` 像素转经纬度
* `tile2pixel(x, y)`   切片转像素坐标, 返回切片四点像素坐标
* `pixel2title(x, y)`  像素转切片坐标
* `getTileXY(lng, lat, zoom)`  经纬度转切片编号
* `lnglat2web(lng, lat)` 经纬度转900913
* `web2lnglat(x, y)` 900913转经纬度
* `tile2web()` 切片坐标转900913坐标


## 目标

* 提供全面的proj功能
* 使用简单
* 测试全面
* 文档全面, 清楚
* 注释清楚


## 相关模块

* [proj4js](https://npmjs.org/package/proj4js)
* [proj4](https://npmjs.org/package/proj4)

## [proj4](https://trac.osgeo.org/proj/)






var date = new Date()
var arr=[date.getFullYear(),date.getMonth()+1,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds()]
var v=""
for (var i = 0; i < arr.length; i++) {
    if (arr[i]<10) {arr[i]='0'+arr[i]};
    v+=arr[i]
};
var path=require('path');
// 环境信息
var source='source',
      develop='develop',
      production='production';
// src路径
var src={
  html:'../view/**',
  css:'../dev/**',
  js:'../dev/**',
  img:'../dev/**'
};

// 模块信息
var modules={
  distDev: {
      js: './dist/' + v + "/dev",
      css: './dist/' + v + "/dev",
      image: './dist/' + v + "/dev",
      lib:'./dist/' + v + "/dev/lib",
      common:'./dist/' + v + "/dev/comon"
  },
  distMini: {
      js: './dist/' + v + "/mini",
      css: './dist/' + v + "/mini",
      image: './dist/' + v + "/mini",
      lib:'./dist/' + v + "/mini/lib",
      common:'./dist/' + v + "/mini/comon"
  }
}
var FileConfig  = function () {
};
module.exports = new FileConfig();
FileConfig.prototype.modules = function () {
  return modules;
};

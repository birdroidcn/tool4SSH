/**
*  配置文件对象
**/
var ejs = require('ejs'),
    fs = require('fs'),
    util = require('../common/util.js');
    
var Config = function(type,closeTag,dependant,template){
    this.type = type;
    this.closeTag = closeTag;
    this.dependant = dependant;
    this.template = template;
}
Config.prototype.srcPath = '';
Config.prototype.readFile = function(){
    fs.chmodSync(this.path, '777');
    return fs.readFileSync(this.path,'utf-8');
}

Config.prototype.writeFile = function(ret){
    var file = this.path;
	fs.writeFile(file,ret,'utf-8',function(err){
        var str = err || file+' is updated';
	    util.log(str);
	});
}

module.exports = Config;



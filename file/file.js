/**
*  java文件对象
**/
var ps = require('path'),
    mkdirp = require('mkdirp'),
    ejs = require('ejs'),
    fs = require('fs'),
    util = require('../common/util.js');
    
function File(obj){
    this.type = obj.type;
    this.pathSuf = obj.pathSuf;
    this.name = obj.name;
    this.path = obj.path;
    this.format = obj.format || '.java';
    this.nameSuf = typeof obj.nameSuf == "undefined" ? obj.type : obj.nameSuf;
    this.init();
}

File.prototype.srcPath = '';
File.prototype.pkgPath = '';
File.prototype.dataName = '';

File.prototype.createFile = function(obj){
    obj.dataName = this.dataName;
	var ret = ejs.render(this.getTemplate(),obj );
	this.writeFile(ret);
}

File.prototype.init =function(){
    this.name = util.firsToCapital(this.dataName)+util.firsToCapital(this.nameSuf);
    this.path =  this.pkgPath+this.pathSuf;
    this.pkgPath = this.path.replace(this.srcPath+'/','').replace(/\//g,'.');
    var clsPath = this.path + '/' +this.name;
    this.clsPath = clsPath.replace(this.srcPath+'/','').replace(/\//g,'.');
}

File.prototype.getTemplate =function(){
    var path = ps.resolve(__dirname,'../config/template/'+this.type+'.txt')
    return  fs.readFileSync(path, 'utf8');
}

File.prototype.storeTemplate = function(str){
    var path = ps.resolve(__dirname,'../config/template/'+this.type+'.txt')
	fs.writeFile(path,str,function(err){
	    var string = err || 'action\'s tempate is updated';
	    util.log(string);
	});
}

File.prototype.writeFile = function(ret){
    var file = this.path+'/'+this.name+this.format;
	mkdirp.sync(this.path);
	fs.writeFile(file,ret,function(err){
        var str = err || file+' is saved';
	    util.log(str);
	});
}

module.exports = File;


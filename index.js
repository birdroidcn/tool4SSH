var util = require('./common/util.js'),
    config = require('./config/config.js'),
    File = require('./file/file.js'),
    ConfigFile = require('./file/configFile.js'),
    configFiles = require('./file/configfiles.js'),
    path = config.getPath(),
    data = config.getData(),
    files = [];
    
data.props = config.getProps(data.excelpath,data.valColumn,data.antColumn,data.sheetName);
//初始化File实例
File.prototype.srcPath = path.srcPath;
File.prototype.pkgPath = path.pkgPath;
File.prototype.dataName = data.name;

config.getFiles().forEach(function(obj){
   var file = new File(obj);
   files.push(file);
});
//生成文件
var args = {};
files.forEach(function(e){
    args[e.type] = e;
});
args.props = data.props;
args.tableName = data.sheetName;
files.forEach(function(file){
    file.createFile(args);
});
//初始化ConfigFile实例 & 更新配置文件
ConfigFile.prototype.srcPath = path.srcPath;
configFiles.forEach(function(e){
    var args = [];
    e.path = path[e.type];
    if(!e.path) return;
    e.dependant.forEach(function(v){
        files.forEach(function(e){
           if(e.type==v) args.push(e);
        })
    });
    e.update.apply(e,args);
});
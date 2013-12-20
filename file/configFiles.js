/**
*  配置文件
**/
var ejs = require('ejs'),
    fs = require('fs') ,
    Config = require('./configFile.js'),
    ps = require('path');

var sqlMap = new Config('sqlMap','</sqlMapConfig>',['map']);
var dbCtx = new Config('dbCtx','</beans>',['dao','daoImpl']);
var serviceCtx = new Config('serviceCtx','</beans>',['action','service','serviceImpl','dao','daoImpl']);
var struts = new Config('struts','</struts>',['struts']); 

sqlMap.update = function(map){
    var ctet = this.readFile();
    var str = '  <sqlMap resource="'+
               (map.path+'/'+map.name+map.format).replace(map.srcPath+'/','')
            +'"/>';
    ctet = ctet.replace(this.closeTag,str+'\n' +this.closeTag);
    
    this.writeFile(ctet);
}

dbCtx.update = function(dao,daoImpl){
    var ctet = this.readFile();
    var id = dao.name.substring(0,1).toLowerCase()+dao.name.substring(1);
    var str = '  <bean id="'+ id +'" class="'
            +daoImpl.clsPath+'" parent="baseDao"/>';
    ctet = ctet.replace(this.closeTag,str+'\n' +this.closeTag);
    
    this.writeFile(ctet);
}

serviceCtx.update = function(action,service,serviceImpl,dao,daoImpl){
    var tPath = ps.resolve(__dirname,'../config/template/serviceCtx.txt');
    var template = fs.readFileSync(tPath,'utf-8');
    var ctet = this.readFile();
    var str = ejs.render(template,{
		           action : action,
		           service: service,
		           serviceImpl : serviceImpl,
		           dao : dao,
		           daoImpl : daoImpl
              });
    ctet = ctet.replace(this.closeTag,str+'\n' +this.closeTag);
    
    this.writeFile(ctet);
}

struts.update = function(structs){
    var ctet = this.readFile();
    var str = '<include file="'+
               (structs.path+'/'+structs.name+structs.format).replace(structs.srcPath+'/','') 
           +'"></include>';
    ctet = ctet.replace(this.closeTag,str+'\n' +this.closeTag);
    
    this.writeFile(ctet);
}

module.exports = [sqlMap,dbCtx, serviceCtx, struts];

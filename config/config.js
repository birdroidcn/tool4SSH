var fs = require('fs'),
    xls = require('xlsjs'),
    util = require('../common/util.js');

exports.getPath = function(){
    var path = __dirname+'/path.json';
    var ctet = fs.readFileSync(path, 'utf8');
    return JSON.parse(ctet);
}
exports.getData = function(){
    var path = __dirname+'/data.json';
    var ctet = fs.readFileSync(path, 'utf8');
    return JSON.parse(ctet);
}
exports.getFiles = function(){
    var path = __dirname+'/files.json';
    var ctet = fs.readFileSync(path, 'utf8');
    return JSON.parse(ctet);
}
exports.storePath = function(json){
    var path = __dirname+'/path.json';
    var ctet = JSON.stringify(json);
    fs.writeFile(path, ctet,'utf8',function(err){
        var str = err || 'path.json is updated';
	    util.log(str);
	});
}
exports.storeData = function(json){
    var path = __dirname+'/data.json';
    var ctet = JSON.stringify(json);
    fs.writeFile(path, ctet,'utf8',function(err){
        var str = err || 'data.json is updated';
	    util.log(str);
	});
}
exports.storeFiles = function(json){
    var path = __dirname+'/files.json';
    var ctet = JSON.stringify(json);
    fs.writeFile(path, ctet,'utf8',function(err){
        var str = err || 'files.json is updated';
	    util.log(str);
	});
}
//从excel表中读数据
exports.getProps = function(path,valColumn,antColumn,sheet){
    var rmQuot = function(str){
        return str.replace(/^"|"$/g,'');
    }
    var getAddrByV= function(v){
        for(var addr in ws){
           if((Object.prototype.toString.call(ws[addr].v) == '[object String]')
              &&  ws[addr].v.indexOf(v)!=-1) {
              return addr;
           }
        }
        util.log(path+'中不存在列名:'+v);
    }
	var wb =  xls.readFile(path);
	var ws = wb.Sheets[sheet];
	var aa = getAddrByV(antColumn);
	var va = getAddrByV(valColumn);
	var props = [];
	var c;
	if(va[1]!=aa[1]) {
	    util.log('列名不在同一行');
	    return props
	}
	else c =Number(va[1])+1;
	while(ws[va[0]+c]){
	  props.push({
	     value : rmQuot(ws[va[0]+c].v).toLowerCase(),
	     annotation : ws[aa[0]+c]?rmQuot(ws[aa[0]+c].v) : undefined
	  });
	  c++;
	}
	return props;
}

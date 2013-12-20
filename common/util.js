var fs = require('fs'),
    xls = require('xlsjs'),
    ele;
if(typeof window != "undefined")
   ele = window.document.querySelector('#console .wrap');
exports.log = function(str){
    if(ele)
       ele.innerText += (str+'\n');
    else{
       console.log(str);
    }
}

exports.firsToCapital = function(str){
    return str.substring(0,1).toUpperCase()+str.substring(1);
}
exports.getPath = function(){
    var path = __dirname+'/path.json';
    var ctet = fs.readFileSync(path, 'utf8');
    return JSON.parse(ctet);
}
exports.getData= function(){
    var path = __dirname+'/data.json';
    var ctet = fs.readFileSync(path, 'utf8');
    return JSON.parse(ctet);
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
    }
	var wb =  xls.readFile(path);
	var ws = wb.Sheets[sheet];
	var aa = getAddrByV(antColumn);
	var va = getAddrByV(valColumn);
	var props = [];
	var c;
	if(va[1]!=aa[1]) return props;
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

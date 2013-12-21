var fs = require('fs'),
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


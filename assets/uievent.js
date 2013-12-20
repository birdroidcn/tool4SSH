var util = require('./common/util.js'),
    File = require('./file/file.js'),
    config = require('./config/config.js'),
    ejs = require('ejs'),
    path = config.getPath(),
    data = config.getData(),
    fileInfo = config.getFiles(),
    files = [];
    
fileInfo.forEach(function(obj){
   var file = new File(obj);
   files.push(file);
});
//初始化路径值
for(var key in path){
    $('#config-path [name="'+key+'"]').val(path[key]);
}
//初始化数据源配置
for(var key in data){
    $('#config-data [name="'+key+'"]').val(data[key]);
}
//初始化文件区域
var ret = ejs.render($('#file-section').text(), {
    files : files
});
$('#config-data').after(ret);
//配置路径click event监听
$('#config-path .btn').click(function(e){
	e.preventDefault();
	for(var key in path){
        path[key] = $('#config-path [name="'+key+'"]').val();
    }
    config.storePath(path);
    $(e.target).addClass('btn-success').text('OK!');
})
//配置数据源click event监听
$('#config-data .btn').click(function(e){
    e.preventDefault(); 
    for(var key in data){
       data[key] = $('#config-data [name="'+key+'"]').val();
    }
    config.storeData(data);
    $(e.target).addClass('btn-success').text('OK!');
})
//监听每个文件区域的按钮click事件
files.forEach(function(file){
 $('#'+file.type+'-file .btn').click(function(e){
     e.preventDefault();
     var section = $(e.target.parentNode.parentNode);
     var i = Number(section.attr('data-index'));
     var inputs = $("input",section)
     for(var key in fileInfo[i]){
        var $ele = $('[name="'+key+'"]',section);
        if($ele.length>0) fileInfo[i][key] =$ele.val();
     }
     config.storeFiles(fileInfo);
     files[i].storeTemplate($('textarea',section).val());
     $(e.target).addClass('btn-success').text('OK!');
 });
});
//执行
$('#exec').click(function(e){
    require('./index.js');
    $(e.target).addClass('btn-success').text('OK!');
})



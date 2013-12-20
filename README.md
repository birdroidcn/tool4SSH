tool4SSH
========

SSH框架代码自动生成工具

 - 简单配置便可生成SSH框架常用文件，包括action,bean,service,dao,struts,map(iBATIS)等文件
 - 可将生成文件自动配添加到配置文件
 - 高度可定制，包括文件名称、路径、内容
 - 现有两个版本可用，node版和node-webkit版。nw比node多了操作界面。

Node.js version
--------
下载并安装依赖
```sh
npm install ejs
npm install mkdirp
npm install xlsjs
```
 配置路径 config/path.json (必配置)
```json
{
    "srcPath":"D:/sample/src",   //工程src所在路径
	"pkgPath":"D:/sample/src/com",  //包存放路径
	"sqlMap":"D:/sample//sqlMapConfig.xml", //iBATIS库对应配置文件  可为空
	"dbCtx":"D:/sample/applicationContext-database.xml",//配置dao bean文件 可为空
	"serviceCtx":"D:/sample/appContext.xml",//配置action,service bean文件 可为空
	"structs":"D:/sample/struts.xml" //struts配置文件 可为空
}
```
使用excel文件导入数据源 config/data.json (必配置)
```json
{
    "name":"KdjMovein", // 模块名称
    "excelpath":"D:/sample/detail.xls", //excel文件路径 
    "sheetName":"KDJ_MOVEINDETAIL_T", //excel工作表名称
    "valColumn":"属性值", //实体的属性列名称 
	"antColumn":"中文说明" //实体属性说明列名称，需要与在上列在同一行
}
```
配置文件基本属性 config/files.json (可选)
```json
[
    {
      "type":"action", //文件类型
      "pathSuf":"/action", //路径后缀,文件路径=path.pkgPath(包路径)+pathSuf
      "nameSuf":"action", //名称后缀,文件名称=data.name(模块名)+nameSuf
      "format":".java" //文件格式，省缺为.java
    }
]
```
使用ejs制作文件模板 config/template (可选)
```text
<!-- 可使用配置在files.json中的所有对象，并多了几种属性 -->
<%=action.name%>  <!-- 名称 ZzaAction -->
<%=action.clsName%>  <!-- 类路径 com.xx.yy.ZzAction -->
<%=action.pkgName%>  <!-- 包路径 com.xx.yy -->
```
执行
```sh
node index.js
```
node-webkit version(带UI)
-----------
安装node-webkit,启动即可使用
```sh
nw tool4SSH
```

License
----

MIT
const express = require('express');

const swig = require('swig');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookies = require('cookies');
const User = require('./models/User');
const app = express();



//use 是一个中间件
app.use('/public', express.static(__dirname+'/public'));

//1.配置模板引擎
app.engine('html', swig.renderFile);

//1.设置模板文件的目录
app.set('views', './views');

//1.注册使用模板引擎
app.set('view engine', 'html');

//使用bodyparse 解析post 数据
app.use(bodyParser.urlencoded({extended:true}));

//cookies 处理
app.use((req,res,next)=>{
      req.cookies = new cookies(req,res);
      req.result = {};
      //读取cookie
      let id = req.cookies.get('SESSIONID');
      if(id){
            User.findOne({
                  _id: id
            }).then((userInfo)=>{
                  if(!userInfo){
                        next();
                        return;
                  }
                  //有值 需要保留用户信息
                  req.result = userInfo;
                  next(); //指向下一步需要执行的操作
            })
      }else{
            next(); //指向下一步需要执行的操作
      }
});

//后台页面处理
app.use('/admin',(req,res,next)=>{
      if(req.result.isAdmin){
            next();
      }else{
            //不是管理员
            if(req.url == '/login'){
                  next();
            }else{
                  //重定向 地址 强制跳转login
                  res.redirect('/admin/login');
            }
      }
     
});



//app.use 对请求进行分模块处理
app.use('/', require('./routers/mainRouter'));
app.use('/admin', require('./routers/adminRouter'));
app.use('/api', require('./routers/apiRouter'));

//不需要缓存
swig.setDefaults({cache:false});


//服务器连接数据库
mongoose.connect('mongodb://localhost:27017', (error)=>{
      if(!error){
            app.listen(8000, 'localhost',()=>{
                  console.log('server at run localhost:8000');
            });
      }else{
            console.log('数据库连接失败');
            console.log(error);
      }
});

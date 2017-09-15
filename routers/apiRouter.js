const express = require('express');

const User = require('../models/User');
const Blog = require('../models/Blog');
const url = require('url');
//router.get() router.post 处理方式 
const router = express.Router();

function getDateStr(){
      let date = new Date();
      let dateStr = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
      return dateStr;
}
let responseData = {
      msg: 'ok',
      status: 0,
      data: {}
}

router.post('/user/register', (req,res)=>{
      let data = req.body;
      if(data.username == ' '){
            responseData.status = 1;
            responseData.data.info = '用户名不能为空!';
            res.send(responseData);
      }else if(data.password == ' ' ){
            responseData.status = 2;
            responseData.data.info = '密码不能为空!';
            res.send(responseData);
      }else if(data.tel == ' '){
            responseData.status = 3;
            responseData.data.info = '电话号码不能为空!';
            res.send(responseData);
      }else if(data.password != data.password1){
             responseData.status = 4;
            responseData.data.info = '两次密码输入不一致!';
            res.send(responseData);
      }else{
            User.findOne({
                  username: data.username
            }).then((userInfo)=>{
                  if(userInfo){
                        //用户已存在
                        responseData.status = 5;
                        responseData.data.info = '用户已存在！';
                        res.send(responseData);
                  }else{
                    //在数据插入数据
                        let user = new User({
                            username: data.username,
                            password: data.password,
                            tel: data.tel
                        })
                        return user.save();
                  } 
            }).then((newInfo)=>{
                  if(newInfo){
                    //成功
                        responseData.status = 0;
                        responseData.data.info = '恭喜注册成功!';
                        res.send(responseData);
                  }else{
                    //失败
                        responseData.status = 6;
                        responseData.data.info = '注册失败！';
                        res.send(responseData);
                  }
            })
      }
});
   
router.post('/user/login', (req,res)=>{
      let data = req.body;
      if(data.username == ''){
            responseData.status = 1;
            responseData.data.info = '用户名不能为空';
            res.send(responseData);
      }else if(data.password == ''){
            responseData.status = 2;
            responseData.data.info = '密码不能为空';
            res.send(responseData);
      }else{
            User.findOne({
                  username : data.username
            }).then((userInfo)=>{
            //查询出来有值 这里是数据库的值
            if(userInfo){
                  if(userInfo.password === data.password){
                        responseData.status = 0;
                        responseData.data.info = '登陆成功';
                        req.cookies.set('SESSIONID', userInfo._id);
                  }else{
                        responseData.status = 3;
                        responseData.data.info = '密码或用户名错误';
                  }
            }else{
                  responseData.status = 4;
                  responseData.data.info = '用户不存在';
            }
            res.send(responseData);
            })
      }
     
})

router.get('/user/logout',function(req,res){
      req.cookies.set('SESSIONID','');
      responseData.status = 0;
      responseData.data.info = '退出成功';
      res.send(responseData);
});

router.post('/user/modify',function(req,res){
      //修改数据
      let data = req.body;
      //进行修改
      //修改条件
      //需要修改的值
      User.update({
            _id: req.result._id,     
      },{
            password: data.password,
            tel: data.tel
      }).then((userInfo)=>{
            if(userInfo){
                  responseData.status = 0;
                  responseData.data.info = '修改成功';
                  res.send(responseData);
            }else{
                  responseData.status = 1;
                  responseData.data.info = '修改失败';
                  res.send(responseData);
            }
      });
})

router.post('/admin/login', (req,res)=>{
      let data = req.body;
      User.findOne({
        username: data.username   
      }).then((userInfo)=>{
            if(userInfo &&  userInfo.password === data.password && userInfo.isAdmin){
                  responseData.status = 0;
                  responseData.data.info = '登陆成功';
                  req.cookies.set('SESSIONID',userInfo._id);
            }else{
                  responseData.status = 1;
                  responseData.data.info = '登陆失败';
            }
            res.send(responseData);
      });
})

router.post('/admin/blogadd', (req,res)=>{
      let data = req.body;
      if(data.title === '' || data.description === '' || data.content === ''){
            responseData.status = 1;
            responseData.data.info = '输入内容不完整';
            res.send(responseData);
      }else{
            let blogInfo = new Blog({
                  title: data.title,
                  content: data.content,
                  description: data.description,
                  date: getDateStr()
            })
            //插入数据
            blogInfo.save().then((newInfo)=>{
                  if(newInfo){
                        responseData.status = 0;
                        responseData.data.info = '保存成功';
                        res.send(responseData);
                  }else{
                        responseData.status = 0;
                        responseData.data.info = '保存失败';
                        res.send(responseData); 
                  }
            });
      }
})

router.get('/admin/delete', (req,res)=>{
      let id = url.parse(req.url, true).query.id;
      if(id){
            //删除
            Blog.remove({
                  _id: id
            }).then((result)=>{
                  if(result.result.ok){
                        responseData.status = 0;
                        responseData.data.info = '删除成功';
                  }else{
                        responseData.status = 1;
                        responseData.data.info = '删除失败';
                  }
                  res.send(responseData);
            })
      }else{
            responseData.status = 1;
            responseData.data.info = '删除失败';
            res.send(responseData);
      }
      
})

router.post('/admin/modify', (req,res)=>{
      const query = req.body;
      //修改内容
      Blog.update({
            _id: query.id
      },{
            title: query.title,
            description: query.description,
            content: query.content,
            date: getDateStr()
      }).then((result)=>{
            if(result){
                  responseData.status = 0;
                  responseData.data.info = '修改成功';
                  res.send(responseData);
            }else{
                  responseData.status = 1;
                  responseData.data.info = '修改失败';
                  res.send(responseData);
            }
      })
})

router.post('/admin/userdelete', (req,res)=>{
      const query = req.body;
      if(query.id){
            User.remove({
                  _id: query.id
            }).then((result)=>{
                  if(result.result.ok){
                        responseData.status = 0;
                        responseData.data.info = '删除成功';
                  }else{
                        responseData.status = 1;
                        responseData.data.info = '删除失败';  
                  }  
                  res.send(responseData);
            });
      }else{
            responseData.status = 1;
            responseData.data.info = '删除失败';  
            res.send(responseData);
      }
})

module.exports = router;
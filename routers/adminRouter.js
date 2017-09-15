const express = require('express');
const User = require('../models/User');
const Blog = require('../models/Blog');
const url = require('url');
//router.get() router.post 处理方式 
const router = express.Router();

router.get('/', (req,res)=>{
      res.render('admin/index',{
            indexAction: 'active'
      });
});

router.get('/login', (req,res)=>{
      res.render('admin/login');
});

router.get('/userlist', (req,res)=>{
      //设置查询条件
      let query = url.parse(req.url,true).query;
      let page = Number(query.page) || 1;
      let count = Number(query.count) || 10;
      let skip = (page-1)*count;
      //查询数据总数长度
      User.count().then((allCount)=>{
            //得到一共有多少页
            let pageArr = [];
            let pageNum = Math.ceil(allCount/count);
            for(var i=1;i<=pageNum;i++){
                  pageArr.push({
                        index: i,
                        class: i == page?'active':''
                  });
            }
            //长度 
            //从哪里开始查询
            User.find().limit(count).skip(skip)
            .then((userInfo)=>{
                  res.render('admin/userlist',{
                        userlistAction: 'active',
                        userlist: userInfo,
                        pageArr: pageArr,
                        count: count,
                        preNum: (page-1)<1?1:page-1,
                        nextNum: (page+1)>pageNum?pageNum:page+1
                  });
            })
      });
});

router.get('/bloglist', (req,res)=>{
      //分页
      let query = url.parse(req.url,true).query;
      let page = Number(query.page) || 1;
      let count = Number(query.count) || 10;
      let skip = (page-1)*count;

      Blog.count().then((allCount)=>{
            let pageArr = [];
            let pageNum = Math.ceil(allCount/count);
            for(let i=1;i<=pageNum;i++){
                  pageArr.push({
                        index: i,
                        class: i == page?'active': ''
                  });
            } 
            //分页
            //长度 
            //从哪里开始查询
            Blog.find().limit(count).skip(skip)
            .then((bloglist)=>{
                  res.render('admin/bloglist', {
                        bloglistAction: 'active',
                        blogNum: bloglist,
                        pageArr: pageArr,
                        count: count,
                        preNum: (page-1)<1?1:page-1,
                        nextNum: (page+1)>pageNum?pageNum:page+1
                  })
            })
      });
});

router.get('/blog/add', (req,res)=>{
      res.render('admin/blog_add', {
            blogaddlistAction: 'active',
            handleFlag: '保存'
      });
});

router.get('/blog/modify', (req,res)=>{
      let id = url.parse(req.url,true).query.id;
      Blog.findOne({
            _id: id
      }).then((result)=>{
            if(result){
                  res.render('admin/blog_add', {
                        updataistAction: 'active',
                        handleFlag: '修改',
                        title: result.title,
                        description: result.description,
                        content: result.content,
                        id: result._id.toString()
                  });
            }else{
                  res.redirect('/admin/bloglist');
            }
      })
})


module.exports = router;
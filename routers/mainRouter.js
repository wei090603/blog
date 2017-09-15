const express = require('express');
//router.get() router.post 处理方式 
const router = express.Router();
const url = require('url');
const Blog = require('../models/Blog');

router.get('/', (req,res)=>{
      res.render('main/index',{
            username: req.result.username,
            indexActive: 'active'
      }); 
});


router.get('/register', (req,res)=>{
      res.render('main/register', {
            registerActive: 'active'
      });
});

router.get('/login', (req,res)=>{
      res.render('main/login', {
            loginActive: 'active'
      });
});

router.get('/blog', (req,res)=>{
      let query = url.parse(req.url,true).query;
      let page = Number(query.page) || 1;
      let count = Number(query.count) || 10;
      let skip = (page-1)*count;
      //查询数据总数长度
      Blog.count().then((allCount)=>{
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
            Blog.find().limit(count).skip(skip)
            .then((userInfo)=>{
                  res.render('main/blog',{
                        username: req.result.username,
                        blogActive: 'active',
                        bloglist: userInfo,
                        pageArr: pageArr,
                        count: count,
                        preNum: (page-1)<1?1:page-1,
                        nextNum: (page+1)>pageNum?pageNum:page+1
                  });
            })
      });
});

router.get('/user', (req,res)=>{
      res.render('main/user', {
            username: req.result.username,
            tel: req.result.tel,
            password: req.result.password,
            userActive: 'active'
      });
});

router.get('/blogdetail', (req,res)=>{
      const id = url.parse(req.url,true).query.id;
      if(id == null){
            //重定向
            res.redirect('not_found');
      }else{
            Blog.findOne({
                  _id: id
            }).then((result)=>{
                  if(result){
                        res.render('main/blog_detail',result);
                  }else{
                        res.render('main/not_found');
                  }
            })
      }
})

router.get('/not_found', (req,res)=>{
      res.render('main/not_found');
})


module.exports = router;
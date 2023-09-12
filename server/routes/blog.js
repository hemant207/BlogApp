const express = require('express');

const {blogModel,userModel} = require('../DB/DB.js')

const router = express.Router();

router.get('/getAllBlogs',async (req,res)=>{
    const foundBlogs = await blogModel.find();
    res.send({"blogs":foundBlogs});
})


router.get('/user/getAllBlogs',async(req,res)=>{
    const user_id = req.headers.user_id;
    if(user_id){
        const foundBlogs = await blogModel.find({user_id:user_id});
        res.send({"blogs":foundBlogs})
    }else{
        res.send({"message":'user is not login'});
    }
    
})

router.get('/getblog/:id',async(req,res)=>{
    const blog_id = req.params.id;

    const foundBlogs = await blogModel.findById(blog_id);
    if(foundBlogs){
        res.send({"blogs":[foundBlogs]});
    }else{
        res.send({'message':"no such blog found"});
    }
})

router.post('/blog',async (req,res)=>{

    const data = req.body;
    console.log(data);
    const user_id = req.headers.user_id;

    if(req.body.user_id===user_id){
        const foundUser = await userModel.findById(user_id);
        if(foundUser){
            const blogData = new blogModel(data);
            blogData.save();
            console.log('Blog added successfully');
            res.send({"message":"Blog added successfully"});
        }else{
            res.send({"message":"user login must required"});
        }
    }else{
        res.send({"message":"user login must required"});
    }
})

router.put('/getblog/:id',async(req,res)=>{
    const blog_id = req.params.id;

    const foundBlogs = await blogModel.findByIdAndUpdate(blog_id);
    if(foundBlogs){
        res.send({"blogs":foundBlogs});
    }else{
        res.send({'message':"no such blog found"});
    }
})

router.delete('/getblog/:id',async(req,res)=>{
    const blog_id = req.params.id;

    const foundBlogs = await blogModel.findByIdAndDelete(blog_id);
    if(foundBlogs){
        res.send({"blogs":foundBlogs});
    }else{
        res.send({'message':"no such blog found"});
    }
})


module.exports = router;
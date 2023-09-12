const express = require('express');
const {blogModel,userModel} = require('../DB/DB.js')

const router = express.Router();

router.post('/signup',async (req,res)=>{

    const data = req.body;
    console.log(data);
    const username = req.body.username;
    console.log(username);

    const foundUser = await userModel.find({username});
    console.log(foundUser);

    if(!foundUser || foundUser.length==0){
        const a = new userModel(data);
        a.save();
        console.log('user added succsfully');
        res.send({"message":"user added successfully"});
    }else{
        res.send({"message":"user already exists"});
    }

})

router.post('/login',async (req,res)=>{
    const username = req.headers.username;
    const password = req.headers.password;
    const foundUser = await userModel.findOne({username,password});

    if(foundUser){
        console.log('user Login succsfully');
        res.send({"message":"user Login succsfully","u_id":foundUser._id});
    }else{
        res.send({"message":"incorrect"});
    }
})

router.get('/getUser',async (req,res)=>{
    const user_id = req.headers.user_id;

    const foundUser = await userModel.findById(user_id);

    if(foundUser){
        console.log({'user':foundUser});
        res.send({"user":foundUser});
    }else{
        res.send({"message":"no user found"});
    }
})

router.put('/getUser/:id',async (req,res)=>{
    const user_id = req.params.id;
    const data = req.body;

    const UserUpdate = await userModel.findByIdAndUpdate(user_id,data,{new:true});
    if(UserUpdate){
        console.log({'user':UserUpdate});
        res.send({"user":UserUpdate});
    }else{
        res.send({"message":"no user found"});
    }
})

router.delete('/getUser/:id',async (req,res)=>{
    const user_id = req.params.id;

    const UserRemove = await userModel.findByIdAndRemove(user_id);
    if(UserRemove){
        console.log({'user':UserRemove});
        res.send({"message":"user removed","user":UserRemove});
    }else{
        res.send({"message":"no user found"});
    }
})

router.post('/follows',async (req,res)=>{
    const follow_id = req.headers.follow_id;
    const user_id = req.headers.user_id;

    const foundUser = await userModel.findById(user_id);
    const foundFollower = await userModel.findById(follow_id);

    console.log(foundFollower);
    console.log(foundUser);
    
    if(foundUser && foundFollower){
        console.log(foundUser.followers.includes(follow_id));
        if(foundUser.followers.includes(follow_id)){
            res.send({"message":"already followed"})
        }else{
            await foundUser.followers.push(follow_id);
            foundUser.save();
            console.log({"message":"follow success",'followers':follow_id});
            res.send({"message":"follow success","user":foundUser.followers,"following":true});
        }
    }else{
        res.send({"message":"no user found"});
    }

})

router.put('/follows',async (req,res)=>{
    const follow_id = req.headers.follow_id;
    const user_id = req.headers.user_id;

    const foundUser = await userModel.findById(user_id);
    const foundFollower = await userModel.findById(follow_id);

    if(foundUser && foundFollower){
        await foundUser.followers.pop(follow_id);
        foundUser.save();
        console.log({"message":"Unfollow success",'followers':follow_id});
        res.send({"message":"Unfollow success","user":foundUser.followers});
    }else{
        res.send({"message":"no user found"});
    }

})

module.exports = router;
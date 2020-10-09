const express = require("express");
const router = express.Router();
const Post = require("./Post");

router.post("/post/save",(req,res)=>{
    var body = req.body.body;
    var subId = req.body.subId;
    var category = req.body.category;
    var up = 0;
    if(body != undefined){
        Post.create({
            body:body,
            up:up,
            subtopicId:subId
        }).then(()=>{
            res.redirect(`/topic/${category}/${subId}`);
        });
    }else{
        res.redirect("/topic/pop/133/post");
    }
});

router.get("/topic/pop/:id/post",(req,res)=>{
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/topic/pop");
    }
    Post.findOne({
        where:{
            id:id
        }
    }).then(postings=>{
        res.render("./talk",{postings:postings});
    });
});

router.post("/post/delete",(req,res)=>{
    //var slug = req.bod.slug;
    var idPost = req.body.postId;
    var subId = req.body.subId;
    var category = req.body.category;
    if(idPost != undefined){
        if(!isNaN(idPost)){
            Post.destroy({
                where:{
                    id:idPost
                }
            }).then(()=>{
                res.redirect(`/topic/${category}/${subId}`);
            })
        }else{// se não for um numero
            res.redirect("/topic/pop");
            
        }
    }else{
        res.redirect("/topic/pop");
    }
});

router.post("/post/up",(req,res)=>{
    var postUp = ++req.body.up;
    var id = req.body.id;
    var subId = req.body.subId;
    var category = req.body.category;
    Post.update({up:postUp},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect(`/topic/${category}/${subId}`);
    });
});
module.exports = router;
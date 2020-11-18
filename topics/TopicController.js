const express = require("express");
const router = express.Router();
const Topic = require("./Topic");
const slugify = require("slugify");
const Post = require("../post/Post");
const Category = require("../admin/Category");
const idGeneration = require("uuidv1");
const Adms = require("../admin/Admin");

router.get("/topic/:categoryUrl/new/:sub",(req,res)=>{
    var categoryUrl = req.params.categoryUrl;
    var subs = req.params.sub;
        Category.findAll().then(category=>{
                res.render("create/newtopic",{category:category,categoryUrl:categoryUrl,subs:subs,user:req.session.user});
        });
});

router.post("/topic/new/save",(req,res)=>{
    var title = req.body.title;
    var midia = req.body.midia;
    var url = req.body.url;
    var body = req.body.body;
    var subtitle = req.body.subtitle;
    var category = req.body.category;
    var subs = ++req.body.subs;
    var user = req.body.user;
    if(title,midia,url,body,category,subtitle != undefined){
        Category.findOne({where:{title:category}}).then(categories=>{
            if(categories != undefined){
                Topic.create({
                    title:title,
                    subtitle:subtitle,
                    category:slugify(category),
                    midia:midia,
                    videoUrl:url,
                    body:body,
                    slug:slugify(title),
                    subtitleId:"topic="+idGeneration(),
                    imagem:"img",
                    video:"video",
                    by:user
                }).then(()=>{
                    Category.update({subs:subs},{where:{title:category}}).then(()=>{
                        res.redirect(`/topic/${category}/${subs}`);
                    })
                });
            }else{
                res.redirect(`/topic/${category}`);
            }
        })
    }else{
        res.redirect(`/topic/${category}`);
    }
});

router.get("/topic/:slug/:subs",(req,res)=>{
    var slug = req.params.slug;
    var subs = req.params.subs;
    var page = false;
    Category.findOne({where:{title:slug}}).then(category=>{
        if(category.subs == subs){
            if(category != undefined){
                page = true;
                Topic.findAll({
                    raw:true,order:[['id','DESC']],
                    where:{
                        category:slug
                    }
                }).then(topics =>{
                    if(topics != undefined){
                        Category.findAll().then(category =>{
                            res.render("pop",{page:page,topics:topics,category:category,slug:slug,subs:subs,user:req.session.user});
                        });
                    }else{
                        res.redirect("/home");
                    }
                }).catch((err) =>{
                    res.redirect("/home");
                });
            }else{
                page = false;
                Category.findAll().then(categories=>{
                    res.render("pop",{page:page,category:categories,slug:slug,user:req.session.user});
                });
            }
        }else{
            res.redirect("/home");
        }
    }).catch(()=>{
        res.redirect("/home");
    })
});

router.post("/topic/delete/post",(req,res)=>{
        var id = req.body.topicId;
        var category = req.body.category;
        if(isNaN(id)){
            res.redirect("/");
        }
        if(id != undefined){
            if(!isNaN(id)){
                Topic.destroy({
                    where:{
                        id:id
                    }
                }).then(()=>{
                    res.redirect(`/topic/${category}`);
                })
            }else{
                res.redirect(`/topic/${category}`);
            }
        }else{
            res.redirect(`/topic/${category}`);
        }
    });

router.get("/topic/:category/:sub/:slug",(req,res)=>{
    var categoryPar = req.params.category;
    var slug = req.params.slug;
    Topic.findOne({
        where:{
            subtitleId:slug
        },
    }).then(topic=>{
        if(topic != undefined){
            Post.findAll({
                where:{
                    subtopicId: slug
                },
                order:[
                    ['up','DESC']
                ]
            }).then(posts=>{
                Category.findAll().then(category=>{
                    res.render("talk",{topic:topic,posts:posts,category:category,categoryPar:categoryPar,user:req.session.user});
                });
            }); 
        }else{
            res.redirect("/");
        }

    }).catch(err =>{
        res.redirect("/");
    });
});

module.exports = router;
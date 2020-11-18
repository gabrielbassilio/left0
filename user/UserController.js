const express = require('express');
const User = require('./User');
const nameGenerate = require('name-jam-rator');
const bcrypt = require("bcryptjs");
const userAuth = require("../middlewares/user/UserAuth");
const Category = require('../admin/Category');
const Topic = require('../topics/Topic');
const router = express.Router();

router.post('/user/authenticate',(req,res)=>{
    var name = req.body.nameLogin;
    var password = req.body.passwordLogin;

    User.findOne({where:{email:name}}).then(user=>{
        if(user != undefined){
            var correct = bcrypt.compareSync(password,user.password);

            if(correct == true){
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    user:user.userName
                }
            }
            res.redirect("/home");
        }else{
            res.redirect("/");
        }
    });
});

router.post("/user/create",(req,res)=>{
    var name = req.body.name;
    var last = req.body.last;
    var email = req.body.email;
    var password = req.body.password;
    var date = req.body.date;
    var genre = req.body.genre;
    var terms = req.body.terms;

    var salt = bcrypt.genSaltSync(9);
    var hash = bcrypt.hashSync(password,salt);
    if(genre != 0){
        User.create({
            name:name,
            last:last,
            email:email,
            password:hash,
            date:date,
            genre:genre,
            terms:terms,
            userName:"astronaut-"+ nameGenerate(1),
            mode:"normal",
            verify:"false"
            }).then(()=>{
                User.findOne({where:{email:email}}).then(user=>{
                    if(user != undefined){
                        var correct = bcrypt.compareSync(password,user.password);
            
                        if(correct == true){
                            req.session.user = {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                user:user.userName
                            }
                        }
                        res.redirect("/home");
                    }else{
                        res.redirect("/");
                    }
                });
            }).catch((err)=>{
                console.log(err);
                res.redirect("/");
            });
    }
});

router.get("/user/first/config",(req,res)=>{
    res.render("user/firstConfig",{user:req.session.user});
});

router.post("/user/name/make",(req,res)=>{
    var name = req.body.name;
    var id = req.body.id
    User.findOne({where:{userName:name}}).then(user=>{
        if(user != undefined){
            User.update({userName:name},{
                where:{
                    id:id
                }
            });
        }else{
            res.redirect("/user/first/config");
            console.log("error!");
        }
    }).then(()=>{
        User.findOne({where:{id:id}}).then(user=>{
            if(user != undefined){
                req.session.user = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    user:user.userName,
                    last: user.last
                }
                res.redirect("/home");
            }else{
                res.redirect("/");
            }
        });
    });
});

router.get("/user/profile/:id",(req,res)=>{
    var id = req.params.id;
    Category.findAll().then(category =>{
        Topic.findAll({where:{by:id}}).then(topics=>{
            res.render("user/profile",{category:category,user:req.session.user,topic:topics});
        })
    });
});

router.get("/logout",(req,res)=>{
    req.session.user = undefined;
    res.redirect("/");
})

module.exports = router;
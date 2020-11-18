const express = require('express');
const Category = require('./Category');
const slugfy = require("slugify");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const Adms = require('./Admin');
const users = require("../user/User")
const router = express.Router();
const multerConfig = require('../config/multer');
const adminAuth = require("../middlewares/adminAuth");
const adminMaster = require('../middlewares/adminMaster');

/*const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads/");
    },
    filename: function(req,file,cb){
        //cb(null, file.originalname + req.session.user.id + path.extname(file.originalname));
        cb(null,  req.session.user.nick + req.session.user.id  + path.extname(file.originalname));
    }
});*/

/*const upload = multer({storage});*/


router.get("/admins", adminAuth,adminMaster,(req,res)=>{
    Adms.findAll().then(users=>{
        res.render("admin/admins/index",{users:users,userId:req.session.team});
    });
});

router.get("/admin/create",adminAuth,adminAuth,(req,res)=>{
    res.render("admin/admins/create",{userId:req.session.user});
});

router.post("/admin/new",adminAuth,adminMaster,(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    Adms.findOne({where:{email:email}}).then(user=>{ 
        if(user == undefined){
            Adms.create({
                name:name,
                email:email,
                password:hash,
                patents:"master",
                check:true
            }).then(()=>{
                res.redirect("/bob/admins");
            }).catch((err)=>{
                res.redirect("/bob/admins");
            });
        }else{
            res.redirect("/bob/admins/create");
            console.log("Email existente");
        }
    });
});
/*---------------------*/
router.get("/admins", adminAuth,adminMaster,(req,res)=>{
    Adms.findAll().then(users=>{
        res.render("admin/admins/index",{users:users,userId:req.session.team});
    });
});

router.get("/users",(req,res)=>{
    users.findAll().then(users=>{
        res.render("admin/users/users",{users:users,userId:req.session.team});
    });
})

router.post("/upload",adminAuth,multer(multerConfig).single("file"),(req,res)=>{
    console.log(req.file);
    res.send("Arquivo recebido!");
});


router.get("/",adminAuth,(req,res)=>{
    Category.findAll().then(categories =>{
        if(categories != undefined){
            res.render("admin/adminPainel",{categories:categories,userId:req.session.team});
        }else{
            res.redirect("/bob");
        }
    }).catch(err=>{
        res.redirect("/bob");
    })
});

router.get("/painel",adminAuth,(req,res)=>{
    Category.findAll().then(categories=>{
        res.render("admin/painel",{categories:categories,userId:req.session.team});
    })
})

router.get("/category/new",adminAuth,(req,res)=>{
    res.render("admin/newCategory",{userId:req.session.team});
});

router.post("/category/new/save",adminAuth,(req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    if(title,body != undefined){
        Category.create({
            title:title,
            body:body,
            slug:slugfy(title),
            subs:0
        }).then(()=>{
            res.redirect("/bob");
        })
    }else{
        res.redirect("/category/new");
    }
});

router.post("/category/delete",adminAuth,(req,res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where:{
                    id:id
                }
            }).then(()=>{
                res.redirect("/bob");
            });
        }else{//se nao for um numero
            res.redirect("/");
        }
    }else{//se for indefinido
        res.redirect("/");
    }
});

router.get("/category/edit/:id",adminAuth,(req,res)=>{
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/bob");
    }
    Category.findByPk(id).then(category=>{
        if(category != undefined){
           res.render("admin/editCategory",{category:category,userId:req.session.team});
        }else{
            res.redirect("/");
        }
    }).catch((error =>{
        res.redirect("/");
    }));
});

router.post("/category/update",adminAuth,(req,res)=>{
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    Category.update({title:title,body:body,slug:slugfy(title)},{
        where:{
            id:id
        }
    }).then(()=>{
        res.redirect("/bob");
    });
});

router.post("/user/acesses",adminAuth,(req,res)=>{
    var check = req.body.check;
    var id = req.body.id;
    if(check == false ){
        Adms.update({check:true},{
            where:{
                id:id
            }
        }).then(()=>{
            res.redirect("/bob/admins");
        })
    }else{
        Adms.update({check:false},{
            where:{
                id:id
            }
        }).then(()=>{
            res.redirect("/bob/admins");
        })
    }
});

router.get("/profile",adminAuth,(req,res)=>{
    res.render("admin/admins/profile",{userId:req.session.team});
});

router.get("/login",(req,res)=>{
    res.render("admin/admins/login");
});

router.post("/authenticate",(req,res)=>{
    var name = req.body.name;
    var password = req.body.password;

    Adms.findOne({where:{name:name}}).then(user=>{
        if(user != undefined){// se existir um usuario com esse email
            //validar senha
            var correct = bcrypt.compareSync(password,user.password);

            if(correct && user.check == true){
                req.session.team = {
                    id: user.id,
                    email: user.email,
                    nick: user.name,
                    acess: user.check,
                    patents: user.patents

                }
                res.redirect("/bob");
            }else{
                res.redirect("/bob/login");
            }
        }else{
            res.redirect("/bob/login");
        }
    });
});

router.get("/logout",(req,res)=>{
    req.session.team = undefined;
    res.redirect("/bob/login");
});

module.exports = router;

const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const connection = require('./database/database');
const userAuth = require("./middlewares/user/UserAuth");
//Controller
const userController = require('./user/UserController');
const postController = require('./post/PostController');
const topicController = require('./topics/TopicController');
const adminController = require('./admin/AdminController');
//Modules
const Users = require("./user/User");
const Post = require("./post/Post");
const Topic = require("./topics/Topic");
const Admin = require("./admin/Admin");
const Category = require("./admin/Category");
//config
app.set("view engine","ejs");
//sessions
app.use(session({
    secret:"burrucara",cookie: {}
}));
//Redis

//Static
app.use(express.static("public"));
//BodyParser
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//Connect DB
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com sucesso!");
    }).catch((error)=>{
        console.log("Ocorreu um erro: "+error);
    });
app.use("/",userController);
app.use("/",postController);
app.use("/",topicController);
app.use("/bob",adminController);
app.get("/session",(req,res)=>{
    req.session.treinamento = "Formação node.js"
    req.session.ano = 2020
    req.session.email = "gabass@email.com"
    req.session.user = {
        username:"Gabriel",
        email:"email@email.com",
        id: 10
    }
    res.send("Sessão gerada");
});
app.get('/leitura',(req,res)=>{
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano,
        email: req.email,
        user: req.session.user

    })
});
app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/home",userAuth,(req,res)=>{
    Category.findAll().then(category=>{
        if(category != undefined){
            Topic.findAll().then(topics=>{
                res.render("home",{category:category,topics:topics,user:req.session.user});
            });
        }else{
            res.redirect("/")
        }
    }).catch(err=>{
        res.redirect("/")
    });
});
app.listen(8080,()=>{
    console.log("Rodando na porta: 8080");
});
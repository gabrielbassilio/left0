function adminAuth(req,res,next){
    if(req.session.team != undefined){
        next();
    }else{
        res.redirect("/bob/login");
    }
}
module.exports = adminAuth;
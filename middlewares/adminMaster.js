function adminMaster(req,res,next){
    if(req.session.team.patents == 'master'){
        next();
    }else{
        res.redirect("/bob/painel");
    }
}
module.exports = adminMaster;
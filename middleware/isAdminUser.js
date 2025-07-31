
function isAdminUser(req,res,next){
    if(req.session.user && req.session.user.userType==="Admin"){
        next()
    }else{
        res.redirect("/ecoFacilities")
    }
}

module.exports = isAdminUser
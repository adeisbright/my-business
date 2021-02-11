const express = require("express") 
const router = express.Router() 
const passport = require("passport") 
const IndexController = require("../controller/indexController") 

router.get("/" , IndexController.getHome) 
router.get("/signup" ,IndexController.logPath , IndexController.getSignup)
router.post("/signup" ,  IndexController.createBusiness) 
router.get("/login" , IndexController.getLogin) 
router.get("/businesses" , IndexController.getAllBusiness)
router.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}))
router.get('/auth/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/signup' }) , 
  function(req ,res) {
    req.session.idACE = req.user.userId
    res.redirect(303  , '/dashboard')
  }
) 
router.get('/auth/google' ,passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))
router.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req ,res) {
  req.session.idACE = req.user.userId
  res.redirect(303  , '/dashboard')
}
) 

module.exports = router
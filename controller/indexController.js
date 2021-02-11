const Business = require("../model/business") 
const bycrpt = require("bcryptjs")
const passport = require("passport") 
const FacebookStrategy = require("passport-facebook").Strategy
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy 
require("dotenv").config()
class Index {
    getHome = (req , res) => {
        try {
            res.render("home" , {
                title : "Basic Templating" , 
                userName : "Adleke Bright" , 
                students : [" cHARITY " , "Bunmi"]
            })
        }catch(error){
            res.json({error : error.message})
        }
    } 
    getSignup = (req , res , ) => {
        try {
            res.render("signup")
        }catch(error){
            res.json({error : error.message})
        }
    } 
    //A path logging middleware 
    getAllBusiness = async (req , res) => {
        try {
            let businesses  = await Business.find({})
               .select({
                   name : 1 , email : 1 , phoneNumber : 1
                })
               .lean()  
               res.render("user-dashboard" , {
                   title : "List of Businesses" , 
                   businesses : businesses
               })
        }catch(error){
            res.json({error : error.message})
        }
    } 
    logPath = async (req , res , next) => {
        console.log(req.url) 
        next()
    }
    createBusiness = async (req , res) => {
        try { 
            //Parse the body of the request 
            const {businessName , gender , email , phoneNumber , password , confirmPassword , code} = req.body 
            // console.log(password , confirmPassword) 
            // console.log(req.body) 
            let isBusiness = await Business.findOne({ 
                "$or" : [{
                    email : email , 
                    name : businessName
                }]
            })
            if (password === confirmPassword && !isBusiness){ 
                let securePass = await bycrpt.hash(password , 10)
                //Check to ensure the data provided is clean and unique
                await new Business({
                    name : businessName , 
                    email : email , 
                    password : securePass, 
                    phoneNumber : phoneNumber
                }).save()
                .then(success => {
                    // res.json({
                    //     status : 200 , 
                    //     name : businessName
                    // })
                    res.redirect("/businesses")
                }).catch(err => {
                    throw new Error("Unable to save record to the database")
                })

            }else {
                throw new Error("Password does not match or a user already exist")
            }
        }catch(error){
            res.json({message : error.message})
        }
    } 
    getLogin = async (req , res) => {
        try {
            res.render("login")
        }catch(err){
            res.json(err)
        }
    }
    authFacebook = () => {
		passport.use(new FacebookStrategy({
			clientID: process.env.FacebookClientId,
			clientSecret: process.env.FacebookClientSecret,
			callbackURL: "http://localhost:3000/auth/facebook/callback"
		  },
		  function(accessToken, refreshToken, profile, done) {
			console.log(profile)
			User.findOne({userId : profile.id} , (err , user) => {
			  if (err) {
				return done(err)
			  }else {
				if (!user) {
				  let user = new User({ 
					userId   : profile.id , 
					userName    : profile.displayName  			
				  })
				  user.save(err => {
					if (err) { return done(err); } 
					// sendSMS.sendSMS(user)
					done(null, user)
				  })
				}else {
				  done(null , user)
				}
			  }
			})
		  })) 
		} 
	authGoogle = () => {
		passport.use(new GoogleStrategy({
			clientID: process.env.GoogleClientId,
			clientSecret: process.env.GoogleClientSecret,
			callbackURL: "/auth/google/callback"
		  },
		  function(accessToken, refreshToken, profile, done) {
			console.log(profile)
			User.findOne({userId : profile.id} , (err , user) => {
			  if (err) {
				return done(err)
			  }else {
				if (!user) {
				  let user = new User({ 
					userId   : profile.id , 
					userName    : profile.displayName  			
				  })
				  user.save(err => {
					if (err) { return done(err); } 
					sendSMS(user)
					done(null, user)
				  })
				}else {
				  done(null , user)
				}
			  }
			})
		  }))
	} 
}
module.exports = new Index() 
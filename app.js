const {createServer} = require("http")
const express  = require("express") 
const path     = require("path") 
const normalizePort = require("./portCleaner")
const IndexRouter = require("./routes/indexRouter") 
const mongoose = require("mongoose") 

const {LocalDB , options}= require("./dbConfiguration")
const app = express() 

//Setting the static file path 
app.use(express.static(path.join(__dirname , "public"))) 

//Set the views 
app.set("views" , path.join(__dirname , "views")) 
app.set("view engine" , "pug") 

app.use(express.json()) 
app.use(express.urlencoded({extended : false})) 

const requestHandler = (req , res) => {
    res.send("Welcome home")
}

const port = normalizePort(process.env.PORT || 3000)
 
app.set("port" , port)

//Error 404 Handling Middleware 
const error404 = (req , res , next) => {
    res.render("error404")
}
//Error Handling Middleware 
const errorHandler = (err, res , req, next) => { 
    res.locals.message  = err.message 
    res.locals.error = req.app.get("env") === "development" ? err : {} 

    // render the error page
    res.status(err.status || 500);
    res.render('error');
} 

app.use("/" , IndexRouter) 
//app.use("/" , error404) 
// app.use("/" , errorHandler)
//Create Server and listen to incoming request 
mongoose.connect(LocalDB, options) 
let db = mongoose.connection 
db.on('error' , console.error.bind(console , 'MongoDB connection error'))
db.on('open' , console.info.bind(console , 'Connection to the database was ok'))
//app.use(requestHandler)
createServer(app) 
.listen(port , () => {console.log("Your app is running")})
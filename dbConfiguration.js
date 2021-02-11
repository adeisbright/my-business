exports.LocalDB = "mongodb://127.0.0.1:27017/mybusiness"  
exports.options = {
      useNewUrlParser : true , 
      useCreateIndex : true , 
      autoIndex : false , 
      poolSize : 15 , //The maximum number of sockets to keep open for this connection by the mongo engine
      keepAlive : true , 
      useUnifiedTopology : true , //This opts in to use the new Mongo Driver Engine connection
      keepAliveInitialDelay : 5e6 , 
      useFindAndModify : false , //Makes findOneAndUpdate  to use native findOneAndUPdate
      serverSelectionTimeoutMS : 10e3 , 
      socketTimeoutMS : 5000
}
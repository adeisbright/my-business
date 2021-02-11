let mongoose = require("mongoose") 
let Schema = mongoose.Schema 
let BusinessSchema = new Schema({
    name : String , 
    email : String , 
    password : String , 
    mission : String , 
    vision : String , 
    phoneNumber : String , 
    businessBirthYear : Date , 
    dateJoined : {
        type : Date , 
        default : Date.now()
    } , 
    services : [] , 
    branches : [{ 
        country : String , 
        state: String , 
        city : String , 
        branchName : String , 
        street : String , 
        postalCode : String , 
    }] , 
    documents : [] , 
    avatar : [] ,
    isValid : {
        type : Boolean , 
        default : false
    } , 
    confirmationCode : String,
    confirmationElapse : Date
})

BusinessSchema.index({email : 1 , name : 1}) 
// BusinessSchema.virtual.get(function(url){
//     return `/${this.name}`
// })
BusinessSchema.method.describe = function(){
    return `${this.name} has ${this.branches.length} 
    and was founded in ${this.businessBirthYear.toLocaleDateString()}`
}
module.exports = mongoose.model("business" , BusinessSchema)
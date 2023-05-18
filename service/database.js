// import mongosh
const mongoose=require("mongoose")

//connection string 
mongoose.connect("mongodb://localhost:27017/Reminder_App",{
useNewUrlparser:true
})

//define model 
 const Remind=mongoose.model('Remind',{
    user_id:Number,
    username:String,
    password:String,
    reminders:[],


})
module.exports={
    Remind
}
const jwt = require("jsonwebtoken");

const database = require("./database");


const register = (usid,uname,pswd) => {
  console.log(usid);
    return database.Remind.findOne({
      user_id:usid,
    }).then((res) => {
      if (res) {
        return {
          status: false,
          message: "account already exist!...please login!",
          statusCode: 404,
        };
      } else {
        let remind = new database.Remind({
          user_id:usid,
          username:uname,
          password:pswd
        });
        console.log(remind)
        remind.save();
        return {
          status: true,
          message: "Registration completed",
          statusCode: 201,
        };
      }
    });
  };

  const login = (uname, psw) => {
    return database.Remind.findOne({
      username: uname,
      password: psw,
    }).then((res) => {
      console.log(res +"from login in ds")
      if (res) {
        currentUser = res.uname;
        currentUserName = uname;
        token = jwt.sign(
          //acno of current user
          { currentUserName :uname
           },
          "secretsuperkey1234"
        );
        return {
          status: true,
          message: "Login successfull",
          statusCode: 200,
          currentUser,
          currentUserName,
          token,
        };
      } else {
        return {
          status: true,
          message: "invalid password or account number",
          statusCode: 400,
        };
      }
    });
  };


  const addReminder=(reminder,date,req)=>{
    console.log(req.username +"from addReminder")
    console.log(reminder +"from addReminder")
    console.log(date +"from addReminder")
   return database.Remind.findOne({
    username:req.username
   }).then((res)=>{
    console.log(res +"from add reminder")
    if(res){
      let reminderObject ={
        reminder,
        date,
      }
      console.log(reminderObject +"from addreminder")
      res.reminders.push(reminderObject)
      res.save()
      return{
          status: true,
          message: "Reminder add  successfull",
          statusCode: 200,
      }
    }
    else{
      return{
          status: true,
          message: " Reminder cannot be added ",
          statusCode: 400,
      }
    }
   })
  }
  const getReminders= (username)=>{
    return database.Remind.findOne({
      username:username
    }).then(res=>{
      if(res){
        return{
          status:true,
          message:"success",
          data:res.reminders,
          statusCode:200
        }
      }
      else{
        return{
          status:false,
          message:"failed",
          data:res.reminders,
          statusCode:422
        }
      }
    })
  }
  










  module.exports = {
    register,
    login,
    addReminder,
    getReminders,
   
  };
  
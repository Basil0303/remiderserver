//importing express fw
const express=require("express")
const jwt=require("jsonwebtoken")
const cors=require("cors")

const dataservice =require("./service/dataservice")


//creating server app
const app = express()
app.use(express.json())

app.use(cors({
    origin:" http://localhost:4200"

}))


app.post('/register',(req,res)=>{
    const result = dataservice.register(req.body.usid,req.body.uname,req.body.pswd)
    console.log(req.body.usid +"from reg api")
    // if(result.status==true){
    //     res.status(result.statusCode).json(result)
    // }
    // else{
    //     res.status(result.statusCode).json(result)
    // }

    // res.send("succes")
    result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj)
    }) 
})

//login...............................................
app.post('/login',(req,res)=>{
    const result = dataservice.login(req.body.uname,req.body.psw,)
     // res.status(result.statusCode).json(result)
     result.then(resobj=>{
        res.status(resobj.statusCode).send(resobj);
        
    });
});


app.post('/reminder',(req,res)=>{
    const result = dataservice.addReminder(
      req.body.reminder,
      req.body.date,
      req
    )
    result.then((resultObject)=>{
      res.status(resultObject.statusCode).send(resultObject)
    })
  })

  app.post('/reminders',(req,res)=>{
    const result = dataservice.getReminders(req.body.username)
    result.then((resultObject=>{
      res.status(resultObject.statusCode).send(resultObject)
    }))
  })






//configuring port number
app.listen(3000,()=>{
    console.log("server running on port 3000")
})
const express=require('express')
const app=express()

const cors=require("cors")


app.use(express.json())
app.use(cors())


const db=require('./models')



const postrouter=require('./routers/Posts')
 app.use(postrouter)

 const Commentrouter=require('./routers/Comment')
 app.use("/comment",Commentrouter)
 const usersRouter = require("./routers/Users");
 app.use("/auth", usersRouter);

 const LikesRouter = require("./routers/Likes");
 app.use("/likes",LikesRouter);

db.sequelize.sync().then(()=>{
  app.listen(3003,()=>{
    console.log("Server is running at port 3003...")

  })
})





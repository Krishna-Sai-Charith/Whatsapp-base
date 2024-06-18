const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');




//connect to mongodb
main().then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    console.log('MongoDB connected');
}

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.get('/',(req,res)=>{
    res.send("working root")
})

//index route
app.get('/chats',async (req,res)=>{
    let chats=await Chat.find();
    console.log(chats);
    res.render('index.ejs',{chats});
})

//create route
app.get('/chats/new',(req,res)=>{
    res.render('new.ejs');
})

app.post('/chats',(req,res)=>{
    let {from,to,message}=req.body;
    let newchat=new Chat(
        {
         from:from,
         to:to,
         message:message,
         created_at:new Date()   
        }
    )
    newchat.save().then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect('/chats');
}
)

//edit route
app.get("/chats/:id/edit", async (req,res)=>{
    let {id}=req.params;
    let chat= await Chat.findById(id);

    res.render("edit.ejs",{chat});
    })

//update route
app.put("/chats/:id", async (req,res)=>{
    let {id}=req.params;
    let {message:newMsg}=req.body;
    let UpdatedChat= await Chat.findByIdAndUpdate(
        id,
        {message:newMsg},
        {new:true,runValidators:true}
    )
    console.log(UpdatedChat);
    res.redirect("/chats");
})

//delete route
app.delete("/chats/:id", async (req,res)=>{
    let {id}=req.params;
    let deletedChat= await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
})

app.listen(3000,()=>{
    console.log("listening on port 3000");
})


``
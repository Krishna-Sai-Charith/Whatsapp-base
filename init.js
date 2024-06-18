const mongoose=require('mongoose');
const Chat = require('./models/chat.js');

main().then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    console.log('MongoDB connected');
}


let chats=[
    {
        message:"send me exam scripts",
        from:"neha",
        to:"suma",
        created_at:new Date()
    },
        {
        message:"Hi teach me js",
        from:"Charith",
        to:"Sushant",
        created_at:new Date()
    },
        {
        message:"Em chestunva",
        from:"Bhavya",
        to:"Charith",
        created_at:new Date()
    },
]
Chat.insertMany(chats)
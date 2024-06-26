const mongoose=require('mongoose');

const chatSchema=new mongoose.Schema({
    message:{
        type:String,
        required:true,
        maxLength:50
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});

const Chat=mongoose.model('Chat',chatSchema);
module.exports=Chat
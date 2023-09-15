const messageModel = require("../model/messageModel");
module.exports.addmsg = async (req, res, next) =>{
    try{
        const {from , to , message} = req.body;
        const data = await messageModel.create({
            message :{
                text:message,
            },
            users:[from , to],
            sender: from,
        });
        if(data) return res.json({msg : "Data added Successfully."});
        return res.json({msg : "Data cannot be added."});
    }
    catch(e){
        next(e);
    }
}

module.exports.getAllmsg = async (req , res , next)=>{
    try{
        const {from , to} = req.body;
        const messages = messageModel.find({
            users:{
                $all: [from , to],
            }
        }).sort({updatedAt : 1});
        const projectedMessages = (await messages).map((msg)=>{
            return {
                fromSelf:msg.sender.toString() === from,
                message:msg.message.text
            }
        });
        res.json(projectedMessages);
    }
    catch(e){
        next(e);
    }
}
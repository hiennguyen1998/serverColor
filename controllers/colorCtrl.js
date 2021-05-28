const Color = require('./../models/colorModel')

exports.getAll = async(req,res) =>{
    try{
        console.log(req.query.name)
        let query
        if(req.query.name){
            let a = new RegExp(req.query.name, "i")
            query = Color.find({name: a})
        }
        let Colors = await query
        console.log("Colors: "+ Colors.length +Colors)
        let accuateRes = null
        let i
        Colors.forEach((color,index)=>{
            if(color.name === req.query.name){
                accuateRes = color
                Colors.splice(index,1)
            }
        })
        res.status(200).json({
            message: "Success",
            result: accuateRes,
            sugestion:{
                Colors
            }
        })
    }catch(err){
        res.status(404).json({
            message:"Failed",
            err: err.message
        })
    }
}

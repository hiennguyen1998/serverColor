const Color = require('./../models/colorModel')

exports.getAll = async(req,res) =>{
    try{
        let queryStr = req.query.name
        let x = queryStr.replace("–","-")
        console.log("q: "+x, "req: " +req.query.name)
        let query
        if(req.query.name){
            let a = new RegExp(x, "u")
            query = Color.find({name: a})
        }
        let Colors = await query
        console.log("Colors: "+ Colors.length +Colors)
        let accuateRes = null
        let i
        Colors.forEach((color,index)=>{
            if(color.name === x){
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


const Color = require('./../models/colorModel')
exports.getAll = async(req,res) =>{
    try{
        let queryStr = req.query.name
        let query
        queryStr = queryStr.replace("–","-")
        console.log("q: "+queryStr, "req: " +req.query.name)
        if(req.query.name){
            let regex = new RegExp(queryStr, "i")
            query = Color.find({name: regex})
        }
        let Colors = await query
        let accuateRes = null
        console.log("Colors: "+ Colors.length +Colors)
        if(Colors.length == 0){
            let nQueryStr = queryStr.split("-")[0]
            console.log(nQueryStr)
            let regex = new RegExp(nQueryStr, "i")
            query = Color.find({name: regex})
            Colors = await query
        }
        Colors.forEach((color,index)=>{
            if(color.name === queryStr){
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
const Color = require('./../models/colorModel')

exports.getAll = async(req,res) =>{
    try{
        //const query = req.query
        console.log(req.query.name)
        //const queryObj = {...req.query}
        let query
        if(req.query.name){
            // let queryStr = JSON.parse(`{"name": \/${req.query.name}\/i}`)
            // console.log( queryStr,typeof queryStr, typeof /blue/i)
            let a = new RegExp(req.query.name, "i")
            console.log(a)
            query = Color.find({name: a})
        }
        const Colors = await query
        let accuateRes = null
        Colors.find((color,index)=>{
            if(color.name === req.query.name){
                accuateRes = color
                Colors.splice(index,1)
            }
            //console.log("rs"+accuateRes)
        })
        Colors.splice(5)
        //console.log("type of: "+ typeof Colors)
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
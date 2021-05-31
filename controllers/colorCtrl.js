const Color = require('./../models/colorModel')
const stringSimilarity = require("string-similarity");

exports.getAll = async(req,res) =>{
    try{
        let queryStr = req.query.name.toUpperCase() ,Colors
        //let query
        //queryStr = queryStr.replace("–","-")
        //console.log("q: "+queryStr, "req: " +req.query.name)
        if(req.query.name){
            //let regex = new RegExp(queryStr, "i")
            Colors = await Color.find().select("-_id name")
        }
        // let Colors = await query
        // let accuateRes = null
        //console.log("Colors: "+ Colors.length +Colors)
        // if(Colors.length == 0){
        //     let nQueryStr = queryStr.split("-")[0]
        //     console.log(nQueryStr)
        //     let regex = new RegExp(nQueryStr, "i")
        //     query = Color.find({name: regex})
        //     Colors = await query
        // }
        // Colors.forEach((color,index)=>{
        //     if(color.name === queryStr){
        //         accuateRes = color
        //         Colors.splice(index,1)
        //     }
        // })
        let colorName =  Colors.map(obj => {
            let strName = obj.name.toUpperCase()
            return strName
        })
        console.log(queryStr,colorName)
    let matchedColor = stringSimilarity.findBestMatch(`${queryStr}`, colorName);
    console.log(matchedColor)
    // var matches = stringSimilarity.findBestMatch("abc", [
    //     "edward",
    //     "sealed",
    //     "realed",
    //     "theatre",
    //   ]);
    let result = matchedColor.bestMatch.rating === 0 ? null : matchedColor.bestMatch.target
    Colors = await Color.find({name: { $regex: new RegExp(`^${result}$`, "i") }})
    console.log(Colors)   
    res.status(200).json({
            message: "Success",
            Colors
        })
    }catch(err){
        res.status(404).json({
            message:"Failed",
            err: err.message
        })
    }
}
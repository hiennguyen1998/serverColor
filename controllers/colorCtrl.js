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
        let Colors = await query
        console.log("Colors: "+ Colors.length +Colors)
        let accuateRes = null
        // Colors.find((color,index)=>{
        //     if(color.name === req.query.name){
        //         accuateRes = color
        //         Colors.splice(index,1)
        //         // console.log(Colors.length)
        //     }
        //     // console.log("rs"+accuateRes)
        // })
        //Colors.splice(5)
        for (let index = 0; index < Colors.length; index++) {
            if(Colors[index].name === req.query.name){
                accuateRes = Colors[index]
                Colors.splice(index,1)
                break
            }
        }
        Colors.splice(5)
        console.log("DONE!!!!!!!!!!!!!!!!!!!!: "+ Colors)
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


// const a=[{n:"Hien",age:18},{n:"Tuan",age:18},{n:"lam",age:18},{n:"Tu",age:18}] 
// a.forEach((el,i) =>{
//     if(el.n  ==="lam")
//         {a.splice(i,1)}
// }) 
// console.log(a)
const twittermodel = require("../../models/twittermodel.js");

module.exports = {
    gettwitterdata : (req,res) => {
        console.log("in the get twitter data");
       
        // console.log(body);
        twittermodel.find({name : req.params.brandname },(error,result) =>{
            console.log("my tweet reviews",result);
            res.send(result);
            res.end();
        })
    }
}
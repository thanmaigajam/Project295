const twittermodel = require("../../models/twittermodel.js");

module.exports = {
    gettwitterdata : (req,res) => {
        console.log("in the get twitter data");
       
        console.log(req.params.brandname);
        console.log(req.params.reviewtype);
        twittermodel.find({name : req.params.brandname,reviewtype : req.params.reviewtype},(error,result) =>{
            console.log("my tweet reviews",result);
            res.send(result);
            res.end();
        })
    }
}
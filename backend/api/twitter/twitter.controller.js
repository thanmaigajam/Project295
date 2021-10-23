const twittermodel = require("../../models/twittermodel.js");

module.exports = {
    gettwitterdata : (req,res) => {
        console.log("in the get twitter data");
        body =  req.body;
        console.log(body);
        twittermodel.find({},(error,result) =>{
            console.log("my tweet reviews",result);
            res.send(result);
            res.end();
        })
    }
}
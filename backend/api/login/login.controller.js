const User = require("../../models/usermodel.js");


module.exports = {
 
    login: (req, res) => {
      User.findOne({ email: req.body.email}, (error, result) => {
        console.log(req.body)
        console.log("in login")
        if (error) {
          console.log(error);
          //callBack(error);
        } else {
          if (result && result != null) {
            const payload = { _id: result._id };
        
            console.log(result);
            //res.body = user;
            return res.send(result);
          } else {
            res.writeHead(401, {
              'Content-Type': 'text/plain'
            })
            console.log('invalid');
            res.end("Invalid Credentials");
          }
        }
  
      });
    }
  }
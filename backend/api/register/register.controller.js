const User = require("../../models/usermodel.js");

module.exports = {
    register: (req, res) => {
        console.log("in register controller")
        body = req.body
        console.log(body);
            User.findOne({email: body.remail}, (error, result) => {
                if (result) {
                  console.log(error);
                  //callBack(error);
                  console.log("User already registered");
                  res.end("exists");
                }
              
                else {
                  var newUserDetails = new User({
                      email: body.remail, password: body.rpassword, name:body.rname, brandname:body.rbrand
                  });
              
                  newUserDetails.save((error, data) => {
                    if (error) {
                      console.log('error', error);
                      
                      res.end("error");
                    }
                    else {
                      console.log('data', data);
                     
                      res.end("success");
                    }
                  });
                }
              });
    },
    }

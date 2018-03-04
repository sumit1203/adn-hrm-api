var MongoClient = require('mongodb').MongoClient;
var jwt= require('jsonwebtoken');
var config=require('../config');
require('dotenv').load()

module.exports = {
    auth:function(req, res, next)
    {
        var username=req.body.username;
        var password=req.body.password;
        var url = process.env.DB + 'heroku_szcw1h07';  
             MongoClient.connect(url, function (err, db) {
                if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
                 var queryGetAcc = {userName:username,password:password};
                 db.collection('Employee').findOne(queryGetAcc,function(error, employee){
                    if(error){
                        db.close(); 
                        return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message,data:null});
                    }
                    if (!employee) {
                        db.close(); 
                        return res.status(404).json({success:false,errmsg:"No user found.",message:"No user found.",data:null});
                    }
                    if (employee.password != req.body.password) {
                        db.close(); 
                        return res.status(401).json({success: false,errmsg:"Authentication failed.",message:"Authentication failed.",data:null  });
                    }
                    db.close();
                    var token = jwt.sign({ id: employee._id }, config.secret, {
                          //expiresIn: 86400,
                          expiresIn:900 // 15 mintiue
                      });
                    return res.status(200).json({success: true,message:'Token.',token:token});
                });
            });
          
    }
}

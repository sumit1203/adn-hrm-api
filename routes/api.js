var express = require('express');
var router = express.Router();
var config=require('../config');
var jwt= require('jsonwebtoken');

var adn=require('../api/new_api');
var token=require('../api/auth');

//router.get('/getEmp', adn.getEmployee);

router.post('/addEmployee',authcheck, adn.addEmployee);


router.post('/login',appauth, adn.login);

//login
router.post('/auth', token.auth);
// //validateEmp

 router.post('/validateEmpId',authcheck, adn.validateEmpId);

// //ChangePassword
router.post('/changePassword',authcheck, adn.changePassword);

// //personal
router.post('/submitPersonal',authcheck, adn.submitPersonal);

// //OfficeInfo
router.post('/submitOfficeInfo',authcheck, adn.submitOfficeInfo);

// //positionDetails
router.post('/submitPositionDetails',authcheck, adn.submitPositionDetails);

// //previousEmployment
router.post('/submitpreviousEmployment',authcheck, adn.submitpreviousEmployment);

// //payrollInformation
router.post('/submitPayrollInformation',authcheck, adn.submitPayrollInformation);

// //krawizad
router.get('/kraWizardSelect',authcheck, adn.kraWizardSelect);

// //initiateKRA
router.post('/initiateKRA',authcheck, adn.initiateKRA);

 //setKRA 
 router.get('/setKRA',authcheck, adn.setKRA);

// //
router.post('/setKRADraft',authcheck, adn.setKRADraft);

// //kra
router.get('/checkKra',authcheck, adn.checkKra);

// //input
router.get('/checkInputTable',authcheck, adn.checkInputTable);

// //drafts
router.get('/checkDraftsTable',authcheck, adn.checkDraftsTable);

// //approval
router.get('/checkApprovalTable',authcheck, adn.checkApprovalTable);

// //clarification
router.get('/checkClarificationTable',authcheck, adn.checkClarificationTable);


// //login
router.post('/forgetPassword',appauth, adn.forgetPassword);

//router.post('/sendmail', sendmail.sendmail);

function authcheck(req,res,next)
{
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        return next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
}

function appauth(req,res,next)
{
  if(req.headers['x-access-type'] && (req.headers['x-access-type']=="mobileapp"||req.headers['x-access-type']=="webportal"))
  {
    return next();
  }
  else{
    return res.status(403).send({ 
      success: false, 
      message: 'Bad Request.' 
  });
  }
}



// Get IP from Request
function GetIP(req)
{
  var IP = '';
  //console.log(req.headers['x-forwarded-for']);  
  //console.log(req.connection.remoteAddress);  
    if (req.headers['x-forwarded-for']) {
      IP = req.headers['x-forwarded-for'].split(",")[0];
      IP = IP.split(":")[0];
    } else if (req.connection && req.connection.remoteAddress) {
      IP = req.connection.remoteAddress;
    } else {
      IP = req.ip;
    }
    return IP;
}
// End Get IP from Request

// Request Logs
function insertAPILogs(req)
    {
        var MongoClient = require('mongodb').MongoClient;
        var url = process.env.DB + 'accounts';
        console.log(req.url);
        MongoClient.connect(url, function (err, db) 
            {
              db.collection('apilogs').insertOne({
                                            "URL": req.url,
                                            "Request": req.body, 
                                            "CreatedDateTime" : moment().format().toString(),
                                        }, function(error, result)
                                        {
                                        if(error) {
                                            console.log(error);
                                        }    
                                    });   
                                    db.close();
            });
    };

// End Request Logs

module.exports = router;

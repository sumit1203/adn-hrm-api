var MongoClient = require('mongodb').MongoClient;
var sendmail = require('./sendmail.js');

var config=require('../config');
var jwt= require('jsonwebtoken');

var SHA256 = require('crypto-js/sha256');
var moment = require('moment')
var bcrypt = require('bcrypt')

require('dotenv').load();

//var url="mongodb://adnadmin:dG0KBn2ORP1zq27W@cluster0-shard-00-00-xbsfy.mongodb.net:27017,cluster0-shard-00-01-xbsfy.mongodb.net:27017,cluster0-shard-00-02-xbsfy.mongodb.net:27017/adnhrm?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
//var url="mongodb://heroku_szcw1h07:sa8e8tbc76vlauqq0dlq2jh126@ds029725.mlab.com:29725/heroku_szcw1h07";

module.exports = {
 addEmployee:function(req, res, next) {
         var url = process.env.DB + 'heroku_szcw1h07';    
         var empArray = req.body.emp;
		
	    MongoClient.connect(url, function (err, db) {
           if(err) 
           {
              return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});
           }
            db.collection('Employee').insertOne({
                name:empArray[0].value,
                officeEmail:empArray[1].value,
                officeMobile:empArray[2].value,
                empId:empArray[3].value,
                buisnessDivsion:empArray[4].value,
                department:empArray[5].value,
                vertical:empArray[6].value,
                subVertical: empArray[7].value,
                designation: empArray[8].value
            },function(error,Employee)
            {
               if(error)
               {
                  db.close();
                  return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message,data:null});
               }
               else{
                  db.close();
                  return res.status(200).json({success:true,message:'Employee successfully added.',data:true});
               }
            })
        });

},
login:function(req, res, next) {
    var url = process.env.DB + 'heroku_szcw1h07';    
    var username = req.body.username;
    var password = req.body.password;
    MongoClient.connect(url, function (err, db) {
            if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
            var queryGetAcc = {userName: username};
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
                var token = jwt.sign({ id: employee._id }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                  });
                employee.token=token;
                
                db.close();
                return res.status(200).json({success: true,message:'Successfully logged in.',data:employee});
            });
    });
},
 validateEmpId:function(req, res, next) {
    var url = process.env.DB + 'heroku_szcw1h07';  
    var empId=req.body.empId;  
    MongoClient.connect(url, function (error, db) {
        if(error) {return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});}
        var queryGetAcc = { empId: empId};
        db.collection('Employee').findOne(queryGetAcc,function(err,user){
            if(err) 
            {
                db.close();
                return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});
            }
            if (!user){ 
                db.close();
                return res.status(404).json({success:false,message:"No employee found.",data:null});
            }
            db.close();
            return res.status(200).json({success:true,message:'Successfully Validated.',data:true});
        });
    });
},
 changePassword:function(req, res, next) {
    var url = process.env.DB + 'heroku_szcw1h07';    
    var username = req.body.username;
    var password = req.body.password;
    MongoClient.connect(url, function (err, db){
        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
            var queryGet = {userName: username};
                var queryUpdate ={$set:{"password": password,"passwordReset":true}};
                db.collection('Employee').findAndModify(queryGet,[['_id','asc']], queryUpdate,{},
                      function(error, result){
                      if(error){
                         db.close();
                         return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message,data:false});
                      }
                      else
                      {
                        db.close();
                        return res.status(200).json({success:true,message:"Password changed successfully.",data:true});
                      }
                });
                
            });
},
 submitPersonal:function(req, res, next) {
    var url = process.env.DB + 'heroku_szcw1h07';    
    var empId=req.body.empId;
    var dataArray=req.body.dataArray;
    var type=req.body.type;

    var dummyArray=new Array();
    var dummyObj=new object();

       if (type == "personal") {
            dummyObj.gender = dataArray[4].value;
            dummyObj.personalEmail = dataArray[8].value;
            dummyObj.personal.Mobile = dataArray[6].value;
            dummyObj.dob = dataArray[5].value;
            dummyObj.bloodGroup = dataArray[10].value;
            dummyObj.religion = dataArray[11].value;
            dummyObj.nationality = dataArray[13].value;
            dummyObj.homePhone = dataArray[7].value;
            dummyObj.motherName = dataArray[3].value;
            dummyObj.fatherName = dataArray[2].value;
            dummyObj.maritialStatus = dataArray[12].value;
            dummyObj.emergencyContactName = dataArray[14].value;
            dummyObj.emergencyContactNumber = dataArray[15].value;
       }
       else
       {
            dummyObj.presentAddress = " " + dataArray[0].value + " " + dataArray[1].value + "," + dataArray[2].value + "," + dataArray[3].value + "," + dataArray[4].value + "," + dataArray[5].value;
            dummyObj.permanentAddress = " " + dataArray[6].value + " " + dataArray[7].value + "," + dataArray[8].value + "," + dataArray[9].value + "," + dataArray[10].value + "," + dataArray[11].value;
       }
       dummyArray.push(dummyObj);

       // Update Pwd
       MongoClient.connect(url, function (err, db)
       {
          if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
          var queryGet = {empId: empId};
          var queryUpdate = {$set:{"personal": dummyArray}};
          db.collection('Employee').findAndModify(queryGet,[['_id','asc']],queryUpdate,{},function(error, employee){
                  if(error) {db.close();return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message,data:null});}
                  db.close(); 
                  return res.status(200).json({success:true,message:'Save Successfully',data:true});
           });
       });
},
submitOfficeInfo:function(req, res, next) {
    var url = process.env.DB + 'heroku_szcw1h07';    
    var empId=req.body.empId;
    var dataArray=req.body.dataArray;
    var type=req.body.type;

    var dummyArray=new Array();
    var dummyObj=new object();    

    if (type == "basicOffice") {
        dummyObj.idCardNumber = dataArray[2].value;
        dummyObj.companyName = dataArray[3].value;
        dummyObj.facility = dataArray[7].value;
        dummyObj.city = dataArray[8].value;
        dummyObj.country = dataArray[9].value;
        dummyObj.costCenter = dataArray[10].value;
    } else if (type == "joiningDetails") {
        dummyObj.dateOfJoining = dataArray[0].value;
        dummyObj.dateOfConfirmation = dataArray[1].value;
        dummyObj.stateOfConfirmation = dataArray[2].value;
        dummyObj.workPermitNumber = dataArray[3].value;
        dummyObj.effectiveDate = dataArray[4].value;
        dummyObj.expiryDate = dataArray[5].value;
    } else if (type == "performanceRating") {
        dummyObj.pfRating1516 = dataArray[0].value;
        dummyObj.pfRating1617 = dataArray[1].value;
    } else if (type == "separationDetails") {
        dummyObj.dateOfResignation = dataArray[23].value;
        dummyObj.dateOfSeparation = dataArray[5].value;
        dummyObj.separationEffectiveDate = dataArray[9].value;
        dummyObj.separationType = dataArray[24].value;
    }
    dummyArray.push(dummyObj)

    MongoClient.connect(url, function (err, db)
    {
       if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
       var queryGet = {empId: empId};
       var queryUpdate = {$set:{"officeDetails": dummyArray}};
       db.collection('Employee').findAndModify(queryGet,[['_id','asc']],queryUpdate,{},
               function(error, updateResult){
               if(error){
                db.close();
                return  res.status(500).json({success:false,errmsg:err.errmsg,message:err.message,data:false});
               }
               else
               {
                  db.close();
                  return res.status(200).json({success:true,message:'Save Successfully.',data:true});
               }
           });
    });
},
  submitPositionDetails:function(req, res, next) {  
    var url = process.env.DB + 'heroku_szcw1h07';    
    var empId=req.body.empId;
    var dataArray=req.body.dataArray;

    var dummyArray=new Array();
    var dummyObj=new object(); 
    
       dummyArray.designation = dataArray[0].value;
       dummyArray.employeeCategory = dataArray[1].value;
       dummyArray.employeeGrade = dataArray[2].value;
       dummyArray.buisnessDivision = dataArray[3].value;
       dummyArray.department = dataArray[4].value;
       dummyArray.vertical = dataArray[5].value;
       dummyArray.subVertical = dataArray[6].value;
       dummyArray.reportingManagerId = dataArray[7].value;
       dummyArray.reviewerId = dataArray[8].value;
       dummyArray.buisnessHrSpocId = dataArray[9].value;
       dummyArray.buisnessHrHeadId = dataArray[10].value;
       dummyArray.groupHrHeadId = dataArray[11].value;
       dummyArray.push(dummyObj);

        MongoClient.connect(url, function (err, db)
        {
             if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
                var queryGet = {empId: empId};
                var queryUpdate =   {$set:{
                    'designation':empArray[0].value,
                    'employeeGrade':empArray[2].value,
                    'buisnessDivsion':empArray[3].value,
                    'department':empArray[4].value,
                    'vertical':empArray[5].value,
                    'subVertical':empArray[6].value,
                    "officePositionDetails": dummyArray
                   }};
                db.collection('Employee').findAndModify(queryGet,[['_id','asc']],queryUpdate,{},
                    function(error, result){
                        if(error){
                            db.close();
                            return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});
                        }
                        else
                        {
                            db.close();
                            return res.status(200).json({success:true,message:'Save Successfully.',data:true});
                        }
                    });
        });
},
  submitpreviousEmployment:function(req, res, next) {  
        var url = process.env.DB + 'heroku_szcw1h07';    
        var empId=req.body.empId;
        var dataArray=req.body.dataArray;
    
        var dummyArray = new Array();
        var dummyObj = new Object();
           dummyObj.companyName = dataArray[0].value;
           dummyObj.companyBuisness = dataArray[1].value;
           dummyObj.designation = dataArray[2].value;
           dummyObj.department = dataArray[3].value;
           dummyObj.responsibility = dataArray[4].value;
           dummyObj.companyLocation = dataArray[5].value;
           dummyObj.employmentPeriod = dataArray[6].value;
           dummyObj.areaOfExperience = dataArray[7].value;
           dummyArray.push(dummyObj);
    
                MongoClient.connect(url, function (err, db)
                {
                    if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
                    var queryGet = {empId: empId};
                    var queryUpdate =   {$set:{"previousWorkDetails": dummyArray}};
                    db.collection('Employee').findAndModify(
                        queryGet,
                        [['_id','asc']],
                        queryUpdate,
                        {}, //options
                        function(error, result){
                            if(error){
                                db.close();
                                return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});
                            }
                            else
                            {
                                db.close();
                                return res.status(200).json({success:true,message:'Save Successfully.',data:true});
                            }
                        });
                });
},    
 submitPayrollInformation:function(req, res, next) {
    var url = process.env.DB + 'heroku_szcw1h07';    
    var empId=req.body.empId;
    var dataArray=req.body.dataArray;
    var type=req.body.type;
    var queryGetAcc = { empId: empId};
    MongoClient.connect(url, function (err, db)
    {
        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
        db.collection('payrollInformation').findOne(queryGetAcc,function(err, results){
            if(results)
            {
                var queryGet = {empId: empId};
                if (type == "bankDetails") {
                    var dummyArray = new Array();
                    var dummyObj = new Object();
                    dummyObj.bankName = dataArray[0].value;
                    dummyObj.accountName = dataArray[1].value;
                    dummyObj.accountNumber = dataArray[2].value;
                    dummyObj.currency = dataArray[3].value;
                    dummyArray.push(dummyObj);
                    results.payrollInformation[0].bankDetails=dummyArray;
                    //newPayInfo.set('bankDetails', dummyArray);
                } else if (type == "salaryDetails") { //salaryDetails
                    var dummyArray = new Array();
                    var dummyObj = new Object();
                    dummyObj.basic = dataArray[0].value;
                    dummyObj.hra = dataArray[1].value;
                    dummyObj.conveyanceAllowance = dataArray[2].value;
                    dummyObj.lfa = dataArray[3].value;
                    dummyObj.medicalAllowance = dataArray[4].value;
                    dummyObj.specialAllowance = dataArray[5].value;
                    dummyObj.grossSalary = dataArray[6].value;
                    dummyObj.lunchAllowance = dataArray[7].value;
                    dummyObj.mobileAllowance = dataArray[8].value;
                    dummyObj.otherAllowance = dataArray[9].value;
                    dummyObj.totalEarnings = dataArray[10].value;
                    dummyArray.push(dummyObj); //push object into array
                    results.payrollInformation[0].salaryDetails=dummyArray;
                    //newPayInfo.set('salaryDetails', dummyArray); //push into salary details array
                } else if (type == "otherBenefitDetails") {
                    var dummyArray = new Array();
                    var dummyObj = new Object();
                    dummyObj.festivalAllowance = dataArray[0].value;
                    dummyObj.providentFundMembership = dataArray[1].value;
                    dummyObj.groupLifeInsurance = dataArray[2].value;
                    dummyObj.hospitalizationScheme = dataArray[3].value;
                    dummyArray.push(dummyObj); //push object into array
                    results.payrollInformation[0].otherBenefitDetails=dummyArray;
                    //newPayInfo.set('otherBenefitDetails', dummyArray);
                } else if (type = 'companyCarDetails') {
                    var dummyArray = new Array();
                    var dummyObj = new Object();
                    dummyObj.registrationNumber = dataArray[0].value;
                    dummyObj.effectiveDate = dataArray[1].value;
                    dummyObj.expiryDate = dataArray[2].value;
                    dummyObj.fuelAllowance = dataArray[3].value;
                    dummyObj.maintainanceAllowance = dataArray[4].value;
                    dummyObj.driverAllowance = dataArray[5].value;
                    dummyObj.grossPay = dataArray[6].value;
                    dummyArray.push(dummyObj); //push object into array
                    results.payrollInformation[0].companyCarDetails=dummyArray;
                    //newPayInfo.set('companyCarDetails', dummyArray);
                } else if (type == "personalCarDetails") {
                    var dummyArray = new Array();
                    var dummyObj = new Object();
                    dummyObj.registrationNumber = dataArray[0].value;
                    dummyObj.effectiveDate = dataArray[1].value;
                    dummyObj.expiryDate = dataArray[2].value;
                    dummyObj.ownCarUsageAllowance = dataArray[3].value;
                    dummyArray.push(dummyObj); //push object into array
                    results.payrollInformation[0].personalCarDetails=dummyArray;
                    //newPayInfo.set('personalCarDetails', dummyArray);
                }

                var queryUpdate ={$set:{"payrollInformation": dummyArray}};
                if(results.length==0)
                {
                    queryUpdate ={$set:{empId:empId,"payrollInformation": dummyArray}};
                }
                // Update Pwd
                        MongoClient.connect(url, function (err, db)
                        {
                            db.collection('employee').findAndModify(
                                queryGet,
                                [['_id','asc']],
                                queryUpdate,
                                {}, //options
                                function(error, result){
                                    if(error){
                                        db.close();
                                        return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});
                                    }
                                    else
                                    {
                                        db.close();
                                        return res.status(200).json({success:true,message:'Save Successfully.',data:true});
                                    }
                                });
                        });
            }
            else {
                res.send({status:'FAILED',message:'Failed login attempt. Please retry.'})
            }
        });
    });
},
  kraWizardSelect:function(req, res, next) { 
    var url = process.env.DB + 'heroku_szcw1h07';    
    var dept=req.body.dept;
    var grade=req.body.grade;
    MongoClient.connect(url, function (err, db)
    {
        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
        var queryGetAcc = { department: department};
        if(grade.length > 0)
        {
           queryGetAcc={department:{$in:grade}}
        }
        db.collection('Employee').find(queryGetAcc).toArray(function(error, user){
            if(error)
            {
                db.close();
                return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});
            }
            else{
                db.close();
                return res.status(200).json({success:true,message:'Selected KRA',data:user});
            }
         });
    });
},
 initiateKRA:function(req, res, next) {
    var url = process.env.DB + 'heroku_szcw1h07';    
    var empArray=req.body.empArray;
    var initiatorId=req.body.initiatorId;
    MongoClient.connect(url, function (err, db)
    {
        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
      var  queryGetAcc={department:{$in:grade}}
      db.collection('Employee').find(queryGetAcc).toArray(function(error, results){
        if(error)
        {
            db.close();
            return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});
        }
        else
        {
           if (results.length > 0) {
                    getKRACount(function(count) { //get count of entries in KRA table
                        for (i = 0; i < results.length; i++) {
                            addToKRATable(results[i], count + i, initiatorId); //to initiate KRA for selection,add values into KRA table
                        }
                    });
                    return res.status(200).json({success:true,message:'Initiated KRA',data:true});
            }
            else
            {
                db.close();
                return res.status(200).json({success:true,message:'Initiated KRA',data:null});
                
            }
        }
      });
   });
},
 setKRA:function(req, res, next) {
    var url = process.env.DB + 'heroku_szcw1h07';    
    var kraArray=req.body.kraArray;

    var empId = '';
    var kraId = 'k_0';


   MongoClient.connect(url, function (err, db)
    {
        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
        
    var dummyArray = new Array();
     for (i = 0; i < kraArray.length; i++) {
        if (kraArray[i].complete) {
            var dummyObj = new Object(); //create object to push into array
            dummyObj.kra = kraArray[i].kra;
            dummyObj.kraCat = kraArray[i].kraCategory;
            dummyObj.kraWeight = kraArray[i].kraWeight;
            dummyObj.kraUos = kraArray[i].kraUnitSuccess;
            dummyObj.kraMos = kraArray[i].kraMeasureSuccess;
            dummyArray.push(dummyObj); //push object into array
        }
     }
        var  queryGet={kraId:kraId};
        var queryUpdate =   {$set:{"kraValue": dummyArray,
        'version':'live',
        'stage': 'posted',
        'endDate': new Date()
        }};
    db.collection('Kra').findAndModify(queryGet,[['_id','asc']],queryUpdate,{},function(error, result){
            if(error){
                db.close();
                return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});
            }
            else
            {
                addToApprovalTable('KRA', result.kraId, result.supervisorId, 'live', new Date()); //this will add a copy to input table
                return res.status(200).json({success:true,message:'KRA Set Successfully',data:true});
            }
        });
    });
 
},
 setKRADraft:function(req, res, next) {
    var url = process.env.DB + 'heroku_szcw1h07';    
    var empId = '';

    var kraId = 'k_0';
    var kraArray=req.body.kraArray;

    MongoClient.connect(url, function (err, db)
    {
        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
        
     var dummyArray = new Array();
     for (i = 0; i < kraArray.length; i++) {
         var dummyObj = new Object(); //create object to push into array
         dummyObj.kra = kraArray[i].kra;
         dummyObj.kraCat = kraArray[i].kraCategory;
         dummyObj.kraWeight = kraArray[i].kraWeight;
         dummyObj.kraUos = kraArray[i].kraUnitSuccess;
         dummyObj.kraMos = kraArray[i].kraMeasureSuccess;
         dummyArray.push(dummyObj); //push object into array
     }
     var queryGet = {kraId: kraId};
     var queryUpdate =  {$set:{"kraValue": dummyArray,
     'version':'live',
     'stage': 'draft',
     'endDate': new Date()
    }}
    db.collection('Kra').findAndModify(queryGet,[['_id','asc']],queryUpdate,{},
        function(error, KRA){
            if(error){
                db.close();
                return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});
            }
            else
            {
               addToDraftTable('KRA', KRA.kraId, KRA.empId, 'live', new Date());
               return res.status(200).json({success:true,message:'KRA Draft Set Successfully',data:true});
            }
    });
   });
},
 checkKra:function(req, res, next) {
    var url = process.env.DB + 'heroku_szcw1h07';    
    var empId=req.body.empId;
    var kraId = 'k_0';
    MongoClient.connect(url, function (err, db)
    {
        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
        
        var queryGet = {empId: empId};
        db.collection('Kra').find(queryGet,
        function(error, results){
            if(error){
                db.close();
                return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});
            }
            else
            {
                if (results.length) {
                    db.close();
                   return res.status(200).json({success:true,message:'New KRA',data:true});
                } else {
                    db.close();
                    return res.status(200).json({success:true,message:'NO Kra is Present',data:null});
                }
            }
        });
    });
},
 checkInputTable:function(req, res, next) {
    var url = process.env.DB + 'heroku_szcw1h07';    
    var empId=req.body.empId;
    MongoClient.connect(url, function (err, db)
    {
        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
        
    var queryGet = {empId: empId};
    db.collection('Inputs').find(queryGet,
       function(error, results){
           if(error){
            db.close();
            return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});
           }
           else
           {
              if (results.length) {
                db.close();
                return res.status(200).json({success:true,message:'Input',data:results});
              } else {
                db.close();
                return res.status(200).json({success:true,message:'NO Input is Present',data:null});
              }
           }
    });
    });
},
 checkDraftsTable:function(req, res, next) {   
    var url = process.env.DB + 'heroku_szcw1h07';    
    var empId=req.body.empId;
    MongoClient.connect(url, function (err, db)
    {
        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
        
        var queryGet = {empId: empId,status:'live'};
        db.collection('Drafts').find(queryGet,
        function(error, results){
            if(error){
                db.close();
                return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});
            }
            else
            {
                if (results.length) {
                    db.close();
                    return res.status(200).json({success:true,message:'Draft List',data:true});
                } else {
                    db.close();
                    return res.status(200).json({success:true,message:'No Draft ',data:null});
                }
            }
        });
    });
},
 checkApprovalTable:function(req, res, next) {
    var url = process.env.DB + 'heroku_szcw1h07';    
    var empId=req.body.empId;
    MongoClient.connect(url, function (err, db)
    {
        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
        
        var queryGet = {empId: empId,status:'live'};
        db.collection('Approvals').find(queryGet,
          function(error, results){
            if(error){
                db.close();
                return res.status(500).json({message:"Failed login attempt. Please retry.",status:'FAILED',response:error});
            }
            else
            {
                if (results.length) {
                    db.close();
                    return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:results});
                } else {
                    db.close();
                    return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:true});
                }
            }
        });
    });
},
 checkClarificationTable:function(req, res, next) {  
    var url = process.env.DB + 'heroku_szcw1h07';    
    var empId=req.body.empId;
    MongoClient.connect(url, function (err, db)
    {
        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
        
        var queryGet = {empId: empId,status:'live'};
        db.collection('Clarification').find(queryGet,
            function(error, results){
            if(error){
                db.close();
                return res.status(500).json({message:"Failed login attempt. Please retry.",status:'FAILED',response:error});
            }
            else
            {
                if (results.length) {
                    db.close();
                    return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:results});
                } else {
                    db.close();
                    return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:true});
                }
            }
        });
    });
 },
 forgetPassword: function(req, res, next) {
    //send email
    var url = process.env.DB + 'heroku_szcw1h07'; 
    var queryGetAcc = { empId: req.body.empId};
    MongoClient.connect(url, function (err, db) {
        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
        
       var date = SHA256(moment().format().toString())
        db.collection('Employee').findAndModify(
            queryGetAcc,
            [['_id','asc']],
            {$set:{
                "passwordReset": date.toString()
            }},
            {}, //options
            function(error, result){
                //assert.equal(error1, null);
                if(error)
                {
                   return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});
                }
                db.close();
                //var ToEmail=result.email;
                var Subject='Reset Password Link';
                var Body =`<strong>Hi,</strong><br><br>Adn recently received a request for a forgotten password. <br><br>To change your adn hrm password, Please click on this <a href="https://www.adn.org/reset/${date}">link</a><br><br>This link will expire in 10 minutes.<br><br>Thanks<br>Adn Support`
                //sendmail.sendmail(ToEmail,Subject,Body);
                return res.status(200).json({success:true,message:'Reset Email Link Send Successfully.',data:true});
            });
    
    });
},
 getReset: function(req, res, next) {
    var url = process.env.DB + 'heroku_szcw1h07'; 
    var queryGetAcc = {reset: req.params.slug };
    MongoClient.connect(url, function (err, db) {
        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
        
        db.collection('Employee').findOne(queryGetAcc, function(error, result){ console.log(error,result)
            if(!error && result!=null){
                res.render('reset', { title: 'Token | Wallet', reset_code: req.params.slug });
            } else {
                res.send({data:"Reset Link Expired11", status: "FAILED"});
            }
        });
    });
},
 postReset: function(req, res, next) {
    var url = process.env.DB+'accounts';

    MongoClient.connect(url, function (err, db) {
        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
        
        db.collection('Employee').findOne({reset: req.body.reset_code}, function(error, result){
            if(error) {
                res.send({message:"Reset link expired ",status:'FAILED'});
            } else {
                var hash = bcrypt.hashSync(req.body.password.toString(), 10)
                db.collection('accounts').findAndModify(

                {reset: req.body.reset_code},

                [['_id','asc']],

                {$set:{
                    "reset": '',
                    "password": hash
                }},

                {}, //options
                function(error1, result1){
                    //assert.equal(error1, null);
                    if(error1){
                        console.log("mongo error",error1)
                        res.send({message:"Something Went Wrong.",status:'FAILED'});
                    }
                    res.send({message:"Password Changed Successfully.",status:'SUCCESS'});
                    db.close();
                });

            }
        });
    });
},
}

//generic draft table
function addToDraftTable(type, typeId, empId, status, startDate) {
    MongoClient.connect(url, function (err, db)
    {
        resetInputTable(typeId, 'inDraft', function() {
            var query={
                'type':'KRA',
                'typeId':typeId,
                'empId':empId,
                'status':status,
                'startDate':new Date()
            }
            db.collection('Drafts').insert(query,function(error,result)
                {
                    if(error)
                    {
                        console.log(error)
                    }
                    else{
                        console.log(result)
                    }
                }
            );
        }); 
    });
}

//Generic Function to add to approval Table
function addToApprovalTable(type, typeId, empId, status, startDate) {
    MongoClient.connect(url, function (err, db)
    {
        var query={
            'type':type,
            'typeId':typeId,
            'empId':empId,
            'status':status,
            'startDate':startDate,
            'endDate':new Date()
        };
        db.collection('Approvals').insert(query,function(error,result)
            {
                if(error)
                {
                   console.log(error)
                }
                else{
                 console.log(result)
                }
            }
        );
    });
}
//clear entry from Input table
function resetInputTable(typeId, status, callback) {
    MongoClient.connect(url, function (err, db)
    {
        var queryGet={
            'typeId':typeId,
        };
        var queryUpdate =  {$set:{"status": status,
        }}

        db.collection('Inputs').findAndModify(queryGet,[['_id','asc']], queryUpdate,{},function(error,result)
        {
            if(error)
                {
                   console.log(error)
                }
                else{
                 console.log(result)
                }

        });
    });
}

//Generic Function to add to Input Table
function addToInputTable(type, typeId, empId, status, startDate) {
    
    MongoClient.connect(url, function (err, db)
    {
    var query={
        'type':type,
        'typeId':typeId,
        'empId':empId,
        'status':status,
        'startDate':startDate,
    }
    db.collection('Inputs').insert(query,function(err,result)
        {
           if(error)
           {
            res.send({message:"Something Went Wrong.",status:'FAILED'});
           }
           else{
            res.send({message:"Something Went Wrong.",status:'sucess',response:null});
           }
        }
    );
   });
}

function addToKRATable(empData, kraIndex, initiatorId) {
    MongoClient.connect(url, function (err, db)
    {
            var query={
                'kraId': 'k_' + kraIndex,
                'empId':empData.empId,
                'empRef':empData,
                'kraValue':[],
                'version':live,
                'startDate':new Date(),
                'endDate':new Date(),
                'valDate':new Data().addHours(730)
            }

            var dummyArray = new Array();
            var dummyObj = new Object(); //create object to push into array
            dummyObj.supervisorId = empData.supervisorId;
            dummyObj.supervisorInput = "";
            dummyObj.supervisorReview = false;
            dummyArray.push(dummyObj); //push object into array

            query.supervisor=dummyArray;
            query.supervisorId=empData.supervisorId;
            query.cameFrom=initiatorId;
            query.wentTo=empData.empId;
            query.stage='init';
            db.collection('Kra').insert(query,function(err,result)
                {
                if(error)
                {
                    res.send({message:"Something Went Wrong.",status:'FAILED'});
                }
                else{
                    addToInputTable('KRA', result.kraId, result.empId, 'live', new Date());
                }
                }
            );
    });
}

function getKRACount(next) {
  MongoClient.connect(url, function (err, db){
      db.collection('Kra').count(function(error,count)
        {
        if(error)
        {
            return false;
        }
        else{
            return next(count);
        }
        });
    });
}
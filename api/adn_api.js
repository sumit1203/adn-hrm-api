// var MongoClient = require('mongodb').MongoClient;
// var sendmail = require('./sendmail.js');

// var config=require('../config');
// var jwt= require('jsonwebtoken');

// var SHA256 = require('crypto-js/sha256');
// var moment = require('moment')
// var bcrypt = require('bcrypt')

// require('dotenv').load();

// //var url="mongodb://adnadmin:dG0KBn2ORP1zq27W@cluster0-shard-00-00-xbsfy.mongodb.net:27017,cluster0-shard-00-01-xbsfy.mongodb.net:27017,cluster0-shard-00-02-xbsfy.mongodb.net:27017/adnhrm?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
// //var url="mongodb://heroku_szcw1h07:sa8e8tbc76vlauqq0dlq2jh126@ds029725.mlab.com:29725/heroku_szcw1h07";

// module.exports = {
// // getEmployee:function(req, res, next)
// // {
// //     var url = process.env.DB + 'heroku_szcw1h07';
// //     MongoClient.connect(url, function (err, db) {
// //         if(err)
// //         {
// //             return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message,data:null});
// //         }
// //         db.collection('Employee').find().toArray(function(error,result){
// //                 if(error)
// //                 {
// //                    db.close();
// //                    return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message,data:null});
// //                 }
// //                 else
// //                 {
// //                     db.close();
// //                   return res.status(200).json({status:'success',response:result});
// //                 }
// //         });
// //     });
// // },

// //function to add new employee
// //addEmployee:function(empArray, callback) {
//  addEmployee:function(req, res, next) {
//          var url = process.env.DB + 'heroku_szcw1h07';    
//          var empArray = req.body.emp;
		
// 	    MongoClient.connect(url, function (err, db) {
//            if(err) 
//            {
//               return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});
//            }
//             db.collection('Employee').insertOne({
//                 name:empArray[0].value,
//                 officeEmail:empArray[1].value,
//                 officeMobile:empArray[2].value,
//                 empId:empArray[3].value,
//                 buisnessDivsion:empArray[4].value,
//                 department:empArray[5].value,
//                 vertical:empArray[6].value,
//                 subVertical: empArray[7].value,
//                 designation: empArray[8].value
//             },function(error,Employee)
//             {
//                if(error)
//                {
//                   db.close();
//                   return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message,data:null});
//                }
//                else{
//                   db.close();
//                   return res.status(200).json({success:true,message:'Employee successfully added.',data:true});
//                }
//             })
//         });

//     // var Emp = new Parse.Object.extend('Employee');
//     // var newEmp = new Emp();

//     // newEmp.set('name', empArray[0].value);
//     // newEmp.set('officeEmail', empArray[1].value);
//     // newEmp.set('officeMobile', empArray[2].value);
//     // newEmp.set('empId', empArray[3].value);
//     // newEmp.set('buisnessDivsion', empArray[4].value);
//     // newEmp.set('department', empArray[5].value);
//     // newEmp.set('vertical', empArray[6].value);
//     // newEmp.set('subVertical', empArray[7].value);
//     // newEmp.set('designation', empArray[8].value);
//     // //newEmp.set('jobTitle',empArray[9].value);
//     // //save it in newEmp
//     // newEmp.save(null, {
//     //     success: function(Employee) {
//     //         ////console.log('New object created with objectId: ' + Employee.id);
//     //         callback(true);
//     //     },
//     //     error: function(Employee, error) {
//     //         // error is a Parse.Error with an error code and message.
//     //         //alert('Failed to create new object, with error code: ' + error.message);
//     //     }
//     // });
// },
// //login function
// //checklogin:function(username, password, callback) {
//  checklogin:function(req, res, next) {
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var username = req.body.username;
//     var password = req.body.password;
//     MongoClient.connect(url, function (err, db) {
//             if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
//             var queryGetAcc = {userName: username};
//             db.collection('Employee').findOne(queryGetAcc,function(error, employee){
//                 if(error){
//                     db.close(); 
//                     return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message,data:null});
//                 }
//                 if (!employee) {
//                     db.close(); 
//                     return res.status(404).json({success:false,errmsg:"No user found.",message:"No user found.",data:null});
//                 }
//                 if (employee.password != req.body.password) {
//                     db.close(); 
//                     return res.status(401).json({success: false,errmsg:"Authentication failed.",message:"Authentication failed.",data:null  });
//                 }
//                 var token = jwt.sign({ id: employee._id }, config.secret, {
//                     expiresIn: 86400 // expires in 24 hours
//                   });
//                 employee.token=token;
                
//                 db.close();
//                 return res.status(200).json({success: true,message:'Successfully logged in.',data:employee});
//             });
//     });
    
//     // var Employee = Parse.Object.extend("Employee");
//     // var query = new Parse.Query(Employee);
//     // query.equalTo("userName", username);
//     // query.equalTo("password", password);
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length) {
//     //             //to get info in local storage upon first login
//     //             // localStorage.empId = results[0].get('empId');
//     //             // localStorage.empObject = JSON.stringify(results[0]);
//     //             // localStorage.loggedIn = "true";
//     //             callback(true, results[0]);
//     //         } else {
//     //             callback(false, null);
//     //         }
//     //     },
//     //     error: function(error) {
//     //         //alert("Error: " + error.code + " " + error.message);
//     //     }
//     // });
// },
// // //empId validation function
// // //validateEmpId:function(empId, callback) {
//  validateEmpId:function(req, res, next) {
//     var url = process.env.DB + 'heroku_szcw1h07';  
//     var empId=req.body.empId;  
//     MongoClient.connect(url, function (error, db) {
//         if(error) {return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});}
//         var queryGetAcc = { empId: empId};
//         db.collection('Employee').findOne(queryGetAcc,function(err,user){
//             if(err) 
//             {
//                 db.close();
//                 return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});
//             }
//             if (!user){ 
//                 db.close();
//                 return res.status(404).json({success:false,message:"No employee found.",data:null});
//             }
//             db.close();
//             return res.status(200).json({success:true,message:'Successfully Validated.',data:true});
//         });
//     });

//     // var Employee = Parse.Object.extend("Employee");
//     // var query = new Parse.Query(Employee);
//     // query.equalTo("empId", empId);
//     // query.count({
//     //     success: function(count) {

//     //         if (count > 0) {
//     //             //to get info in local storage upon first login
//     //             callback(false);
//     //         } else {
//     //             callback(true);
//     //         }
//     //     },
//     //     error: function(error) {
//     //         //alert("Error: " + error.code + " " + error.message);
//     //     }
//     // });
// },
// // //chaneg password
// // //changePassword:function(username,password, callback) {
//   changePassword:function(req, res, next) {
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var username = req.body.username;
//     var password = req.body.password;
//     MongoClient.connect(url, function (err, db){
//         if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
//             var queryGet = {userName: userName};
//                 var queryUpdate ={$set:{"password": password,"passwordReset":true}};
//                 db.collection('Employee').findAndModify(queryGet,[['_id','asc']], queryUpdate,{},
//                       function(error, result){
//                       if(error){
//                          db.close();
//                          return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message,data:false});
//                       }
//                       else
//                       {
//                         db.close();
//                         return res.status(200).json({success:true,message:"Password changed successfully.",data:true});
//                       }
//                 });
                
//             });

//     // var Employee = Parse.Object.extend("Employee");
//     // var query = new Parse.Query(Employee);
//     // query.equalTo("userName", username);
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length) {
//     //             var newEmp = results[0];
//     //             newEmp.set('password', password);
//     //             newEmp.set('passwordReset', true); //setting change password to true indication pass reset for first time
//     //             newEmp.save(null, {
//     //                 success: function(Employee) {
//     //                     callback(true);
//     //                 },
//     //                 error: function(Employee, error) {
//     //                     //alert('Failed to create new object, with error code: ' + error.message);
//     //                 }
//     //             });
//     //             callback(true, results[0]);
//     //         } else {
//     //             callback(false, null);
//     //         }
//     //     },
//     //     error: function(error) {
//     //         //alert("Error: " + error.code + " " + error.message);
//     //     }
//     // });
// },
// // //function to submit personal form
// // //submitPersonal:function(empId, dataArray, type, callback) {
//    submitPersonal:function(req, res, next) {
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var empId=req.body.empId;
//     var dataArray=req.body.dataArray;
//     var type=req.body.type;

//        var dummyArray=new Array();
//        var dummyObj=new object();

//        if (type == "personal") {
//             dummyObj.gender = dataArray[4].value;
//             dummyObj.personalEmail = dataArray[8].value;
//             dummyObj.personal.Mobile = dataArray[6].value;
//             dummyObj.dob = dataArray[5].value;
//             dummyObj.bloodGroup = dataArray[10].value;
//             dummyObj.religion = dataArray[11].value;
//             dummyObj.nationality = dataArray[13].value;
//             dummyObj.homePhone = dataArray[7].value;
//             dummyObj.motherName = dataArray[3].value;
//             dummyObj.fatherName = dataArray[2].value;
//             dummyObj.maritialStatus = dataArray[12].value;
//             dummyObj.emergencyContactName = dataArray[14].value;
//             dummyObj.emergencyContactNumber = dataArray[15].value;
//        }
//        else
//        {
//             dummyObj.presentAddress = " " + dataArray[0].value + " " + dataArray[1].value + "," + dataArray[2].value + "," + dataArray[3].value + "," + dataArray[4].value + "," + dataArray[5].value;
//             dummyObj.permanentAddress = " " + dataArray[6].value + " " + dataArray[7].value + "," + dataArray[8].value + "," + dataArray[9].value + "," + dataArray[10].value + "," + dataArray[11].value;
//        }
//        dummyArray.push(dummyObj);

//        // Update Pwd
//        MongoClient.connect(url, function (err, db)
//        {
//           if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
//           var queryGet = {empId: empId};
//           var queryUpdate =   {$set:{"personal": dummyArray}};
//           db.collection('Employee').findAndModify(queryGet,[['_id','asc']],queryUpdate,{},function(error, employee){
//                   if(error) {db.close();return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message,data:null});}
//                   db.close(); 
//                   return res.status(200).json({success:true,message:'Save Successfully',data:true});
//            });
//        });

//      // var Employee = Parse.Object.extend("Employee");
//      // var query = new Parse.Query(Employee);
//      // query.equalTo("empId", empId);
//      // query.find({
//      //     success: function(results) {
//      //         if (results.length) {
//      //             var newEmp = results[0];
//      //             var personalArray = results[0].get("personal"); //to fetch existing array
//      //             var dummyObj = new Object();
//      //             if (personalArray[0]) {
//      //                 if (type == "personal") {
//      //                     personalArray[0].gender = dataArray[4].value;
//      //                     personalArray[0].personalEmail = dataArray[8].value;
//      //                     personalArray[0].personalMobile = dataArray[6].value;
//      //                     personalArray[0].dob = dataArray[5].value;
//      //                     personalArray[0].bloodGroup = dataArray[10].value;
//      //                     personalArray[0].religion = dataArray[11].value;
//      //                     personalArray[0].nationality = dataArray[13].value;
//      //                     personalArray[0].homePhone = dataArray[7].value;
//      //                     personalArray[0].motherName = dataArray[3].value;
//      //                     personalArray[0].fatherName = dataArray[2].value;
//      //                     personalArray[0].maritialStatus = dataArray[12].value;
//      //                     personalArray[0].emergencyContactName = dataArray[14].value;
//      //                     personalArray[0].emergencyContactNumber = dataArray[15].value;
//      //                 } else {
//      //                     personalArray[0].presentAddress = " " + dataArray[0].value + " " + dataArray[1].value + "," + dataArray[2].value + "," + dataArray[3].value + "," + dataArray[4].value + "," + dataArray[5].value;
//      //                     personalArray[0].permanentAddress = " " + dataArray[6].value + " " + dataArray[7].value + "," + dataArray[8].value + "," + dataArray[9].value + "," + dataArray[10].value + "," + dataArray[11].value;
//      //                 }
//      //             }
//      //             newEmp.set('personal', personalArray);
//      //             newEmp.save(null, {
//      //                 success: function(Employee) {

//      //                     callback(true);
//      //                 },
//      //                 error: function(Employee, error) {
//      //                     // error is a Parse.Error with an error code and message.
//      //                     //alert('Failed to create new object, with error code: ' + error.message);
//      //                 }
//      //             });
//      //             callback(true);
//      //         } else {
//      //             callback(false);
//      //         }
//      //     },
//      //     error: function(error) {
//      //         //alert("Error: " + error.code + " " + error.message);
//      //     }
//      // });
// },
// // //submit office info
// // //submitOfficeInfo:function(empId, dataArray, type, callback) {
//   submitOfficeInfo:function(req, res, next) {
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var empId=req.body.empId;
//     var dataArray=req.body.dataArray;
//     var type=req.body.type;

//     var dummyArray=new Array();
//     var dummyObj=new object();    

//     if (type == "basicOffice") {
//         dummyObj.idCardNumber = dataArray[2].value;
//         dummyObj.companyName = dataArray[3].value;
//         dummyObj.facility = dataArray[7].value;
//         dummyObj.city = dataArray[8].value;
//         dummyObj.country = dataArray[9].value;
//         dummyObj.costCenter = dataArray[10].value;
//     } else if (type == "joiningDetails") {
//         dummyObj.dateOfJoining = dataArray[0].value;
//         dummyObj.dateOfConfirmation = dataArray[1].value;
//         dummyObj.stateOfConfirmation = dataArray[2].value;
//         dummyObj.workPermitNumber = dataArray[3].value;
//         dummyObj.effectiveDate = dataArray[4].value;
//         dummyObj.expiryDate = dataArray[5].value;
//     } else if (type == "performanceRating") {
//         dummyObj.pfRating1516 = dataArray[0].value;
//         dummyObj.pfRating1617 = dataArray[1].value;
//     } else if (type == "separationDetails") {
//         dummyObj.dateOfResignation = dataArray[23].value;
//         dummyObj.dateOfSeparation = dataArray[5].value;
//         dummyObj.separationEffectiveDate = dataArray[9].value;
//         dummyObj.separationType = dataArray[24].value;
//     }
//     dummyArray.push(dummyObj)

//     MongoClient.connect(url, function (err, db)
//     {
//        if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
//        var queryGet = {empId: empId};
//        var queryUpdate =   {$set:{"officeDetails": dummyArray}};
//        db.collection('Employee').findAndModify(queryGet,[['_id','asc']],queryUpdate,{},
//                function(error, updateResult){
//                if(error){
//                 db.close();
//                 return  res.status(500).json({success:false,errmsg:err.errmsg,message:err.message,data:false});
//                }
//                else
//                {
//                   db.close();
//                   return res.status(200).json({success:true,message:'Save Successfully.',data:true});
//                }
//            });
//     });

//     // var Employee = Parse.Object.extend("Employee");
//     // var query = new Parse.Query(Employee);
//     // query.equalTo("empId", empId);
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length) {
//     //             var newEmp = results[0];


//     //             var officeArray = results[0].get("officeDetails");
//     //             var dummyObj = new Object();

//     //             if (type == "basicOffice") {
//     //                 officeArray[0].idCardNumber = dataArray[2].value;
//     //                 officeArray[0].companyName = dataArray[3].value;
//     //                 officeArray[0].facility = dataArray[7].value;
//     //                 officeArray[0].city = dataArray[8].value;
//     //                 officeArray[0].country = dataArray[9].value;
//     //                 officeArray[0].costCenter = dataArray[10].value;
//     //             } else if (type == "joiningDetails") {
//     //                 officeArray[0].dateOfJoining = dataArray[0].value;
//     //                 officeArray[0].dateOfConfirmation = dataArray[1].value;
//     //                 officeArray[0].stateOfConfirmation = dataArray[2].value;
//     //                 officeArray[0].workPermitNumber = dataArray[3].value;
//     //                 officeArray[0].effectiveDate = dataArray[4].value;
//     //                 officeArray[0].expiryDate = dataArray[5].value;
//     //             } else if (type == "performanceRating") {
//     //                 officeArray[0].pfRating1516 = dataArray[0].value;
//     //                 officeArray[0].pfRating1617 = dataArray[1].value;
//     //             } else if (type == "separationDetails") {
//     //                 officeArray[0].dateOfResignation = dataArray[23].value;
//     //                 officeArray[0].dateOfSeparation = dataArray[5].value;
//     //                 officeArray[0].separationEffectiveDate = dataArray[9].value;
//     //                 officeArray[0].separationType = dataArray[24].value;
//     //             }
//     //             //}

//     //             newEmp.set('officeDetails', officeArray);
//     //             newEmp.save(null, {
//     //                 success: function(Employee) {
//     //                     callback(true);
//     //                 },
//     //                 error: function(Employee, error) {
//     //                     //alert('Failed to create new object, with error code: ' + error.message);
//     //                 }
//     //             });
//     //             callback(true);
//     //         } else {
//     //             callback(false);
//     //         }
//     //     },
//     //     error: function(error) {
//     //         //alert("Error: " + error.code + " " + error.message);
//     //     }
//     // });
// },
// // //function to submit previous emp details in the office profile(HR)
// // //submitPositionDetails:function(empId, dataArray, callback) {
//  submitPositionDetails:function(req, res, next) {  
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var empId=req.body.empId;
//     var dataArray=req.body.dataArray;

//     var dummyArray=new Array();
//     var dummyObj=new object(); 
    
//        dummyArray.designation = dataArray[0].value;
//        dummyArray.employeeCategory = dataArray[1].value;
//        dummyArray.employeeGrade = dataArray[2].value;
//        dummyArray.buisnessDivision = dataArray[3].value;
//        dummyArray.department = dataArray[4].value;
//        dummyArray.vertical = dataArray[5].value;
//        dummyArray.subVertical = dataArray[6].value;
//        dummyArray.reportingManagerId = dataArray[7].value;
//        dummyArray.reviewerId = dataArray[8].value;
//        dummyArray.buisnessHrSpocId = dataArray[9].value;
//        dummyArray.buisnessHrHeadId = dataArray[10].value;
//        dummyArray.groupHrHeadId = dataArray[11].value;
//        dummyArray.push(dummyObj);

//         MongoClient.connect(url, function (err, db)
//         {
//              if(err) {return res.status(500).json({success:false,errmsg:err.errmsg,message:err.message});}
//                 var queryGet = {empId: empId};
//                 var queryUpdate =   {$set:{
//                     'designation':empArray[0].value,
//                     'employeeGrade':empArray[2].value,
//                     'buisnessDivsion':empArray[3].value,
//                     'department':empArray[4].value,
//                     'vertical':empArray[5].value,
//                     'subVertical':empArray[6].value,
//                     "officePositionDetails": dummyArray
//                    }};
//                 db.collection('Employee').findAndModify(queryGet,[['_id','asc']],queryUpdate,{},
//                     function(error, result){
//                         if(error){
//                             db.close();
//                             return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});
//                         }
//                         else
//                         {
//                             db.close();
//                             return res.status(200).json({success:true,message:'Save Successfully.',data:true});
//                         }
//                     });
//         });
//     // var Employee = Parse.Object.extend("Employee");
//     // var query = new Parse.Query(Employee);
//     // query.equalTo("empId", empId);
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length) {
//     //             var newEmp = results[0];
//     //             newEmp.set('designation', empArray[0].value);
//     //             newEmp.set('employeeGrade', empArray[2].value);
//     //             newEmp.set('buisnessDivsion', empArray[3].value);
//     //             newEmp.set('department', empArray[4].value);
//     //             newEmp.set('vertical', empArray[5].value);
//     //             newEmp.set('subVertical', empArray[6].value);

//     //             var officePosArray = results[0].get("officePositionDetails");

//     //             if (officePosArray) {
//     //                 officePosArray[0].designation = dataArray[0].value;
//     //                 officePosArray[0].employeeCategory = dataArray[1].value;
//     //                 officePosArray[0].employeeGrade = dataArray[2].value;
//     //                 officePosArray[0].buisnessDivision = dataArray[3].value;
//     //                 officePosArray[0].department = dataArray[4].value;
//     //                 officePosArray[0].vertical = dataArray[5].value;
//     //                 officePosArray[0].subVertical = dataArray[6].value;
//     //                 officePosArray[0].reportingManagerId = dataArray[7].value;
//     //                 officePosArray[0].reviewerId = dataArray[8].value;
//     //                 officePosArray[0].buisnessHrSpocId = dataArray[9].value;
//     //                 officePosArray[0].buisnessHrHeadId = dataArray[10].value;
//     //                 officePosArray[0].groupHrHeadId = dataArray[11].value;
//     //             }

//     //             newEmp.set('officePositionDetails', officePosArray);
//     //             newEmp.save(null, {
//     //                 success: function(Employee) {
//     //                     callback(true);
//     //                 },
//     //                 error: function(Employee, error) {
//     //                     //alert('Failed to create new object, with error code: ' + error.message);
//     //                 } // error is a Parse.Error with an error code and message.
//     //             });
//     //             callback(true);
//     //         } else {
//     //             callback(false);
//     //         }
//     //     },
//     //     error: function(error) {
//     //         //alert("Error: " + error.code + " " + error.message);
//     //     }
//     // });
// },
// // //function to submit previous emp details in the office profile(HR)
// // //submitpreviousEmployment:function(empId, dataArray, callback) {
//   submitpreviousEmployment:function(req, res, next) {  
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var empId=req.body.empId;
//     var dataArray=req.body.dataArray;

//     var dummyArray = new Array();
//     var dummyObj = new Object();
//        dummyObj.companyName = dataArray[0].value;
//        dummyObj.companyBuisness = dataArray[1].value;
//        dummyObj.designation = dataArray[2].value;
//        dummyObj.department = dataArray[3].value;
//        dummyObj.responsibility = dataArray[4].value;
//        dummyObj.companyLocation = dataArray[5].value;
//        dummyObj.employmentPeriod = dataArray[6].value;
//        dummyObj.areaOfExperience = dataArray[7].value;
//        dummyArray.push(dummyObj);

//             MongoClient.connect(url, function (err, db)
//             {
//                 var queryGet = {empId: empId};
//                 var queryUpdate =   {$set:{"previousWorkDetails": dummyArray}};
//                 db.collection('Employee').findAndModify(
//                     queryGet,
//                     [['_id','asc']],
//                     queryUpdate,
//                     {}, //options
//                     function(error, result){
//                         if(error){
//                             db.close();
//                             return res.status(500).json({message:"Failed login attempt. Please retry.",status:'FAILED',response:error});
//                         }
//                         else
//                         {
//                             db.close();
//                             return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:true});
//                         }
//                     });
//             });

//     // var Employee = Parse.Object.extend("Employee");
//     // var query = new Parse.Query(Employee);
//     // query.equalTo("empId", empId);
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length) {
//     //             var newEmp = results[0];
//     //             var dummyArray = new Array();
//     //             var dummyObj = new Object();

//     //             dummyObj.companyName = dataArray[0].value;
//     //             dummyObj.companyBuisness = dataArray[1].value;
//     //             dummyObj.designation = dataArray[2].value;
//     //             dummyObj.department = dataArray[3].value;
//     //             dummyObj.responsibility = dataArray[4].value;
//     //             dummyObj.companyLocation = dataArray[5].value;
//     //             dummyObj.employmentPeriod = dataArray[6].value;
//     //             dummyObj.areaOfExperience = dataArray[7].value;

//     //             dummyArray.push(dummyObj); //push object into previosWorkDetails array
//     //             newEmp.set('previousWorkDetails', dummyArray);
//     //             newEmp.save(null, {
//     //                 success: function(Employee) {
//     //                     callback(true);
//     //                 },
//     //                 error: function(Employee, error) {
//     //                     //alert('Failed to create new object, with error code: ' + error.message);
//     //                 } // error is a Parse.Error with an error code and message.
//     //             });
//     //             callback(true);
//     //         } else {
//     //             callback(false);
//     //         }
//     //     },
//     //     error: function(error) {
//     //         //alert("Error: " + error.code + " " + error.message);
//     //     }
//     // });
// },
// // //submit payroll information
// // //submitPayrollInformation:function(empId, dataArray, type, callback) {
//   submitPayrollInformation:function(req, res, next) {
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var empId=req.body.empId;
//     var dataArray=req.body.dataArray;
//     var type=req.body.type;
//     var queryGetAcc = { empId: empId};
//     db.collection('payrollInformation').findOne(queryGetAcc,function(err, results){
//         if(results)
//         {
//              var queryGet = {empId: empId};
//              if (type == "bankDetails") {
//                 var dummyArray = new Array();
//                 var dummyObj = new Object();
//                 dummyObj.bankName = dataArray[0].value;
//                 dummyObj.accountName = dataArray[1].value;
//                 dummyObj.accountNumber = dataArray[2].value;
//                 dummyObj.currency = dataArray[3].value;
//                 dummyArray.push(dummyObj);
//                 results.payrollInformation[0].bankDetails=dummyArray;
//                 //newPayInfo.set('bankDetails', dummyArray);
//             } else if (type == "salaryDetails") { //salaryDetails
//                 var dummyArray = new Array();
//                 var dummyObj = new Object();
//                 dummyObj.basic = dataArray[0].value;
//                 dummyObj.hra = dataArray[1].value;
//                 dummyObj.conveyanceAllowance = dataArray[2].value;
//                 dummyObj.lfa = dataArray[3].value;
//                 dummyObj.medicalAllowance = dataArray[4].value;
//                 dummyObj.specialAllowance = dataArray[5].value;
//                 dummyObj.grossSalary = dataArray[6].value;
//                 dummyObj.lunchAllowance = dataArray[7].value;
//                 dummyObj.mobileAllowance = dataArray[8].value;
//                 dummyObj.otherAllowance = dataArray[9].value;
//                 dummyObj.totalEarnings = dataArray[10].value;
//                 dummyArray.push(dummyObj); //push object into array
//                 results.payrollInformation[0].salaryDetails=dummyArray;
//                 //newPayInfo.set('salaryDetails', dummyArray); //push into salary details array
//             } else if (type == "otherBenefitDetails") {
//                 var dummyArray = new Array();
//                 var dummyObj = new Object();
//                 dummyObj.festivalAllowance = dataArray[0].value;
//                 dummyObj.providentFundMembership = dataArray[1].value;
//                 dummyObj.groupLifeInsurance = dataArray[2].value;
//                 dummyObj.hospitalizationScheme = dataArray[3].value;
//                 dummyArray.push(dummyObj); //push object into array
//                 results.payrollInformation[0].otherBenefitDetails=dummyArray;
//                 //newPayInfo.set('otherBenefitDetails', dummyArray);
//             } else if (type = 'companyCarDetails') {
//                 var dummyArray = new Array();
//                 var dummyObj = new Object();
//                 dummyObj.registrationNumber = dataArray[0].value;
//                 dummyObj.effectiveDate = dataArray[1].value;
//                 dummyObj.expiryDate = dataArray[2].value;
//                 dummyObj.fuelAllowance = dataArray[3].value;
//                 dummyObj.maintainanceAllowance = dataArray[4].value;
//                 dummyObj.driverAllowance = dataArray[5].value;
//                 dummyObj.grossPay = dataArray[6].value;
//                 dummyArray.push(dummyObj); //push object into array
//                 results.payrollInformation[0].companyCarDetails=dummyArray;
//                 //newPayInfo.set('companyCarDetails', dummyArray);
//             } else if (type == "personalCarDetails") {
//                 var dummyArray = new Array();
//                 var dummyObj = new Object();
//                 dummyObj.registrationNumber = dataArray[0].value;
//                 dummyObj.effectiveDate = dataArray[1].value;
//                 dummyObj.expiryDate = dataArray[2].value;
//                 dummyObj.ownCarUsageAllowance = dataArray[3].value;
//                 dummyArray.push(dummyObj); //push object into array
//                 results.payrollInformation[0].personalCarDetails=dummyArray;
//                 //newPayInfo.set('personalCarDetails', dummyArray);
//             }

//             var queryUpdate ={$set:{"payrollInformation": dummyArray}};
//             if(results.length==0)
//             {
//                 queryUpdate ={$set:{empId:empId,"payrollInformation": dummyArray}};
//             }
//             // Update Pwd
// 					 MongoClient.connect(url, function (err, db)
//                      {
//                          db.collection('employee').findAndModify(
//                              queryGet,
//                              [['_id','asc']],
//                              queryUpdate,
//                              {}, //options
//                              function(error, result){
//                                  if(error){
//                                        db.close();
//                                      res.send({message:"Something Went Wrong.",status:'FAILED'});
//                                  }
//                                  else
//                                  {
//                                     db.close();
//                                    return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:true});
//                                  }
//                              });
//                      });
//         }
//          else {
//             res.send({status:'FAILED',message:'Failed login attempt. Please retry.'})
//         }
//     });



//     // var payrollInformation = Parse.Object.extend("payrollInformation");
//     // var query = new Parse.Query(payrollInformation);
//     // query.equalTo("empId", empId);
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length) {
//     //             var newPayInfo = results[0];
//     //         } else {
//     //             var newPayInfo = new payrollInformation();
//     //             newPayInfo.set('empId', empId);
//     //         }
//     //         if (type == "bankDetails") {
//     //             var dummyArray = new Array();
//     //             var dummyObj = new Object();
//     //             dummyObj.bankName = dataArray[0].value;
//     //             dummyObj.accountName = dataArray[1].value;
//     //             dummyObj.accountNumber = dataArray[2].value;
//     //             dummyObj.currency = dataArray[3].value;
//     //             dummyArray.push(dummyObj);
//     //             newPayInfo.set('bankDetails', dummyArray);
//     //         } else if (type == "salaryDetails") { //salaryDetails
//     //             var dummyArray = new Array();
//     //             var dummyObj = new Object();
//     //             dummyObj.basic = dataArray[0].value;
//     //             dummyObj.hra = dataArray[1].value;
//     //             dummyObj.conveyanceAllowance = dataArray[2].value;
//     //             dummyObj.lfa = dataArray[3].value;
//     //             dummyObj.medicalAllowance = dataArray[4].value;
//     //             dummyObj.specialAllowance = dataArray[5].value;
//     //             dummyObj.grossSalary = dataArray[6].value;
//     //             dummyObj.lunchAllowance = dataArray[7].value;
//     //             dummyObj.mobileAllowance = dataArray[8].value;
//     //             dummyObj.otherAllowance = dataArray[9].value;
//     //             dummyObj.totalEarnings = dataArray[10].value;
//     //             dummyArray.push(dummyObj); //push object into array
//     //             newPayInfo.set('salaryDetails', dummyArray); //push into salary details array
//     //         } else if (type == "otherBenefitDetails") {
//     //             var dummyArray = new Array();
//     //             var dummyObj = new Object();
//     //             dummyObj.festivalAllowance = dataArray[0].value;
//     //             dummyObj.providentFundMembership = dataArray[1].value;
//     //             dummyObj.groupLifeInsurance = dataArray[2].value;
//     //             dummyObj.hospitalizationScheme = dataArray[3].value;
//     //             dummyArray.push(dummyObj); //push object into array
//     //             newPayInfo.set('otherBenefitDetails', dummyArray);
//     //         } else if (type = 'companyCarDetails') {
//     //             var dummyArray = new Array();
//     //             var dummyObj = new Object();
//     //             dummyObj.registrationNumber = dataArray[0].value;
//     //             dummyObj.effectiveDate = dataArray[1].value;
//     //             dummyObj.expiryDate = dataArray[2].value;
//     //             dummyObj.fuelAllowance = dataArray[3].value;
//     //             dummyObj.maintainanceAllowance = dataArray[4].value;
//     //             dummyObj.driverAllowance = dataArray[5].value;
//     //             dummyObj.grossPay = dataArray[6].value;
//     //             dummyArray.push(dummyObj); //push object into array
//     //             newPayInfo.set('companyCarDetails', dummyArray);
//     //         } else if (type == "personalCarDetails") {
//     //             var dummyArray = new Array();
//     //             var dummyObj = new Object();
//     //             dummyObj.registrationNumber = dataArray[0].value;
//     //             dummyObj.effectiveDate = dataArray[1].value;
//     //             dummyObj.expiryDate = dataArray[2].value;
//     //             dummyObj.ownCarUsageAllowance = dataArray[3].value;
//     //             dummyArray.push(dummyObj); //push object into array
//     //             newPayInfo.set('personalCarDetails', dummyArray);
//     //         }

//     //         newPayInfo.save(null, {
//     //             success: function(payrollInformation) {
//     //                 callback(true);
//     //             },
//     //             error: function(payrollInformation, error) {
//     //                 //alert('Failed to create new object, with error code: ' + error.message);
//     //             }
//     //         });
//     //         //callback(true);
//     //     },
//     //     error: function(error) {
//     //         callback(false);
//     //         //alert("Error: " + error.code + " " + error.message);
//     //     }
//     // });
// },
// // //function to fetch the data for KRA select
// // //kraWizardSelect:function(dept, grade, callback) {
//   kraWizardSelect:function(req, res, next) { 
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var dept=req.body.dept;
//     var grade=req.body.grade;
//     MongoClient.connect(url, function (err, db)
//     {
//         var queryGetAcc = { department: department};
//         if(grade.length > 0)
//         {
//            queryGetAcc={department:{$in:grade}}
//         }
//         db.collection('Employee').find(queryGetAcc).toArray(function(error, results){
//             if(error)
//             {
//                 db.close();
//                 return res.status(500).json({message:"Failed login attempt. Please retry.",status:'FAILED',response:error});
//             }
//             else{
//                 db.close();
//                 return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:results});
//             }
//          });
//     });

//     // var Employee = Parse.Object.extend("Employee");
//     // var query = new Parse.Query(Employee);
//     // if (dept)
//     //     query.equalTo("department", dept); //if the dept is present it will consider this
//     // if (grade.length > 0)
//     //     query.containedIn("employeeGrade", grade); //containedIn: because grade is array
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length) {
//     //             callback(true, results);
//     //         } else {
//     //             callback(false, null);
//     //         }
//     //     },
//     //     error: function(error) {
//     //         //alert("Error: " + error.code + " " + error.message);
//     //     }
//     // });
// },
// // //funtion to initiate KRA for some selected array of employees
// // //initiateKRA:function(empArray, initiatorId) {
//  initiateKRA:function(req, res, next) {
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var empArray=req.body.empArray;
//     var initiatorId=req.body.initiatorId;
//     MongoClient.connect(url, function (err, db)
//     {
//       var  queryGetAcc={department:{$in:grade}}
//       db.collection('Employee').find(queryGetAcc).toArray(function(error, results){
//         if(error)
//         {
//             db.close();
//             return res.status(500).json({message:"Failed login attempt. Please retry.",status:'FAILED',response:error});
//         }
//         else
//         {
//            if (results.length > 0) {
//                     getKRACount(function(count) { //get count of entries in KRA table
//                         for (i = 0; i < results.length; i++) {
//                             addToKRATable(results[i], count + i, initiatorId); //to initiate KRA for selection,add values into KRA table
//                         }
//                     });
//                 return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:true});
//             }
//             else
//             {
//                 db.close();
//                 return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:null});
//             }
//         }
//       });
//    });
//     // //send notification
//     // var Employee = new Parse.Object.extend('Employee');
//     // var query = new Parse.Query(Employee);
//     // query.containedIn('empId', empArray);
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length > 0) {
//     //             getKRACount(function(count) { //get count of entries in KRA table
//     //                 for (i = 0; i < results.length; i++) {
//     //                     addToKRATable(results[i], count + i, initiatorId); //to initiate KRA for selection,add values into KRA table
//     //                 }
//     //             });
//     //         }
//     //     }
//     // })
// },
// // //function to set kra
// // //setKRA:function(kraArray, callback) {
//   setKRA:function(req, res, next) {
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var kraArray=req.body.kraArray;

//     var empId = '';
//     var kraId = 'k_0';


//    MongoClient.connect(url, function (err, db)
//     {
//     var dummyArray = new Array();
//      for (i = 0; i < kraArray.length; i++) {
//         if (kraArray[i].complete) {
//             var dummyObj = new Object(); //create object to push into array
//             dummyObj.kra = kraArray[i].kra;
//             dummyObj.kraCat = kraArray[i].kraCategory;
//             dummyObj.kraWeight = kraArray[i].kraWeight;
//             dummyObj.kraUos = kraArray[i].kraUnitSuccess;
//             dummyObj.kraMos = kraArray[i].kraMeasureSuccess;
//             dummyArray.push(dummyObj); //push object into array
//         }
//      }
//         var  queryGet={kraId:kraId};
//         var queryUpdate =   {$set:{"kraValue": dummyArray,
//         'version':'live',
//         'stage': 'posted',
//         'endDate': new Date()
//         }};
//     db.collection('Kra').findAndModify(queryGet,[['_id','asc']],queryUpdate,{},function(error, result){
//             if(error){
//                 db.close();
//                 return res.status(500).json({message:"Failed login attempt. Please retry.",status:'FAILED',response:error});
//             }
//             else
//             {
//                 addToApprovalTable('KRA', result.kraId, result.supervisorId, 'live', new Date()); //this will add a copy to input table
//                 return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:true});
//             }
//         });
//     });
   
   
        
  


//     // var Kra = Parse.Object.extend("Kra");
//     // var query = new Parse.Query(Kra);
//     // query.equalTo("kraId", kraId); //match kraId to table
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length) {

//     //             var newKRA = results[0];
//     //             var dummyArray = new Array();
//     //             //push kraArray into table
//     //             for (i = 0; i < kraArray.length; i++) {
//     //                 if (kraArray[i].complete) {
//     //                     var dummyObj = new Object(); //create object to push into array
//     //                     dummyObj.kra = kraArray[i].kra;
//     //                     dummyObj.kraCat = kraArray[i].kraCategory;
//     //                     dummyObj.kraWeight = kraArray[i].kraWeight;
//     //                     dummyObj.kraUos = kraArray[i].kraUnitSuccess;
//     //                     dummyObj.kraMos = kraArray[i].kraMeasureSuccess;
//     //                     dummyArray.push(dummyObj); //push object into array
//     //                 }
//     //             }

//     //             newKRA.set('kraValue', dummyArray); //kraValue is the name of the array
//     //             newKRA.set('version', 'live');
//     //             newKRA.set('stage', 'posted');
//     //             newKRA.set('endDate', new Date());
//     //             newKRA.save(null, {
//     //                 success: function(KRA) {
//     //                     // Execute any logic that should take place after the object is saved.
//     //                     addToApprovalTable('KRA', KRA.get('kraId'), KRA.get('supervisorId'), 'live', new Date()); //this will add a copy to input table
//     //                     callback(true);
//     //                 },
//     //                 error: function(KRA, error) {
//     //                     // Execute any logic that should take place if the save fails.
//     //                     // error is a Parse.Error with an error code and message.
//     //                     callback(false);
//     //                 }
//     //             });
//     //         } else {
//     //             callback(false);
//     //         }
//     //     },
//     //     error: function(error) {
//     //     }
//     // });
// },
// // //function to save as draft KRA
// // //setKRADraft:function(kraArray, callback) {
//  setKRADraft:function(req, res, next) {
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var empId = '';

//     var kraId = 'k_0';
//     var kraArray=req.body.kraArray;

//     MongoClient.connect(url, function (err, db)
//     {
//      var dummyArray = new Array();
//      for (i = 0; i < kraArray.length; i++) {
//          var dummyObj = new Object(); //create object to push into array
//          dummyObj.kra = kraArray[i].kra;
//          dummyObj.kraCat = kraArray[i].kraCategory;
//          dummyObj.kraWeight = kraArray[i].kraWeight;
//          dummyObj.kraUos = kraArray[i].kraUnitSuccess;
//          dummyObj.kraMos = kraArray[i].kraMeasureSuccess;
//          dummyArray.push(dummyObj); //push object into array
//      }
//      var queryGet = {kraId: kraId};
//      var queryUpdate =  {$set:{"kraValue": dummyArray,
//      'version':'live',
//      'stage': 'draft',
//      'endDate': new Date()
//     }}
//     db.collection('Kra').findAndModify(queryGet,[['_id','asc']],queryUpdate,{},
//         function(error, KRA){
//             if(error){
//                 db.close();
//                 return res.status(500).json({message:"Failed login attempt. Please retry.",status:'FAILED',response:error});
//             }
//             else
//             {
//                addToDraftTable('KRA', KRA.kraId, KRA.empId, 'live', new Date());
//                return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:true});
//             }
//     });
//    });

//     // var Kra = Parse.Object.extend("Kra");
//     // var query = new Parse.Query(Kra);
//     // query.equalTo("kraId", kraId); //match kraId to table
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length) {
//     //             var newKRA = results[0];
//     //             var dummyArray = new Array();
//     //             //push kraArray into table using loop
//     //             for (i = 0; i < kraArray.length; i++) {

//     //                 var dummyObj = new Object(); //create object to push into array
//     //                 dummyObj.kra = kraArray[i].kra;
//     //                 dummyObj.kraCat = kraArray[i].kraCategory;
//     //                 dummyObj.kraWeight = kraArray[i].kraWeight;
//     //                 dummyObj.kraUos = kraArray[i].kraUnitSuccess;
//     //                 dummyObj.kraMos = kraArray[i].kraMeasureSuccess;
//     //                 dummyArray.push(dummyObj); //push object into array

//     //             }
//     //             newKRA.set('kraValue', dummyArray); //kraValue is the name of the array
//     //             newKRA.set('version', 'live');
//     //             newKRA.set('stage', 'draft');
//     //             newKRA.set('endDate', new Date());
//     //             newKRA.save(null, {
//     //                 success: function(KRA) {
//     //                     addToDraftTable('KRA', KRA.get('kraId'), KRA.get('empId'), 'live', new Date());
//     //                     callback(true);
//     //                 },
//     //                 error: function(KRA, error) {
//     //                     callback(false);
//     //                 }
//     //             });
//     //         } else {
//     //             callback(false);
//     //         }
//     //     },
//     //     error: function(error) {
//     //     }
//     // });
// },
// // //function to check wether a KRA is initiated for an emplopyee
// // //made when the login page would forcefully take to kra
// // //checkKra:function(, callback) {
//  checkKra:function(req, res, next) {
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var empId=req.body.empId;
//     var kraId = 'k_0';
//     MongoClient.connect(url, function (err, db)
//     {
//         var queryGet = {empId: empId};
//         db.collection('Kra').find(queryGet,
//         function(error, results){
//             if(error){
//                 db.close();
//                 return res.status(500).json({message:"Failed login attempt. Please retry.",status:'FAILED',response:error});
//             }
//             else
//             {
//                 if (results.length) {
//                     db.close();
//                    return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:true});
//                 } else {
//                     db.close();
//                     return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:true});
//                 }
//             }
//         });
//     });





//     // var kraId = 'k_0';
//     // var Kra = Parse.Object.extend("Kra");
//     // var query = new Parse.Query(Kra);
//     // query.equalTo("empId", empId); //match empId to table
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length) {
//     //             callback(true);
//     //         } else {
//     //             callback(false);
//     //         }
//     //     },
//     //     error: function(error) {
//     //     }
//     // });
// },
// // //function to check input table
// // //checkInputTable:function(empId,callback) {
//  checkInputTable:function(req, res, next) {
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var empId=req.body.empId;
//     MongoClient.connect(url, function (err, db)
//     {
//     var queryGet = {empId: empId};
//     db.collection('Inputs').find(queryGet,
//        function(error, results){
//            if(error){
//             db.close();
//             return res.status(500).json({message:"Failed login attempt. Please retry.",status:'FAILED',response:error});
//            }
//            else
//            {
//               if (results.length) {
//                 db.close();
//                 return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:results});
//               } else {
//                 db.close();
//                 return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:false});
//               }
//            }
//     });
//     });


//     // var Inputs = Parse.Object.extend("Inputs");
//     // var query = new Parse.Query(Inputs);
//     // query.equalTo("empId", empId); //match kraId to table
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length) { //try in future for more results
//     //           var inputNumber=results.length;
//     //           callback(true,results);
//     //         } else {
//     //             callback(false,null);
//     //         }
//     //     },
//     //     error: function(error) {
//     //     }
//     // });
// },
// // //function to check drafts table
// // //checkDraftsTable:function(empId,callback) {
//  checkDraftsTable:function(req, res, next) {   
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var empId=req.body.empId;
//     MongoClient.connect(url, function (err, db)
//     {
//         var queryGet = {empId: empId,status:'live'};
//         db.collection('Drafts').find(queryGet,
//         function(error, results){
//             if(error){
//                 db.close();
//                 return res.status(500).json({message:"Failed login attempt. Please retry.",status:'FAILED',response:error});
//             }
//             else
//             {
//                 if (results.length) {
//                     db.close();
//                     return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:true});
//                 } else {
//                     db.close();
//                     return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:null});
//                 }
//             }
//         });
//     });
//     // var Drafts = Parse.Object.extend("Drafts");
//     // var query = new Parse.Query(Drafts);
//     // query.equalTo("empId", empId); //match kraId to table
//     // query.equalTo("status", "live"); //match kraId to table
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length) { //try in future for more results
//     //           var draftsNumber=results.length;
//     //           callback(true,results);
//     //         } else {
//     //             callback(false,null);
//     //         }
//     //     },
//     //     error: function(error) {
//     //     }
//     // });
// },
// // //function to check approvals table
// // //checkApprovalTable:function(empId,callback) {
//  checkApprovalTable:function(req, res, next) {
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var empId=req.body.empId;
//     MongoClient.connect(url, function (err, db)
//     {
//         var queryGet = {empId: empId,status:'live'};
//         db.collection('Approvals').find(queryGet,
//           function(error, results){
//             if(error){
//                 db.close();
//                 return res.status(500).json({message:"Failed login attempt. Please retry.",status:'FAILED',response:error});
//             }
//             else
//             {
//                 if (results.length) {
//                     db.close();
//                     return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:results});
//                 } else {
//                     db.close();
//                     return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:true});
//                 }
//             }
//         });
//     });

//     // var Approvals = Parse.Object.extend("Approvals");
//     // var query = new Parse.Query(Approvals);
//     // query.equalTo("empId", empId); //match kraId to table
//     // query.equalTo("status", "live"); //match kraId to table
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length) { //try in future for more results
//     //           var approvalsNumber=results.length;
//     //           callback(true,results);
//     //         } else {
//     //             callback(false,null);
//     //         }
//     //     },
//     //     error: function(error) {
//     //     }
//     // });
// },
// // //function to check Clarification table
// // //checkClarificationTable:function(empId,callback) {
//  checkClarificationTable:function(req, res, next) {  
//     var url = process.env.DB + 'heroku_szcw1h07';    
//     var empId=req.body.empId;
//     MongoClient.connect(url, function (err, db)
//     {
//         var queryGet = {empId: empId,status:'live'};
//         db.collection('Clarification').find(queryGet,
//             function(error, results){
//             if(error){
//                 db.close();
//                 return res.status(500).json({message:"Failed login attempt. Please retry.",status:'FAILED',response:error});
//             }
//             else
//             {
//                 if (results.length) {
//                     db.close();
//                     return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:results});
//                 } else {
//                     db.close();
//                     return res.status(200).json({status:'SUCCESS',message:'Successfully logged in.',response:true});
//                 }
//             }
//         });
//     });
//  },

// forgot: function(req, res, next) {
//     //send email
//     var url = process.env.DB + 'heroku_szcw1h07'; 
//     var queryGetAcc = { empId: req.body.empId};
//     MongoClient.connect(url, function (err, db) {
//        var date = SHA256(moment().format().toString())
//         db.collection('Employee').findAndModify(
//             queryGetAcc,
//             [['_id','asc']],
//             {$set:{
//                 "reset": date.toString()
//             }},
//             {}, //options
//             function(error, result){
//                 //assert.equal(error1, null);
//                 if(error)
//                 {
//                    return res.status(500).json({success:false,errmsg:error.errmsg,message:error.message});
//                 }
//                 db.close();
//                 var ToEmail=result.email.toLowerCase();
//                 var Subject='Reset Password Link';
//                 var Body =`<strong>Hi,</strong><br><br>Adn recently received a request for a forgotten password. <br><br>To change your adn hrm password, Please click on this <a href="https://www.adn.org/reset/${date}">link</a><br><br>This link will expire in 10 minutes.<br><br>Thanks<br>Adn Support`
//                 sendmail.sendmail(ToEmail,Subject,Body);
//                 return res.status(200).json({success:true,message:'Reset Email Link Send Successfully.',data:true});
//             });
    
//     });
// },
// getReset: function(req, res, next) {
//     var url = process.env.DB + 'heroku_szcw1h07'; 
//     var queryGetAcc = {reset: req.params.slug };
//     MongoClient.connect(url, function (err, db) {
//         db.collection('Employee').findOne(queryGetAcc, function(error, result){ console.log(error,result)
//             if(!error && result!=null){
//                 res.render('reset', { title: 'Token | Wallet', reset_code: req.params.slug });
//             } else {
//                 res.send({data:"Reset Link Expired11", status: "FAILED"});
//             }
//         });
//     });
// },
// postReset: function(req, res, next) {
//     var url = process.env.DB+'accounts';

//     MongoClient.connect(url, function (err, db) {
//         db.collection('Employee').findOne({reset: req.body.reset_code}, function(error, result){
//             if(error) {
//                 res.send({message:"Reset link expired ",status:'FAILED'});
//             } else {
//                 var hash = bcrypt.hashSync(req.body.password.toString(), 10)
//                 db.collection('accounts').findAndModify(

//                 {reset: req.body.reset_code},

//                 [['_id','asc']],

//                 {$set:{
//                     "reset": '',
//                     "password": hash
//                 }},

//                 {}, //options
//                 function(error1, result1){
//                     //assert.equal(error1, null);
//                     if(error1){
//                         console.log("mongo error",error1)
//                         res.send({message:"Something Went Wrong.",status:'FAILED'});
//                     }
//                     res.send({message:"Password Changed Successfully.",status:'SUCCESS'});
//                     db.close();
//                 });

//             }
//         });
//     });
// },
// }

// //generic draft table
// function addToDraftTable(type, typeId, empId, status, startDate) {
//     MongoClient.connect(url, function (err, db)
//     {
//         resetInputTable(typeId, 'inDraft', function() {
//             var query={
//                 'type':'KRA',
//                 'typeId':typeId,
//                 'empId':empId,
//                 'status':status,
//                 'startDate':new Date()
//             }
//             db.collection('Drafts').insert(query,function(error,result)
//                 {
//                     if(error)
//                     {
//                         console.log(error)
//                     }
//                     else{
//                         console.log(result)
//                     }
//                 }
//             );
//         }); 
//     });
//     //     //setting the draft table entry
//     //     var Drafts = Parse.Object.extend("Drafts");
//     //     var newDrafts = new Drafts();

//     //     newDrafts.set('type', 'KRA');
//     //     newDrafts.set('typeId', typeId);
//     //     newDrafts.set('empId', empId);
//     //     newDrafts.set('status', status);
//     //     newDrafts.set('startDate', new Date());

//     //     newDrafts.save(null, {
//     //         success: function(Drafts) {
//     //         },
//     //         error: function(Drafts, error) {
//     //             //alert('Failed to create new draft object, with error code: ' + error.message);
//     //         }
//     //     });
//     // });
// }
// //Generic Function to add to approval Table
// function addToApprovalTable(type, typeId, empId, status, startDate) {
//     MongoClient.connect(url, function (err, db)
//     {
//         var query={
//             'type':type,
//             'typeId':typeId,
//             'empId':empId,
//             'status':status,
//             'startDate':startDate,
//             'endDate':new Date()
//         };
//         db.collection('Approvals').insert(query,function(error,result)
//             {
//                 if(error)
//                 {
//                    console.log(error)
//                 }
//                 else{
//                  console.log(result)
//                 }
//             }
//         );
//     });


//         // var Approvals = Parse.Object.extend("Approvals");
//         // var newApprovals = new Approvals();

//         // newApprovals.set('type', type);
//         // newApprovals.set('typeId', typeId);
//         // newApprovals.set('empId', empId);
//         // newApprovals.set('status', status);
//         // newApprovals.set('startDate', startDate);
//         // //newInputs.set('endDate',new Date());

//         // newApprovals.save(null, {
//         //     success: function(Inputs) {
//         //     },
//         //     error: function(Inputs, error) {
//         //         //alert('Failed to create new object, with error code: ' + error.message);
//         //     }
//         // });
    
// }
// //clear entry from Input table
// function resetInputTable(typeId, status, callback) {
//     MongoClient.connect(url, function (err, db)
//     {
//         var queryGet={
//             'typeId':typeId,
//         };
//         var queryUpdate =  {$set:{"status": status,
//         }}

//         db.collection('Inputs').findAndModify(queryGet,[['_id','asc']], queryUpdate,{},function(error,result)
//         {
//             if(error)
//                 {
//                    console.log(error)
//                 }
//                 else{
//                  console.log(result)
//                 }

//         });
//     });


//     // var Inputs = Parse.Object.extend("Inputs");
//     // var query = new Parse.Query(Inputs);
//     // query.equalTo("typeId", typeId);
//     // query.find({
//     //     success: function(results) {
//     //         if (results.length) {
//     //             results[0].set('status', status);
//     //             results[0].save(null, {
//     //                 success: function(Inputs) {
//     //                     callback();
//     //                 },
//     //                 error: function(Inputs, error) {
//     //                     //alert('Failed to create new object, with error code: ' + error.message);
//     //                 }
//     //             });
//     //         } else {
//     //             callback();
//     //         }
//     //     }
//     // });
// }
// //Generic Function to add to Input Table
// function addToInputTable(type, typeId, empId, status, startDate) {
    
//     MongoClient.connect(url, function (err, db)
//     {
//     var query={
//         'type':type,
//         'typeId':typeId,
//         'empId':empId,
//         'status':status,
//         'startDate':startDate,
//     }
//     db.collection('Inputs').insert(query,function(err,result)
//         {
//            if(error)
//            {
//             res.send({message:"Something Went Wrong.",status:'FAILED'});
//            }
//            else{
//             res.send({message:"Something Went Wrong.",status:'sucess',response:null});
//            }
//         }
//     );

//    });
  
//     // var Inputs = Parse.Object.extend("Inputs");
//     // var newInputs = new Inputs();

//     // newInputs.set('type', type);
//     // newInputs.set('typeId', typeId);
//     // newInputs.set('empId', empId);
//     // newInputs.set('status', status);
//     // newInputs.set('startDate', startDate);

//     // newInputs.save(null, {
//     //     success: function(Inputs) {
//     //     },
//     //     error: function(Inputs, error) {
//     //         //alert('Failed to create new object, with error code: ' + error.message);
//     //     }
//     // });
// }
// function addToKRATable(empData, kraIndex, initiatorId) {
    
//     MongoClient.connect(url, function (err, db)
//     {
//             var query={
//                 'kraId': 'k_' + kraIndex,
//                 'empId':empData.empId,
//                 'empRef':empData,
//                 'kraValue':[],
//                 'version':live,
//                 'startDate':new Date(),
//                 'endDate':new Date(),
//                 'valDate':new Data().addHours(730)
//             }

//             var dummyArray = new Array();
//             var dummyObj = new Object(); //create object to push into array
//             dummyObj.supervisorId = empData.supervisorId;
//             dummyObj.supervisorInput = "";
//             dummyObj.supervisorReview = false;
//             dummyArray.push(dummyObj); //push object into array

//             query.supervisor=dummyArray;
//             query.supervisorId=empData.supervisorId;
//             query.cameFrom=initiatorId;
//             query.wentTo=empData.empId;
//             query.stage='init';

            
//             db.collection('Kra').insert(query,function(err,result)
//                 {
//                 if(error)
//                 {
//                     res.send({message:"Something Went Wrong.",status:'FAILED'});
//                 }
//                 else{
//                     addToInputTable('KRA', result.kraId, result.empId, 'live', new Date());
//                 }
//                 }
//             );
 

//     });
//     // var KRA = new Parse.Object.extend('Kra');
//     // var newKRA = new KRA();
//     // newKRA.set('kraId', 'k_' + kraIndex);
//     // newKRA.set('empId', empData.get('empId'));
//     // newKRA.set('empRef', empData);
//     // var dummyArray = new Array();

//     // newKRA.set('kraValue', dummyArray); //kraValue is the name of the array
//     // newKRA.set('version', 'live');
//     // newKRA.set('startDate', new Date());
//     // newKRA.set('endDate', new Date());
//     // //set validity date
//     // var valDate = new Date();
//     // newKRA.set('valDate', valDate.addHours(730));

//     // var dummyArray = new Array();
//     // var dummyObj = new Object(); //create object to push into array
//     // dummyObj.supervisorId = empData.get('supervisorId');
//     // dummyObj.supervisorInput = "";
//     // dummyObj.supervisorReview = false;
//     // dummyArray.push(dummyObj); //push object into array
//     // newKRA.set('supervisor', dummyArray);
//     // newKRA.set('supervisorId', empData.get('supervisorId'));

//     // newKRA.set('cameFrom', initiatorId);
//     // newKRA.set('wentTo', empData.get('empId'));
//     // newKRA.set('stage', 'init');
//     // newKRA.save(null, {
//     //     success: function(KRA) {
//     //         addToInputTable('KRA', KRA.get('kraId'), KRA.get('empId'), 'live', new Date()); //this will add a copy to input table
//     //     },
//     //     error: function(KRA, error) {
//     //         //alert('Failed to create new object, with error code: ' + error.message);
//     //     }
//     // });
// }
// //function to get count of entries in KRA table
// function getKRACount(next) {
//   MongoClient.connect(url, function (err, db){
//       db.collection('Kra').count(function(error,count)
//         {
//         if(error)
//         {
//             return false;
//         }
//         else{
//             return next(count);
//         }
//         });
//     });
//     // var KRA = new Parse.Object.extend('Kra');
//     // var kraQuery = new Parse.Query(KRA);
//     // var kraIndex = 0;
//     // kraQuery.count({
//     //     success: function(count) {
//     //         callback(count);
//     //     }
//     // });
// }


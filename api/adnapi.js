// var Parse = require('parse/node');
// // Initialize Parse
// Parse.initialize("vrfgweyfrhcq82h8rtcrgeg");
// Parse.serverURL = 'http://adn-server.herokuapp.com/parse'

// Date.prototype.addHours = function(h) {
//     this.setTime(this.getTime() + (h * 60 * 60 * 1000));
//     return this;
// }
// Date.prototype.subHours = function(h) {
//     this.setTime(this.getTime() - (h * 60 * 60 * 1000));
//     return this;
// }


// function dateTimeString(eventDate) {
//     var monthString = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     var dateString = eventDate.getDate() + " " + monthString[eventDate.getMonth()];
//     var hours = eventDate.getHours();
//     var min = eventDate.getMinutes();
//     if (min < 10) {
//         min = "0" + min;
//     }
//     if (hours > 12) {
//         //PM Time
//         hours = hours % 12;
//         var timeString = hours + ":" + min + " PM";
//     } else {
//         hours = hours % 12;
//         if (hours == 0) {
//             hours = 12;
//             var timeString = hours + ":" + min + " PM";
//         } else {
//             var timeString = hours + ":" + min + " AM";
//         }
//         //AM Time
//     }
//     var finalTime = dateString + ', ' + timeString;
//     return finalTime;
// }

// //function to add new employee
// function addEmployee(empArray, callback) {
//     var Emp = new Parse.Object.extend('Employee');
//     var newEmp = new Emp();

//     newEmp.set('name', empArray[0].value);
//     newEmp.set('officeEmail', empArray[1].value);
//     newEmp.set('officeMobile', empArray[2].value);
//     newEmp.set('empId', empArray[3].value);
//     newEmp.set('buisnessDivsion', empArray[4].value);
//     newEmp.set('department', empArray[5].value);
//     newEmp.set('vertical', empArray[6].value);
//     newEmp.set('subVertical', empArray[7].value);
//     newEmp.set('designation', empArray[8].value);
//     //newEmp.set('jobTitle',empArray[9].value);
//     //save it in newEmp
//     newEmp.save(null, {
//         success: function(Employee) {
//             ////console.log('New object created with objectId: ' + Employee.id);
//             callback(true);
//         },
//         error: function(Employee, error) {
//             // error is a Parse.Error with an error code and message.
//             //alert('Failed to create new object, with error code: ' + error.message);
//         }
//     });
// }

// //login function
// function checklogin(username, password, callback) {
//     var Employee = Parse.Object.extend("Employee");
//     var query = new Parse.Query(Employee);
//     query.equalTo("userName", username);
//     query.equalTo("password", password);
//     query.find({
//         success: function(results) {
//             if (results.length) {
//                 //to get info in local storage upon first login
//                 // localStorage.empId = results[0].get('empId');
//                 // localStorage.empObject = JSON.stringify(results[0]);
//                 // localStorage.loggedIn = "true";
//                 callback(true, results[0]);
//             } else {
//                 callback(false, null);
//             }
//         },
//         error: function(error) {
//             //alert("Error: " + error.code + " " + error.message);
//         }
//     });
// }

// //empId validation function
// function validateEmpId(empId, callback) {
    
//     var Employee = Parse.Object.extend("Employee");
//     var query = new Parse.Query(Employee);
//     query.equalTo("empId", empId);
//     query.count({
//         success: function(count) {
         
//             if (count > 0) {
//                 //to get info in local storage upon first login
//                 callback(false);
//             } else {
//                 callback(true);
//             }
//         },
//         error: function(error) {
//             //alert("Error: " + error.code + " " + error.message);
//         }
//     });
// }

// //chaneg password
// function changePassword(username, password, callback) {
//     var Employee = Parse.Object.extend("Employee");
//     var query = new Parse.Query(Employee);
//     query.equalTo("userName", username);
//     query.find({
//         success: function(results) {
//             if (results.length) {
//                 var newEmp = results[0];
//                 newEmp.set('password', password);
//                 newEmp.set('passwordReset', true); //setting change password to true indication pass reset for first time
//                 newEmp.save(null, {
//                     success: function(Employee) {
//                         callback(true);
//                     },
//                     error: function(Employee, error) {
//                         //alert('Failed to create new object, with error code: ' + error.message);
//                     }
//                 });
//                 callback(true, results[0]);
//             } else {
//                 callback(false, null);
//             }
//         },
//         error: function(error) {
//             //alert("Error: " + error.code + " " + error.message);
//         }
//     });
// }

// //function to submit personal form
// function submitPersonal(empId, dataArray, type, callback) {
//     var Employee = Parse.Object.extend("Employee");
//     var query = new Parse.Query(Employee);
//     query.equalTo("empId", empId);
//     query.find({
//         success: function(results) {
//             if (results.length) {
//                 var newEmp = results[0];
//                 var personalArray = results[0].get("personal"); //to fetch existing array
//                 var dummyObj = new Object();
//                 if (personalArray[0]) {
//                     if (type == "personal") {
//                         personalArray[0].gender = dataArray[4].value;
//                         personalArray[0].personalEmail = dataArray[8].value;
//                         personalArray[0].personalMobile = dataArray[6].value;
//                         personalArray[0].dob = dataArray[5].value;
//                         personalArray[0].bloodGroup = dataArray[10].value;
//                         personalArray[0].religion = dataArray[11].value;
//                         personalArray[0].nationality = dataArray[13].value;
//                         personalArray[0].homePhone = dataArray[7].value;
//                         personalArray[0].motherName = dataArray[3].value;
//                         personalArray[0].fatherName = dataArray[2].value;
//                         personalArray[0].maritialStatus = dataArray[12].value;
//                         personalArray[0].emergencyContactName = dataArray[14].value;
//                         personalArray[0].emergencyContactNumber = dataArray[15].value;
//                     } else {
//                         personalArray[0].presentAddress = " " + dataArray[0].value + " " + dataArray[1].value + "," + dataArray[2].value + "," + dataArray[3].value + "," + dataArray[4].value + "," + dataArray[5].value;
//                         personalArray[0].permanentAddress = " " + dataArray[6].value + " " + dataArray[7].value + "," + dataArray[8].value + "," + dataArray[9].value + "," + dataArray[10].value + "," + dataArray[11].value;
//                     }
//                 }
//                 newEmp.set('personal', personalArray);
//                 newEmp.save(null, {
//                     success: function(Employee) {
                        
//                         callback(true);
//                     },
//                     error: function(Employee, error) {
//                         // error is a Parse.Error with an error code and message.
//                         //alert('Failed to create new object, with error code: ' + error.message);
//                     }
//                 });
//                 callback(true);
//             } else {
//                 callback(false);
//             }
//         },
//         error: function(error) {
//             //alert("Error: " + error.code + " " + error.message);
//         }
//     });
// }

// //submit office info
// function submitOfficeInfo(empId, dataArray, type, callback) {

//     var Employee = Parse.Object.extend("Employee");
//     var query = new Parse.Query(Employee);
//     query.equalTo("empId", empId);
//     query.find({
//         success: function(results) {
//             if (results.length) {
//                 var newEmp = results[0];
             

//                 var officeArray = results[0].get("officeDetails");
//                 var dummyObj = new Object();

//                 if (type == "basicOffice") {
//                     officeArray[0].idCardNumber = dataArray[2].value;
//                     officeArray[0].companyName = dataArray[3].value;
//                     officeArray[0].facility = dataArray[7].value;
//                     officeArray[0].city = dataArray[8].value;
//                     officeArray[0].country = dataArray[9].value;
//                     officeArray[0].costCenter = dataArray[10].value;
//                 } else if (type == "joiningDetails") {
//                     officeArray[0].dateOfJoining = dataArray[0].value;
//                     officeArray[0].dateOfConfirmation = dataArray[1].value;
//                     officeArray[0].stateOfConfirmation = dataArray[2].value;
//                     officeArray[0].workPermitNumber = dataArray[3].value;
//                     officeArray[0].effectiveDate = dataArray[4].value;
//                     officeArray[0].expiryDate = dataArray[5].value;
//                 } else if (type == "performanceRating") {
//                     officeArray[0].pfRating1516 = dataArray[0].value;
//                     officeArray[0].pfRating1617 = dataArray[1].value;
//                 } else if (type == "separationDetails") {
//                     officeArray[0].dateOfResignation = dataArray[23].value;
//                     officeArray[0].dateOfSeparation = dataArray[5].value;
//                     officeArray[0].separationEffectiveDate = dataArray[9].value;
//                     officeArray[0].separationType = dataArray[24].value;
//                 }
//                 //}

//                 newEmp.set('officeDetails', officeArray);
//                 newEmp.save(null, {
//                     success: function(Employee) {
//                         callback(true);
//                     },
//                     error: function(Employee, error) {
//                         //alert('Failed to create new object, with error code: ' + error.message);
//                     }
//                 });
//                 callback(true);
//             } else {
//                 callback(false);
//             }
//         },
//         error: function(error) {
//             //alert("Error: " + error.code + " " + error.message);
//         }
//     });
// }

// //function to submit previous emp details in the office profile(HR)
// function submitPositionDetails(empId, dataArray, callback) {

//     var Employee = Parse.Object.extend("Employee");
//     var query = new Parse.Query(Employee);
//     query.equalTo("empId", empId);
//     query.find({
//         success: function(results) {
//             if (results.length) {
//                 var newEmp = results[0];
//                 newEmp.set('designation', empArray[0].value);
//                 newEmp.set('employeeGrade', empArray[2].value);
//                 newEmp.set('buisnessDivsion', empArray[3].value);
//                 newEmp.set('department', empArray[4].value);
//                 newEmp.set('vertical', empArray[5].value);
//                 newEmp.set('subVertical', empArray[6].value);

//                 var officePosArray = results[0].get("officePositionDetails");

//                 if (officePosArray) {
//                     officePosArray[0].designation = dataArray[0].value;
//                     officePosArray[0].employeeCategory = dataArray[1].value;
//                     officePosArray[0].employeeGrade = dataArray[2].value;
//                     officePosArray[0].buisnessDivision = dataArray[3].value;
//                     officePosArray[0].department = dataArray[4].value;
//                     officePosArray[0].vertical = dataArray[5].value;
//                     officePosArray[0].subVertical = dataArray[6].value;
//                     officePosArray[0].reportingManagerId = dataArray[7].value;
//                     officePosArray[0].reviewerId = dataArray[8].value;
//                     officePosArray[0].buisnessHrSpocId = dataArray[9].value;
//                     officePosArray[0].buisnessHrHeadId = dataArray[10].value;
//                     officePosArray[0].groupHrHeadId = dataArray[11].value;
//                 }

//                 newEmp.set('officePositionDetails', officePosArray);
//                 newEmp.save(null, {
//                     success: function(Employee) {
//                         callback(true);
//                     },
//                     error: function(Employee, error) {
//                         //alert('Failed to create new object, with error code: ' + error.message);
//                     } // error is a Parse.Error with an error code and message.
//                 });
//                 callback(true);
//             } else {
//                 callback(false);
//             }
//         },
//         error: function(error) {
//             //alert("Error: " + error.code + " " + error.message);
//         }
//     });
// }

// //function to submit previous emp details in the office profile(HR)
// function submitpreviousEmployment(empId, dataArray, callback) {

//     var Employee = Parse.Object.extend("Employee");
//     var query = new Parse.Query(Employee);
//     query.equalTo("empId", empId);
//     query.find({
//         success: function(results) {
//             if (results.length) {
//                 var newEmp = results[0];
//                 var dummyArray = new Array();
//                 var dummyObj = new Object();

//                 dummyObj.companyName = dataArray[0].value;
//                 dummyObj.companyBuisness = dataArray[1].value;
//                 dummyObj.designation = dataArray[2].value;
//                 dummyObj.department = dataArray[3].value;
//                 dummyObj.responsibility = dataArray[4].value;
//                 dummyObj.companyLocation = dataArray[5].value;
//                 dummyObj.employmentPeriod = dataArray[6].value;
//                 dummyObj.areaOfExperience = dataArray[7].value;

//                 dummyArray.push(dummyObj); //push object into previosWorkDetails array
//                 newEmp.set('previousWorkDetails', dummyArray);
//                 newEmp.save(null, {
//                     success: function(Employee) {
//                         callback(true);
//                     },
//                     error: function(Employee, error) {
//                         //alert('Failed to create new object, with error code: ' + error.message);
//                     } // error is a Parse.Error with an error code and message.
//                 });
//                 callback(true);
//             } else {
//                 callback(false);
//             }
//         },
//         error: function(error) {
//             //alert("Error: " + error.code + " " + error.message);
//         }
//     });
// }

// //submit payroll information
// function submitPayrollInformation(empId, dataArray, type, callback) {
//     var payrollInformation = Parse.Object.extend("payrollInformation");
//     var query = new Parse.Query(payrollInformation);
//     query.equalTo("empId", empId);
//     query.find({
//         success: function(results) {
//             if (results.length) {
//                 var newPayInfo = results[0];
//             } else {
//                 var newPayInfo = new payrollInformation();
//                 newPayInfo.set('empId', empId);
//             }
//             if (type == "bankDetails") {
//                 var dummyArray = new Array();
//                 var dummyObj = new Object();
//                 dummyObj.bankName = dataArray[0].value;
//                 dummyObj.accountName = dataArray[1].value;
//                 dummyObj.accountNumber = dataArray[2].value;
//                 dummyObj.currency = dataArray[3].value;
//                 dummyArray.push(dummyObj);
//                 newPayInfo.set('bankDetails', dummyArray);
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
//                 newPayInfo.set('salaryDetails', dummyArray); //push into salary details array
//             } else if (type == "otherBenefitDetails") {
//                 var dummyArray = new Array();
//                 var dummyObj = new Object();
//                 dummyObj.festivalAllowance = dataArray[0].value;
//                 dummyObj.providentFundMembership = dataArray[1].value;
//                 dummyObj.groupLifeInsurance = dataArray[2].value;
//                 dummyObj.hospitalizationScheme = dataArray[3].value;
//                 dummyArray.push(dummyObj); //push object into array
//                 newPayInfo.set('otherBenefitDetails', dummyArray);
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
//                 newPayInfo.set('companyCarDetails', dummyArray);
//             } else if (type == "personalCarDetails") {
//                 var dummyArray = new Array();
//                 var dummyObj = new Object();
//                 dummyObj.registrationNumber = dataArray[0].value;
//                 dummyObj.effectiveDate = dataArray[1].value;
//                 dummyObj.expiryDate = dataArray[2].value;
//                 dummyObj.ownCarUsageAllowance = dataArray[3].value;
//                 dummyArray.push(dummyObj); //push object into array
//                 newPayInfo.set('personalCarDetails', dummyArray);
//             }

//             newPayInfo.save(null, {
//                 success: function(payrollInformation) {
//                     callback(true);
//                 },
//                 error: function(payrollInformation, error) {
//                     //alert('Failed to create new object, with error code: ' + error.message);
//                 }
//             });
//             //callback(true);
//         },
//         error: function(error) {
//             callback(false);
//             //alert("Error: " + error.code + " " + error.message);
//         }
//     });
// }

// //function to fetch the data for KRA select
// function kraWizardSelect(dept, grade, callback) {
//     var Employee = Parse.Object.extend("Employee");
//     var query = new Parse.Query(Employee);
//     if (dept)
//         query.equalTo("department", dept); //if the dept is present it will consider this
//     if (grade.length > 0)
//         query.containedIn("employeeGrade", grade); //containedIn: because grade is array
//     query.find({
//         success: function(results) {
//             if (results.length) {
//                 callback(true, results);
//             } else {
//                 callback(false, null);
//             }
//         },
//         error: function(error) {
//             //alert("Error: " + error.code + " " + error.message);
//         }
//     });
// }


// //funtion to initiate KRA for some selected array of employees
// function initiateKRA(empArray, initiatorId) {
//     //add to kra table
//     //add to input table of all employees-being done in addToKraTable

//     //send notification
//     var Employee = new Parse.Object.extend('Employee');
//     var query = new Parse.Query(Employee);
//     query.containedIn('empId', empArray);
//     query.find({
//         success: function(results) {
//             if (results.length > 0) {
//                 getKRACount(function(count) { //get count of entries in KRA table
//                     for (i = 0; i < results.length; i++) {
//                         addToKRATable(results[i], count + i, initiatorId); //to initiate KRA for selection,add values into KRA table
//                     }
//                 });
//             }
//         }
//     })
// }

// //function to get count of entries in KRA table
// function getKRACount(callback) {
//     var KRA = new Parse.Object.extend('Kra');
//     var kraQuery = new Parse.Query(KRA);
//     var kraIndex = 0;
//     kraQuery.count({
//         success: function(count) {
//             callback(count);
//         }
//     });
// }

// function addToKRATable(empData, kraIndex, initiatorId) {
//     var KRA = new Parse.Object.extend('Kra');
//     var newKRA = new KRA();
//     newKRA.set('kraId', 'k_' + kraIndex);
//     newKRA.set('empId', empData.get('empId'));
//     newKRA.set('empRef', empData);
//     var dummyArray = new Array();

//     newKRA.set('kraValue', dummyArray); //kraValue is the name of the array
//     newKRA.set('version', 'live');
//     newKRA.set('startDate', new Date());
//     newKRA.set('endDate', new Date());
//     //set validity date
//     var valDate = new Date();
//     newKRA.set('valDate', valDate.addHours(730));

//     var dummyArray = new Array();
//     var dummyObj = new Object(); //create object to push into array
//     dummyObj.supervisorId = empData.get('supervisorId');
//     dummyObj.supervisorInput = "";
//     dummyObj.supervisorReview = false;
//     dummyArray.push(dummyObj); //push object into array
//     newKRA.set('supervisor', dummyArray);
//     newKRA.set('supervisorId', empData.get('supervisorId'));

//     newKRA.set('cameFrom', initiatorId);
//     newKRA.set('wentTo', empData.get('empId'));
//     newKRA.set('stage', 'init');
//     newKRA.save(null, {
//         success: function(KRA) {
//             addToInputTable('KRA', KRA.get('kraId'), KRA.get('empId'), 'live', new Date()); //this will add a copy to input table
//         },
//         error: function(KRA, error) {
//             //alert('Failed to create new object, with error code: ' + error.message);
//         }
//     });
// }

// //function to set kra
// function setKRA(kraArray, callback) {

//     var empId = '';
//     var kraId = 'k_0';

//     var Kra = Parse.Object.extend("Kra");
//     var query = new Parse.Query(Kra);
//     query.equalTo("kraId", kraId); //match kraId to table
//     query.find({
//         success: function(results) {
//             if (results.length) {

//                 var newKRA = results[0];
//                 var dummyArray = new Array();
//                 //push kraArray into table
//                 for (i = 0; i < kraArray.length; i++) {
//                     if (kraArray[i].complete) {
//                         var dummyObj = new Object(); //create object to push into array
//                         dummyObj.kra = kraArray[i].kra;
//                         dummyObj.kraCat = kraArray[i].kraCategory;
//                         dummyObj.kraWeight = kraArray[i].kraWeight;
//                         dummyObj.kraUos = kraArray[i].kraUnitSuccess;
//                         dummyObj.kraMos = kraArray[i].kraMeasureSuccess;
//                         dummyArray.push(dummyObj); //push object into array
//                     }
//                 }

//                 newKRA.set('kraValue', dummyArray); //kraValue is the name of the array
//                 newKRA.set('version', 'live');
//                 newKRA.set('stage', 'posted');
//                 newKRA.set('endDate', new Date());
//                 newKRA.save(null, {
//                     success: function(KRA) {
//                         // Execute any logic that should take place after the object is saved.
//                         addToApprovalTable('KRA', KRA.get('kraId'), KRA.get('supervisorId'), 'live', new Date()); //this will add a copy to input table
//                         callback(true);
//                     },
//                     error: function(KRA, error) {
//                         // Execute any logic that should take place if the save fails.
//                         // error is a Parse.Error with an error code and message.
//                         callback(false);
//                     }
//                 });
//             } else {
//                 callback(false);
//             }
//         },
//         error: function(error) {
//         }
//     });
// }

// //function to save as draft KRA
// function setKRADraft(kraArray, callback) {
//     var empId = '';
//     var kraId = 'k_0';

//     var Kra = Parse.Object.extend("Kra");
//     var query = new Parse.Query(Kra);
//     query.equalTo("kraId", kraId); //match kraId to table
//     query.find({
//         success: function(results) {
//             if (results.length) {
//                 var newKRA = results[0];
//                 var dummyArray = new Array();
//                 //push kraArray into table using loop
//                 for (i = 0; i < kraArray.length; i++) {

//                     var dummyObj = new Object(); //create object to push into array
//                     dummyObj.kra = kraArray[i].kra;
//                     dummyObj.kraCat = kraArray[i].kraCategory;
//                     dummyObj.kraWeight = kraArray[i].kraWeight;
//                     dummyObj.kraUos = kraArray[i].kraUnitSuccess;
//                     dummyObj.kraMos = kraArray[i].kraMeasureSuccess;
//                     dummyArray.push(dummyObj); //push object into array

//                 }
//                 newKRA.set('kraValue', dummyArray); //kraValue is the name of the array
//                 newKRA.set('version', 'live');
//                 newKRA.set('stage', 'draft');
//                 newKRA.set('endDate', new Date());
//                 newKRA.save(null, {
//                     success: function(KRA) {
//                         addToDraftTable('KRA', KRA.get('kraId'), KRA.get('empId'), 'live', new Date());
//                         callback(true);
//                     },
//                     error: function(KRA, error) {
//                         callback(false);
//                     }
//                 });
//             } else {
//                 callback(false);
//             }
//         },
//         error: function(error) {
//         }
//     });
// }

// //Generic Function to add to Input Table
// function addToInputTable(type, typeId, empId, status, startDate) {
//     var Inputs = Parse.Object.extend("Inputs");
//     var newInputs = new Inputs();

//     newInputs.set('type', type);
//     newInputs.set('typeId', typeId);
//     newInputs.set('empId', empId);
//     newInputs.set('status', status);
//     newInputs.set('startDate', startDate);

//     newInputs.save(null, {
//         success: function(Inputs) {
//         },
//         error: function(Inputs, error) {
//             //alert('Failed to create new object, with error code: ' + error.message);
//         }
//     });
// }

// //Generic Function to add to approval Table
// function addToApprovalTable(type, typeId, empId, status, startDate) {
//     resetInputTable(typeId, 'inProgress', function() {
//         var Approvals = Parse.Object.extend("Approvals");
//         var newApprovals = new Approvals();

//         newApprovals.set('type', type);
//         newApprovals.set('typeId', typeId);
//         newApprovals.set('empId', empId);
//         newApprovals.set('status', status);
//         newApprovals.set('startDate', startDate);
//         //newInputs.set('endDate',new Date());

//         newApprovals.save(null, {
//             success: function(Inputs) {
//             },
//             error: function(Inputs, error) {
//                 //alert('Failed to create new object, with error code: ' + error.message);
//             }
//         });
//     });
// }

// //clear entry from Input table
// function resetInputTable(typeId, status, callback) {
//     var Inputs = Parse.Object.extend("Inputs");
//     var query = new Parse.Query(Inputs);
//     query.equalTo("typeId", typeId);
//     query.find({
//         success: function(results) {
//             if (results.length) {
//                 results[0].set('status', status);
//                 results[0].save(null, {
//                     success: function(Inputs) {
//                         callback();
//                     },
//                     error: function(Inputs, error) {
//                         //alert('Failed to create new object, with error code: ' + error.message);
//                     }
//                 });
//             } else {
//                 callback();
//             }
//         }
//     });
// }

// //generic draft table
// function addToDraftTable(type, typeId, empId, status, startDate) {
//     resetInputTable(typeId, 'inDraft', function() {
//         //setting the draft table entry
//         var Drafts = Parse.Object.extend("Drafts");
//         var newDrafts = new Drafts();

//         newDrafts.set('type', 'KRA');
//         newDrafts.set('typeId', typeId);
//         newDrafts.set('empId', empId);
//         newDrafts.set('status', status);
//         newDrafts.set('startDate', new Date());

//         newDrafts.save(null, {
//             success: function(Drafts) {
//             },
//             error: function(Drafts, error) {
//                 //alert('Failed to create new draft object, with error code: ' + error.message);
//             }
//         });
//     });
// }

// //function to check wether a KRA is initiated for an emplopyee
// //made when the login page would forcefully take to kra
// function checkKra(empId, callback) {
//     var kraId = 'k_0';
//     var Kra = Parse.Object.extend("Kra");
//     var query = new Parse.Query(Kra);
//     query.equalTo("empId", empId); //match empId to table
//     query.find({
//         success: function(results) {
//             if (results.length) {
//                 callback(true);
//             } else {
//                 callback(false);
//             }
//         },
//         error: function(error) {
//         }
//     });
// }

// //function to check input table
// function checkInputTable(empId,callback) {
//     var Inputs = Parse.Object.extend("Inputs");
//     var query = new Parse.Query(Inputs);
//     query.equalTo("empId", empId); //match kraId to table
//     query.find({
//         success: function(results) {
//             if (results.length) { //try in future for more results
//               var inputNumber=results.length;
//               callback(true,results);
//             } else {
//                 callback(false,null);
//             }
//         },
//         error: function(error) {
//         }
//     });
// }

// //function to check drafts table
// function checkDraftsTable(empId,callback) {
//     var Drafts = Parse.Object.extend("Drafts");
//     var query = new Parse.Query(Drafts);
//     query.equalTo("empId", empId); //match kraId to table
//     query.equalTo("status", "live"); //match kraId to table
//     query.find({
//         success: function(results) {
//             if (results.length) { //try in future for more results
//               var draftsNumber=results.length;
//               callback(true,results);
//             } else {
//                 callback(false,null);
//             }
//         },
//         error: function(error) {
//         }
//     });
// }

// //function to check approvals table
// function checkApprovalTable(empId,callback) {
//     var Approvals = Parse.Object.extend("Approvals");
//     var query = new Parse.Query(Approvals);
//     query.equalTo("empId", empId); //match kraId to table
//     query.equalTo("status", "live"); //match kraId to table
//     query.find({
//         success: function(results) {
//             if (results.length) { //try in future for more results
//               var approvalsNumber=results.length;
//               callback(true,results);
//             } else {
//                 callback(false,null);
//             }
//         },
//         error: function(error) {
//         }
//     });
// }

// //function to check Clarification table
// function checkClarificationTable(empId,callback) {
//     var Clarification = Parse.Object.extend("Clarification");
//     var query = new Parse.Query(Clarification);
//     query.equalTo("empId", empId); 
//     query.equalTo("status", "live");
//     query.find({
//         success: function(results) {
//             if (results.length) { 
//               var clarificationNumber=results.length;
//               callback(true,results);
//             } else {
//                 callback(false,null);
//             }
//         },
//         error: function(error) {
//         }
//     });
// }

// module.exports = adnapi;
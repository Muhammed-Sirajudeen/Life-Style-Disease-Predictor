var express = require('express');
var router = express.Router();
const api=require('./api/apicall')
const DatabaseCall=require('./api/database')
let fetchedData=[];
let uniquekey=[]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/diabetesform', function(req, res, next) {
  res.render('diabetesform', { title: 'Express' });
});
router.get('/strokeform', function(req, res, next) {
  res.render('strokeform', { title: 'Express' });
});
router.get('/heartform', function(req, res, next) {
  res.render('heartform', { title: 'Express' });
});

router.post('/diabetesSubmit',(req,res)=>{
  var key=Math.floor(Math.random() * 30000)
  while(true){
    if(key in uniquekey){
      key=Math.floor(Math.random() * 30000)
    }
    else{
      uniquekey.push(key)
      console.log(uniquekey)
      console.log("unique key generated")
      break
    }}
  
 
  var age=req.body.age
  
  if (req.body.genetics=='on'){
    var genetics=1
  }else{
    var genetics=0
  }
  if(req.body.excercise!='on'){
    var excercise=1
  }else{
    var excercise=0
  }
  if(req.body.ethnicity=='on'){
    var ethnicity=1
  }else{
    var ethnicity=0
  }
  if(req.body.symptoms=='on'){
    var symptoms=1
  }else{
    var symptoms=0
  }
  if (req.body.obese=='on'){
    var obese=1
  }else{
    var obese=0
  }
  
  data={secretid:key,name:req.body.fullname,Age:age,FamilyHis:genetics,Ethnicity:ethnicity
  ,Symptoms:symptoms,Excercise:excercise}
  console.log(data)
  api.makeGetrequest('diabetes',data)
  console.log("the key is",key)
  res.render('diabetesform',{result:true,secretkey:key})
})


router.post('/search', function(req, res, next) {
  console.log(req.body.search)
  res.render('search', { title: 'Express' });
});

router.post('/diabetesresult', function(req, res, next) {
  //databasecall here
  var key=req.body.key
  id={secretid:key}
  console.log(id)
  DatabaseCall.fetchData("machinelearningdata","diabeticresults",id).then((data)=>{
    
    if (data.result==0){
      results="The Probability og you having diabetes is very low"
    }else if(data.result==1){
      results="There is a high chance that you may already have diabetes"
    }else if(data.result==2){
      results="The reason for your diabetes is more of a genetical reason than lifestyle"
    }
    var name=data.name
    
    res.render('diabetesresult', { resultdata:results,namedata:name });
    
    

  })

});





router.post('/heartSubmit', function(req, res, next) {
  var key=Math.floor(Math.random() * 30000)
  while(true){
    if(key in uniquekey){
      key=Math.floor(Math.random() * 30000)
    }
    else{
      uniquekey.push(key)
      console.log(uniquekey)
      console.log("unique key generated")
      break
    }}
  console.log(req.body)
  var name=req.body.fullname
  var age=req.body.age

  if(req.body.diabetes=='on'){
    var diabetes=1
  }else{
    var diabetes=0
  }
  if(req.body.drugabuse=='on'){
    var drugabuse=1
  }else{
    var drugabuse=0
  }

  if(req.body.alcoholcaffeine=='on'){
    var alcoholcaffeine=1
  }else{
    var alcoholcaffeine=0
  }

  if(req.body.bloodpressure=='on'){
    var bloodpressure=1
  }else{
    var bloodpressure=0
  }

  if(req.body.cholestrol=='on'){
    var cholestrol=1
  }else{
    var cholestrol=0
  }

  if(req.body.smoking=='on'){
    var smoking=1
  }else{
    var smoking=0
  }
  if(req.body.stress=='on'){
    var stress=1
  }else{
    var stress=0
  }
  if(req.body.familyhis=='on'){
    var familyhis=1
  }else{
    var familyhis=0
  }

  if(req.body.poordiet=='on'){
    var poordiet=1
  }else{
    var poordiet=0
  }
  if(req.body.obese=='on'){
    var obese=1
  }else{
    var obese=0
  }

  if(req.body.physicalinactivity=='on'){
    var physicalinactivity=1
  }else{
    var physicalinactivity=0
  }
  var apidata={secretid:key,username:name,age:age,diabetes:diabetes,drugabuse:drugabuse,
  alcoholcaffeine:alcoholcaffeine,bloodpressure:bloodpressure,cholestrol:cholestrol,
smoking:smoking,stress:stress,familyhis:familyhis,poordiet:poordiet,obese:obese,physicalinactivity:physicalinactivity}
  console.log(apidata)

  api.makeGetrequest('heart',apidata)

  res.render('heartform', { result: true,secretkey:key });
  });



  router.post('/heartresult', function(req, res, next) {
    var key=req.body.secretkeys
    id={secretid:key}
    console.log(id)
    //HEART RESULT DATABASE CALL HERE
    DatabaseCall.fetchData("machinelearningdata","heartresults",id).then((data)=>{
      console.log(data)
      
      if (data.result==0){
        results="The Probability of you having a heart disease is low"
      }else if(data.result==1){
        results="You may want to improve your lifestyle to avoid the slight chance of heart disease"
      }else if(data.result==2){
        results="There is a high chance that you would have heart based problems"
      }else if (data.result==3){
        results="Very High Risk Consult a Doctor soon"
      }
      var name=data.name
      
      res.render('heartresult', { resultdata:results,namedata:name });
  
    })
  })

  router.post('/strokeSubmit',(req,res,next)=>{
      var key=Math.floor(Math.random() * 30000)
      while(true){
        if(key in uniquekey){
          key=Math.floor(Math.random() * 30000)
        }
        else{
          uniquekey.push(key)
          console.log(uniquekey)
          console.log("unique key generated")
          break
        }}
      
      var name=req.body.fullname
      var age=req.body.age
      
      if (req.body.smoking=='on'){
        var smoking=1
      }else{
        var smoking=0
      }
      if(req.body.alcohol=='on'){
        var alcohol=1
      }else{
        var alcohol=0
      }
      if(req.body.diabetes=='on'){
        var diabetes=1
      }else{
        var diabetes=0
      }
      if(req.body.bloodpressure=='on'){
        var bloodpressure=1
      }else{
        var bloodpressure=0
      }
      if (req.body.cholestrol=='on'){
        var cholestrol=1
      }else{
        var cholestrol=0
      }

      if (req.body.migraine=='on'){
        var migraine=1
      }else{
        var migraine=0
      }
      

      if (req.body.drugabuse=='on'){
        var drugabuse=1
      }else{
        var drugabuse=0
      }

      if (req.body.birthcontrol=='on'){
        var birthcontrol=1
      }else{
        var birthcontrol=0
      }

      if (req.body.genderm=='on'){
        var gender=1
      }else if(req.body.genderf=='on'){
        var gender=0
      }else{
        gender=0
      }

      if (req.body.obese=='on'){
        var obese=1
      }else{
        var obese=0
      }
      if (req.body.physicalinactivity!='on'){
        var physicalinactivity=1
      }else{
        var physicalinactivity=0
      }

      data={secretid:key,name:name,Age:age,Smoking:smoking,Alcohol:alcohol,
      Diabetes:diabetes,Bloodpressure:bloodpressure,Cholestrol:cholestrol,
    Migraine:migraine,Drugabuse:drugabuse,Birthcontrol:birthcontrol,Gender:gender,Obese:obese,
  Physicalinactivity:physicalinactivity}
      console.log(data)
      api.makeGetrequest('stroke',data)
      console.log("the key is",key)
      res.render('strokeform',{result:true,secretkey:key})
    })






    router.post('/strokeResult', function(req, res, next) {
      key=req.body.secretkeyss
      id={secretid:key}
      DatabaseCall.fetchData('machinelearningdata','strokeresults',id).then((data)=>{
        var username=data.name
        if(data.result==0){
          result="The chance for you having stroke is very low"
        }else if(data.result==1){

          result="The chance of you having stroke is high please consult a doctor soon"
        }

        res.render('strokeresult', { resultsdata: result,namesdata:username });

      })
      
    });
    






  






    module.exports = router;

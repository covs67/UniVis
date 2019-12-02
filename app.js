var express = require('express');
var app = express();

var firebase = require('firebase-admin')
var serviceAccount = require('./serviceAccountKey.json')
var initializeApp = firebase.initializeApp({
    databaseURL: "https://univiz.firebaseio.com",
    credential: firebase.credential.cert(serviceAccount)
  } );
 


  app.get('/locations', async(response)=>{
      try {
          var result = []
          var database = firebase.database();
          var locationsRef = database.ref('locations');
          const locations = await locationsRef.once('value');
            // Do something with the result
           locations.foreach(function(snapshot){
               result.push({
                   name:snapshot.val().name,
                   description: snapshot.val().description?snapshot.val().description: 'default description',
                   location:{
                       lat:snapshot.val().lat,
                       lng:snapshot.val().lng
                   }
               })
           });
        response.json(result);
            // Handle error
        
      } catch (error) {
          
      }
  })

  app.post('/location', async(request,response)=>{
      try {
          var result = []
          var locationsRef = database.ref('locations');
          var randomlat = request.latitude+getRandomLocationNumber()
          var randomlng = request.longitude+getRandomLocationNumber()
          locationsRef.push({
             name: 'test name',
            lat: randomlat,
            lng: randomlng, 
            type: 'building'   
          }).then(
              window.alert('lat:'+randomlat+', long:'+randomlng)
          ).then(
              window.location.reload()
          )

        } catch (error) {
          console.log(error)
      }
  })
app.get('/', function(request, response){
    response.sendfile(path.join(__dirname, 'index.html'));
});
  app.use("/static", express.static('./static/'));
  app.listen(process.env.PORT||4000,function(){
      console.log('Server Running at Port 4000')
  })
  var getRandomLocationNumber = function(){
      return Math.floor(Math.random()*(0.009-0.001))+0.001
  }
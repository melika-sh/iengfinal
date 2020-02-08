const fs = require('fs');
const express = require('express');
var cors = require('cors')

const PORT = process.env.PORT || 3001;
const formsCollection = "forms";
const dataCollection = "data";
const featuresCollection = "area";

var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://melika:melika123@cluster0-syomp.mongodb.net/test?retryWrites=true&w=majority"
function writeOnDocument(collection, myObj){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ieng");
        dbo.collection(collection).insertOne(myObj, function(err, res) {
        if (err) throw err;
        console.log("1 form inserted");
        db.close();
      });   
      });
}

function getAllDocument(collection){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ieng");
        dbo.collection(collection).find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            return(result);
      });   
      });
}
function queryDocument(collection,query){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ieng");
        dbo.collection(collection).find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            return(result);
      });   
      });
}
function queryOneDocument(collection,query){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ieng");
        dbo.collection(collection).findOne(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            return(result);
      });   
      });
}
function insertOneDocument(collection,document){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("ieng");
        dbo.collection(collection).insertOne(document,function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
      });   
      });
}
var serveIndex = require('serve-index')
var path = require('path')
var serveStatic = require('serve-static')

express()
    .use(cors())
    .use(express.json())
    .get('/gis/testpoint', (req, res) => {
        var result = { polygons : [] };
        try {
          var point = [parseFloat(req.query.lat), parseFloat(req.query.long)];
          features.forEach(function (feature) {
            feature.geometry.coordinates.forEach(function (coordinates) {
              if (inside(point, coordinates))
                result.polygons.push(feature.properties.name);
            })
          })
          res.json(result);
        } catch (error) {
          res.sendStatus(404); //not found
        }
      })
    //get all form models
    .get('/api/forms', (req, res) => {
        try {
            // forms=[]
            forms = getAllDocument(formsCollection);
            res.json(forms);
        } catch (error) {
            res.status(500).send('Error' + error)
        }
    })
    // get form model Id
    .get('/api/forms/:Id', (req, res) => {
        try {
            // form={}
            form = queryOneDocument(formsCollection, {id:req.params["Id"]});
            res.json(form);
        } catch (error) {
            res.status(500).send('Error' + error)
        }
    })
    //post a form data structure {id: , formData:}
    .post('/api/formData', (req, res) => {
        try {
            let fD={
                formID : req.body.formId,
                formdata:req.body.formData
            }
            insertOneDocument(dataCollection,fD);
            res.status(200).send('OK');   
        } catch (error) {
            res.status(500).send('Error' + error)
        }

    })
    //get all forms data for form model id
    .get('/api/formsData/:formId/:Id', (req, res) => {

        try {
            data = queryDocument(dataCollection, {formID:req.params["formId"], _id:req.params["Id"]});
            res.json(data);
        } catch (error) {
            res.status(500).send('Error' + error)
        }
    })
    //get all forms data for form model id
    .get('/api/formsData/:Id', (req, res) => {
        try {
            data = queryDocument(dataCollection, {formID:req.params["Id"]});
            res.json(data);
        } catch (error) {
            res.status(500).send('Error' + error)
        }
    })
    .get('/', (req, res) => res.send("Worked ..."))
    //post one form structure in json from AdminForm component
    .post('/form', (req, res)=>{
        try {
            //check form validity
            insertOneDocument(formsCollection,req.body);
            res.status(200).send('OK');   
        } catch (error) {
            res.status(500).send('Error' + error)
        }            
    })
    //post one area structure in json from AdminArea component
    .post('/area', (req, res)=>{
        try {
            //check form validity
            insertOneDocument(featuresCollection,req.body);
            res.status(200).send('OK');   
        } catch (error) {
            res.status(500).send('Error' + error)
        }            
    })
    .use('/build', express.static('build'))
    /**for files */
    //.use(serveStatic(path.join(__dirname, 'build')))
    /**for directory */
    //.use('/', express.static('build'), serveIndex('build', { 'icons': true }))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))


    //   -------------- ConnectionString
    //   mongodb+srv://melika:<password>@cluster0-bqf2l.mongodb.net/test?retryWrites=true&w=majority



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://melika:melika123@cluster0-bqf2l.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

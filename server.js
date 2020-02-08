const fs = require('fs');
const express = require('express');
var cors = require('cors')

const PORT = process.env.PORT || 3001;

var serveIndex = require('serve-index')
var path = require('path')
var serveStatic = require('serve-static')

var forms = [];
var data = fs.readFileSync('forms.json', 'utf-8');
var formsJson = JSON.parse(data.toString());
var forms = formsJson["forms"];
var formData = formsJson["data"];

var features = [];
var areadata = fs.readFileSync('areas.json', 'utf-8');
var formsJson = JSON.parse(areadata.toString());
var features = formsJson["features"];

var found = false;
var formUniqueNumber=0;
function setMaxFormUniqueNumber(){
    formData.map(fd=>{
        if(fd['id'] > formUniqueNumber)  
            formUniqueNumber=fd['id'] ;
    })
    formUniqueNumber++;
}
setMaxFormUniqueNumber();
//console.log(path.join(__dirname, 'build'));
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
        res.json(forms);
    })
    // get form model Id
    .get('/api/forms/:Id', (req, res) => {
        found = false;
        forms.forEach(function(form) {
            if (form["id"] == req.params["Id"]) {
                found = true;
                res.json(form);
                return;
            }
        });
        if (!found)
            res.send("Form not found");
    })
    //post a form data structure {id: , formData:}
    .post('/api/formData', (req, res) => {
        try {
            let fD={
                formID : req.body.formId,
                id : formUniqueNumber.toString(),
                formdata:req.body.formData
            }
            fD.formdata['id'] = formUniqueNumber.toString();
            formUniqueNumber++;
            formData.push(fD);
            res.status(200).send('OK');   
        } catch (error) {
            res.status(500).send('Error' + error)
        }

    })
    //get all forms data for form model id
    .get('/api/formsData/:formId/:Id', (req, res) => {
        //var result=[];
        // console.log(req.params);
        formData.forEach(function(form) {
            if ((form["formID"] === req.params["formId"])
                && (form["id"] === req.params["Id"])
                ) {
                //result.push(form['formdata']);
                res.json(form['formdata']);
            }
        });
        res.status(200).send("Form not found");
    })
    //get all forms data for form model id
    .get('/api/formsData/:Id', (req, res) => {
        var result=[];
        formData.forEach(function(form) {
            found = false;
            if (form["formID"] === req.params["Id"]) {
                found = true;
                result.push(form['formdata']);
            }
        });
        res.json(result);

    })
    .get('/', (req, res) => res.send("Worked ..."))
    //post one form structure in json from AdminForm component
    .post('/form', (req, res)=>{
        try {
            //check form validity
            forms.push(req.body)
            res.status(200).send('OK');                
        } catch (error) {
            res.status(500).send('Error' + error)
        }
    })
    //post one area structure in json from AdminArea component
    .post('/area', (req, res)=>{
        try {
            //check form validity
            features.push(req.body)
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

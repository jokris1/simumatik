const express = require("express");
const res = require("express/lib/response");

// Routes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const Routes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// name of collection inside database
let db = "testdatabas";
let collection = "participants";


// GET ALL NAMES
Routes.route("/names").get(function (req, res) {
  let db_connect = dbo.getDb(db);
  db_connect
    .collection(collection)
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// ADD NEW NAME
Routes.route("/names/add").post(function (req, res) {
  let db_connect = dbo.getDb(db);

  // object with random 24nr id to insert
  let myObj = {
        id: new ObjectId().toHexString(), 
        name: req.body.name,
        wins: req.body.wins,
        losses: req.body.losses
  };

db_connect
    .collection(collection)
    .findOneAndUpdate(
        { _id: ObjectId("62358e189761d347a611725c") }, // filter out document to update
        { $push: { "participants": myObj } },
        { returnDocument: "after" }, // updated document
            function (err, documents) {
                console.log(documents)
                res.send({ error: err, result: documents });        
        }
    )
});


// UPDATE VALUE
Routes.route("/names/update").post(function (req, res) {
  let db_connect = dbo.getDb(db);

  // object with random 24nr id to insert
  let myObj = {
        id: req.body.id,
        name: req.body.name,
        wins: req.body.wins.toString(),
        losses: req.body.losses.toString()
  };

  console.log(myObj)

db_connect
    .collection(collection)
    .findOneAndUpdate(
        { _id: ObjectId("62358e189761d347a611725c") }, // filter out document to update
        { $set: { "participants.$[arrNames].wins": myObj.wins, "participants.$[arrNames].losses": myObj.losses } }, // & = array
        {
            arrayFilters: [ { "arrNames.id": myObj.id } ], // specify element
            returnDocument: "after" // return modified array in res.send()
        },
        function (err, documents) {
            res.send({ error: err, result: documents });        
        }
    )
});


// DELETE NAME
Routes.route("/names/delete").post(function (req, res) {
    let db_connect = dbo.getDb(db);
    let person = req.body;
  
    db_connect
        .collection(collection)
        .findOneAndUpdate(
            { _id: ObjectId("62358e189761d347a611725c") }, // filter out document to update
            { $pull: { "participants": person } },
            {
                returnDocument: "after" // return modified array in res.send()
            },
            function (err, documents) {
                console.log(documents)
                res.send({ error: err, result: documents });        
            }
      )
  });


module.exports = Routes;
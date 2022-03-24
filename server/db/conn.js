// CONNECT TO DB

const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db(); // connects to testdatabas
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};


// original data

// {
//     "_id": {
//         "$oid": "62319b55404c385f3349508d"
//     },
//     "participants": [
//         {"id": 1, "name": "Name 1", "wins": 4, "losses": 2},
//         {"id": 2, "name": "Name 2", "wins": 2, "losses": 2},
//         {"id": 3, "name": "Name 3", "wins": 1, "losses": 2}
//     ]
// }

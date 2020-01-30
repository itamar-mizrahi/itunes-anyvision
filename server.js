const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const key = require("./config/key");
const songs = require("./routes/api/songs");


app.use(bodyparser.json());
app.use("/api/songs", songs);

mongoose.connect(key,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  function(err) {
    if (err) {
      throw err;
    }});
    
    if (process.env.NODE_ENV==='production'){
      app.use(express.static('client/build'));
    }

    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT,process.env.HOST, () => {
      console.log("server is running on port", server.address().port);
    });


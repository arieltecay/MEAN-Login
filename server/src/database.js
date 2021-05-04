const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://arieltecay:arieltecay123@cluster0.tlbsv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((db) => console.log("Connected"))
  .catch((err) => console.log(err));

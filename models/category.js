var mongoose = require("mongoose");
    // passportLocalMongoose = require("passport-local-mongoose");

var CategorySchema = new mongoose.Schema({
    name: String,
    color: String
});

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Category", CategorySchema);

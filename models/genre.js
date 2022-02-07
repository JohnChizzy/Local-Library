const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const genreSchema = new Schema({

     //reference to the associated book
    name: {type: String, required: true, minLength: 3, maxLength: 100 }
});

// Virtual for book's URL
genreSchema
.virtual('url')
.get(function () {
    return '/catalog/genre/' + this._id;
});

//Export model
module.exports = mongoose.model('Genre', genreSchema);
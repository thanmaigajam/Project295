const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var twitterSchema = new Schema({
    _id : {type:Schema.ObjectId,auto:true},
    name : {type : String, required :true},
    review : {type : String,required : true},
    negativeSentences : [{type:String}],
    positiveSentences : [{type : String}],
    requestId : {type : String, required : true},
    topicsAndRatings : [{topic_name : {type:String},topic_rating : {type:Number}}]
})
module.exports = mongoose.model('twitterreviews',twitterSchema);
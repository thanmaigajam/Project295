const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var twitterSchema = new Schema({
    _id : {type:Schema.ObjectId,auto:true},
    brand : {type : String, required :true},
    source : {type : String,required : true},
    negativeSentences : [{type:String}],
    positiveSentences : [{type : String}],
    requestId : {type : String, required : true},
    timeStamp:{type: Date, required : true},
    topicWiseRatings : [{topic : {type:String},rating : {type:Number}}]
})
module.exports = mongoose.model('twitterreviews',twitterSchema);
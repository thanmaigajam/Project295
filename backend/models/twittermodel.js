const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var twitterSchema = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  brand: { type: String, required: true },
  source: { type: String, required: true },
  state:{type:String,required:false},
  negativeSentences: [{ type: String }],
  positiveSentences: [{ type: String }],
  requestId: { type: String, required: true },
  timeStamp: { type: Date, required: true },
  topicWiseRatings: [{ topic: { type: String }, rating: { type: Number } }],
  // LineGraphPolarityDates: [
  //   { negative: [{ type: String }] },
  //   { neutral: [{ type: String }] },
  //   { positive: [{ type: String }] },
  // ],
  choroplethData:[{ country: { type: String }},
  { reviewCount: [{ type: Number }] }],
  donutSentimentCounts: [
    { polarity: { type: Number }, reviewCount: { type: Number } },
  ],
});
module.exports = mongoose.model("twitterreviews", twitterSchema);

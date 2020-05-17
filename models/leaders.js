const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
const currency = mongoose.Types.Currency;
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        require: true,
    },
    abbr: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
        unique: true,
    },
    featured: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});
var Leaders = mongoose.model("Leader", leaderSchema);
module.exports = Leaders;
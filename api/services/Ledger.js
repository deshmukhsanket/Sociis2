var schema = new Schema({
    name: {
        type: String
    },
    shop: {
        type: Schema.Types.ObjectId
    },
    productDetails: [{
        productName: String,
        quantity: Number,
        CP: Number
    }]

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Ledger', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
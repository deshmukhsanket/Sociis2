var schema = new Schema({
    name: {
        type: String,
    },
    shop: {
        type: Schema.Types.ObjectId
    },
    totalQuantity: Number,
    productDetails: [{
        quantity: Number,
        CP: Number,
        SP: Number
    }],
    tax: []
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Product', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
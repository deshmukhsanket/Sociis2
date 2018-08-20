var schema = new Schema({
    name: {
        type: String,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        index: true,
        key: "invoice"
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "Shop",
        index: true
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        index: true
    },
    invoiceList: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            index: true
        },
        quantity: Number,
        rate: Number,
        amount: {
            type: Number,
            default: 0
        }
    }],
    roundOff: {
        type: Number
    },
    total: {
        type: Number
    },
    status: {
        type: String,
        enum: ["Pending", "Partial Pending", "Paid"]
    },
    paidAmount: {
        type: Number,
        default: 0
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Invoice', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
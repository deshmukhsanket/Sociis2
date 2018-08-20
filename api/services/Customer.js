var schema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    mobile: {
        type: String,
        unique: true
    },
    phone1: {
        type: String
    },
    creditAlloted: {
        type: Number
    },
    creditExhausted: {
        type: Number
    },
    creditPending: {
        type: Number
    },
    status: {
        type: Boolean,
        default: true
    },
    invoice: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Invoice"
        }],
        index: true,
        restrictedDelete: true
    },
    payment: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Payment"
        }],
        index: true,
        restrictedDelete: true
    },
    category: {
        type: String,
        enum: ["Silver", "Gold", "Platinum"]
    },
    tillDatePayment: {
        type: Number,
        default: 0
    },
    avgMonthlyExpenditure: {
        type: Number
    },
    balancePayment: {
        type: Number
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Customer', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
var schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: validators.isEmail()
    },
    mobile: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    isShopEmployee: {
        type: Boolean,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        index: true
    },
    shop: {
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    }

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Employee', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,"role","role"));
var model = {};
module.exports = _.assign(module.exports, exports, model);
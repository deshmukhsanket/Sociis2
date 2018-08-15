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
    rights: {
        type: String,
        enum: ["Employee", "Owner"]
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: 'Shop',
        index: true
    },
    password: {
        type: String,
        required: true
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Employee', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    login: function (data, res) {
        Employee.findOne({
            email: data.email,
            password: data.password
        }).exec(function (err, data) {
            if (err || _.isEmpty(data)) {
                res(err, null);
            } else {
                console.log("Data", data);
                var token = jwt.sign({
                    token: data
                }, 'Sanket');
                res.setHeader("authorization", "Bearer " + token);
                res.callback(null, true);
            }
        });
    }
};
module.exports = _.assign(module.exports, exports, model);
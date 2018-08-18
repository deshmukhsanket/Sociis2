var schema = new Schema({
    name: {
        type: String
    },
    shop: {
        type: Schema.Types.ObjectId
    },
    productDetails: [{
        productId: Schema.Types.ObjectId,
        quantity: Number,
        CP: Number,
        SP: Number
    }]

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Ledger', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    // Things to Include From Where BillNo Original Bill GST No OF Source Location.etc
    makeLedgerEntry: function (data, callback) {
        var Const = this(data);
        Const.save(function (err, savedData) {
            if (err) {
                callback("Error In Saving");
            } else {
                async.each(data.productDetails, function (n, callback) {
                    Product.findOne({
                        _id: n.productId
                    }).lean().exec(function (err, product) {
                        if (err) {
                            callback();
                        } else {
                            if (product.totalQuantity == undefined) {
                                product.totalQuantity = 0;
                            }
                            if (isNaN(product.totalQuantity)) {
                                product.totalQuantity = parseFloat(product.totalQuantity);
                            }
                            product.productDetails.push(n);
                            product.totalQuantity = product.totalQuantity + n.quantity;
                            Product.update({
                                _id: product._id
                            }, {
                                productDetails: product.productDetails,
                                totalQuantity: product.totalQuantity
                            }).lean().exec(callback);
                        }
                    });
                }, function (err, data) {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, "Modified Changes");
                    }
                });
            }

        });
    }
};
module.exports = _.assign(module.exports, exports, model);
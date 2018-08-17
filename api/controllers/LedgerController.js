module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    makeLedgerEntry: function (req, res) {
        if (req.body) {
            Ledger.makeLedgerEntry(req.body, res.callback);
        } else {
            res.callback("No Data");
        }
    }
};
module.exports = _.assign(module.exports, controller);
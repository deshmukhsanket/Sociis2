module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
    login: function (req, res) {
        if (req.body) {
            Employee.login(req.body,res)
        } else {
            res.json({
                value: false,
                data: null
            })
        }
    }
};
module.exports = _.assign(module.exports, controller);
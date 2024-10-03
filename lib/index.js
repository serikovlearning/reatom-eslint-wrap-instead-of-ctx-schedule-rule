const { rule } = require('./reatom-replace-ctx-schedule.js')


console.log(rule)

const plugin = {
    meta: {
        name: "reatom-replace-ctx-schedule-plugin",
        version: "0.1"
    },
    rules: {
        'reatom-replace-ctx-schedule': rule,
    }
};

module.exports = { plugin }
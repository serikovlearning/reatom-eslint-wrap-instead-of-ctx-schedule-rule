const { plugin } = require('./lib/index.js')


module.exports = {
    rules: {
      'reatom-replace-ctx-schedule-plugin/reatom-replace-ctx-schedule': 'error',  // Use your custom rule
    },
    plugins: {
      'reatom-replace-ctx-schedule-plugin': plugin
    },
  };



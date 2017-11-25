const instanbul = require('istanbul');
const MochaSpecReporter = require('mocha/lib/reporters/spec');

module.exports = function (runner) {
    const collector = new instanbul.Collector();
    const reporter = new instanbul.Reporter();
    reporter.addAll(['lcov', 'json']);
    /* eslint-disable no-new */
    new MochaSpecReporter(runner);
    /* eslint-enable no-new */

    runner.on('end', () => {
        /* eslint-disable no-underscore-dangle */
        collector.add(global.__coverage__);
        /* eslint-enable no-underscore-dangle */

        reporter.write(collector, true, () => {
            process.stdout.write('report generated');
        });
    });
};

/* jshint node: true */
'use strict';

// modified in purpose,
// but based on https://gist.github.com/novaugust/9d0133588fc29844afaf
// and https://github.com/heyjinkim/ember-cli-index-fragment/blob/master/index.js
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var prefixReplacement = 'PREFIX_PATTERN';

var util = require('util');

function concoctFrom(input, toBeReplaced, replacement) {
  // escape necessary characters for proper eval later
  var concoction = input; // = input.replace(/\\/g, '\\').replace(/"/g, '\"');

  // replace modulePrefix with placeholder pattern
  var re = new RegExp(toBeReplaced, 'g');
  concoction = concoction.replace(re, replacement);

  return concoction;
}

module.exports = {
  name: 'ember-cli-make-concoction',
  postBuild: function(result) {
    // only do this step if production build
    if (process.env.EMBER_ENV === 'production') {
      // based on convention is that root dir name is modulePrefix
      // this will break if that is not case
      var modulePrefix = path.basename(this.project.root);
      var buildDirPath = result.directory;
      var assetsDirPath = path.join(buildDirPath, '/assets/');

      // assumes one matching file
      var inputFile = glob.sync(path.join(assetsDirPath, modulePrefix + '-*.js'))[0];
      var appCode = fs.readFileSync(inputFile, {encoding: 'utf8'});

      var outputFilePath = path.join(this.project.root, modulePrefix + '-concoction.txt');
      var concoction = concoctFrom(appCode, modulePrefix, prefixReplacement);
      fs.writeFileSync(outputFilePath, concoction);

      console.log('\nSuccessfully made ' + modulePrefix + ' concoction as ' + outputFilePath);
    }
  }
};

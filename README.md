# Ember-cli-make-concoction

This very simple add-on will add a postBuild step for production that will
output a [your-app-modulePrefix]-concoction.txt file in the root of your
ember-cli directory that replaces your app's modulePrefix with
PREFIX_PATTERN.

## Why is this useful?

If you want to make have an Ember.js app that becomes the basis for creating
multiple instances of an app, say having it appears multiple separate times on
a page, you can create a "concoction" that acts as a template for spinning up a
new Ember.js app instance. E.g. using Ember.js for embeddable third party widgets.

You can find background here:

http://discuss.emberjs.com/t/how-to-have-multiple-instances-of-an-app-in-same-window/6733

You'll also need a corresponding loader script that will replace PREFIX_PATTERN
with your unique instance's new modulePrefix. This is the hard part. Example
code to come, in the mean time you can email me if you have questions
(wm -a t- waltermcginnis dot com).

## Installation

    npm install --save-dev ember-cli-make-concoction

## Usage

When ever you do a "ember build -e production" the postBuild step to make a
concoction will be triggered.

Then copy this file to wherever your loader script expects it.

You'll also need to move your app's other built assets, except
assets/[your-app]-[cache-string].js file, relative to where your loader spins
up your instance of your Ember.js app.

This is hightly dependent on your loader scripts set up. When I have a good
generic example, I'll share it here. Email me if you have questions.

## Tests

There are no tests at this time! My excuse is that I'm not sure how to test the
results of postBuild step in an ember-cli add-on. Advice or a pull request welcome!

## Credits

Originally developed by Walter Mcginnis (https://github.com/walter).

This ember-cli add-on was built as a part of widget work for http://askthem.io.

It's based on code from https://gist.github.com/novaugust/9d0133588fc29844afaf
and https://github.com/heyjinkim/ember-cli-index-fragment/blob/master/index.js.
Thanks to the Ember.js, ember-cli, and Broccoli teams for excellent work.

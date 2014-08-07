var randomWord = Meteor.require('random-words');

points = new Meteor.Collection('pointsCollection');

Meteor.publish('pointsSubscription', function () {
  return points.find();
});

Meteor.methods({
  'clear': function () {
    points.remove({});
  },
  'getWord': function(callback) {
  	return randomWord()
  }
});

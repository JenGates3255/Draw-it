Accounts.ui.config({
   passwordSignupFields: 'USERNAME_AND_EMAIL'
});

points = new Meteor.Collection('pointsCollection');
var canvas;

var currentWord = ''
var changeWord = function() {
  Meteor.call('getWord', function(err, word) {
    currentWord = word
    $('.word').text(currentWord)
    console.log(currentWord)
  })  
}


// When turn changes call the above function with changeWord()

// Use session.set to make something reactive
// session.get to retrieve value







// Canvas code below
// =========================================================s
Deps.autorun( function () {
  Meteor.subscribe('pointsSubscription');
});

Meteor.startup( function() {
  canvas = new Canvas();

  Deps.autorun( function() {
    var data = points.find({}).fetch();
    $('h2').hide();
    if (canvas) {
      canvas.draw(data);
    }
  });
});

Template.drawingSurface.title = function () {
  return 'Draw with Me! (A Collaborative, Real-Time Drawing Environment) Works best in Chrome.';
}

Template.drawingSurface.events({
  'click input': function (event) {
    console.log('hello')
    Meteor.call('clear', function() {
      canvas.clear();
    });
  }
})

var markPoint = function() {
  var offset = $('#canvas').offset();
      points.insert({
      x: (event.pageX - offset.left),
      y: (event.pageY - offset.top)});
}

Template.canvas.events({
  'click': function (event) {
    markPoint();
  },
  'mousedown': function (event) {
    Session.set('draw', true);
  },
  'mouseup': function (event) {
    Session.set('draw', false);
  },
  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint();
    }
  }
});

var countDown = function(){
  
}

// When document loads
$(document).on('ready', function() {

  $('.newWord').on('click', function(){
    console.log('click')
    changeWord()
  })
  
});


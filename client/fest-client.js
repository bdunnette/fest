Template.projects.events = {
  'click button.new-project': function () {
    Meteor.call('createProject', function(err, response) {
      Router.go('project', {_id: response});
    });
  },
};

Router.map(function() {
  this.route('projects', {
    path: '/',
    waitOn: function () {
      return Meteor.subscribe('projects');
    },
    data: function () {
      return Projects.find();
    },
  });
  
  this.route('project', {
    path: '/p/:_id',
    waitOn: function () {
      var projectId = this.params._id;
      return [Meteor.subscribe('projects', projectId)];
    },
    data: function () {
      _id = this.params._id;
      var project = Projects.findOne({_id: this.params._id});
      return {poll: project};
    },
  });
})

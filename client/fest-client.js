Template.projects.events = {
  'click button.new-project': function () {
    Meteor.call('createProject', function(err, response) {
      Router.go('project', {_id: response});
    });
  },
};

Template.project.rendered = function() {
    if (Meteor.userId()) {
      $('#projectTitle').attr("contenteditable", true);
      this._editor = new Pen('#projectSummary');
    }
};

Template.project.destroyed = function () {
  this._editor.destroy();
};

Template.project.events = {
    
  'blur #projectTitle': function () {
    var newTitle = $('#projectTitle').text();
    Projects.update(this.project._id, { $set: {title: newTitle}});
  },
  
  'blur #projectSummary': function () {
    console.log($('#projectSummary'));
    var newSummary = $('#projectSummary')[0].innerHTML;
    Projects.update(this.project._id, { $set: {summary: newSummary}});
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
      return {project: project};
    },
  });
})

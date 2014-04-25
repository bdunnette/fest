Meteor.startup(function () {
});

Meteor.publish('projects', function(pollId) {
  return Projects.find(); 
});

Meteor.methods({
    createProject: function () {
        var defaultProject = {
          owner: this.userId,
          title: "New Project",
          summary: "Enter a description of your project _here_.",
        };
        var newProject = Projects.insert(defaultProject);
        console.log(newProject);
        return newProject;
    },

});


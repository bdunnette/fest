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
        };
        var newProject = Projects.insert(defaultProject);
        console.log(newProject);
        return newProject;
    },

});
Projects = new Meteor.Collection("projects");

Projects.allow({
  update: function (userId, doc, fields, modifier) {
    return userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.owner === userId;
  },
  fetch: ['owner']
});
Expenses = new Mongo.Collection("expenses");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    expenses: function(){
      return Expenses.find({});
    }
  });
}

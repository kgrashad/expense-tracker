Expenses = new Mongo.Collection("expenses");

if (Meteor.isServer) {

  // This code only runs on the server
  Meteor.publish("expenses", function () {
    return Expenses.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("expenses");

  // This code only runs on the client
  Template.body.helpers({
    expenses: function(){
      return Expenses.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-expense": function (event) {
      // Prevent default browser form submit
      event.preventDefault();

      // Get value from form element
      var target = event.target,
          text = target.text.value,
          category = target.category.value,
          value = target.value.value;

      // Insert an expense into the collection
      Meteor.call("addExpense", text, category, value);

      // Clear form
      event.target.text.value = "";
      event.target.category.value = "";
      event.target.value.value = "";
    }
  });

  Template.expense.events({
    "click .delete": function () {
      Meteor.call("deleteExpense", this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

Meteor.methods({
 addExpense: function (text, category, value) {
   // Make sure the user is logged in before inserting an expense
   if (! Meteor.userId()) {
     throw new Meteor.Error("not-authorized");
   }

   Expenses.insert({
     text: text,
     category: category,
     value: value,
     createdAt: new Date(),
     owner: Meteor.userId(),           // _id of logged in user
     username: Meteor.user().username  // username of logged in user
   });
 },
 deleteExpense: function (expenseId) {
   Expenses.remove(expenseId);
 }
});

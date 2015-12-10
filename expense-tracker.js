Expenses = new Mongo.Collection("expenses");

if (Meteor.isClient) {
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
      Expenses.insert({
        text: text,
        category: category,
        value: value,
        createdAt: new Date(),
        owner: Meteor.userId(),           // _id of logged in user
        username: Meteor.user().username  // username of logged in user
      });

      // Clear form
      event.target.text.value = "";
      event.target.category.value = "";
      event.target.value.value = "";
    }
  });

  Template.expense.events({
    "click .delete": function () {
      Expenses.remove(this._id);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

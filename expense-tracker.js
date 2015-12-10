if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    expenses: [
      { text: "My first expense", category: "food", value: 10 },
      { text: "My first expense", category: "sports", value: 100 },
      { text: "My third expense", category: "education", value: 50 }
    ]
  });
}

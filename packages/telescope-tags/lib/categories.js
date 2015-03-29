// category schema
categorySchema = new SimpleSchema({
  name: {
    type: String,
    label:'Title',
    autoform: {
      rows: 3
    }
  },
  // title: {
  //   type: String,
  //   optional: false,
  //   autoform: {
  //     rows: 3
  //   }
  // }
  // ,
  // order: {
  //   type: Number,
  //   optional: true
  // },
  slug: {
    type: String,
    optional: true,
    autoform: {
    }
  }
});

Categories = new Meteor.Collection("categories");
Categories.attachSchema(categorySchema);

Categories.before.insert(function (userId, doc) {
  // if no slug has been provided, generate one
  if (!doc.slug)
    doc.slug = userId;
});

// category post list parameters
viewParameters.category = function (terms) {
  var categoryId = Categories.findOne({slug: terms.category})._id;
  return {
    find: {'categories': {$in: [categoryId]}} ,
    options: {sort: {sticky: -1, score: -1}} // for now categories views default to the "top" view
  };
}

Meteor.startup(function () {
  Categories.allow({
    insert: function () {
    return true;
},
    update: function () {
    return true;
},
    remove: function () {
    return true;
}
  });

  Meteor.methods({
    submitCategory: function(category){
      console.log(category)
      // if (!Meteor.user() || !isAdmin(Meteor.user()))
      //   throw new Meteor.Error(i18n.t('you_need_to_login_and_be_an_admin_to_add_a_new_category'));
      var categoryId=Categories.insert(category);
      return category.name;
    }
  });
});

getPostCategories = function (post) {
  return !!post.categories ? Categories.find({_id: {$in: post.categories}}).fetch() : [];
}

getCategoryUrl = function(slug){
  return getSiteUrl()+'list/'+slug;
};

// add callback that adds categories CSS classes
postClassCallbacks.push(function (post, postClass){
  var classArray = _.map(getPostCategories(post), function (category){return "category-"+category.slug});
  return postClass + " " + classArray.join(' ');
});
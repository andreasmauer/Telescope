AutoForm.hooks({
  submitPostForm: {

    before: {
      submitPost: function(doc) {


        this.template.$('button[type=submit]').addClass('loading');

        // var post = doc;

        // ------------------------------ Checks ------------------------------ //

        if (!Meteor.user()) {
          flashMessage(i18n.t('you_must_be_logged_in'), 'error');
          return false;
        }

        // ------------------------------ Callbacks ------------------------------ //

        // run all post submit client callbacks on properties object successively
        post = postSubmitClientCallbacks.reduce(function(result, currentFunction) {
            return currentFunction(result);
        }, post);

        return post;
      }
    },

    onSuccess: function(operation, post) {
      var url = post.url;
      console.log("post._id: " + post._id);

      //http://www.immobilienscout24.de/expose/80406801?referrer=RESULT_LIST_LISTING&navigationServiceUrl=%2FSuche%2Fcontroller%2FexposeNavigation%2Fnavigate.go%3FsearchUrl%3D%2FSuche%2FS-T%2FWohnung-Miete%2FUmkreissuche%2FBerlin%2F-%2F229459%2F2511140%2F-%2F1276003001%2F50%2F5%2C00-%26exposeId%3D80406801&navigationHasPrev=true&navigationHasNext=true&navigationBarType=RESULT_LIST&searchId=d91770c6-e7c7-37fd-8b68-6761317ea12e&resultListPosition=2
      expose_id = url.split("/expose/");
      expose_id = expose_id[1];
      expose_id = expose_id.split("?");
      expose_id = expose_id[0];
      console.log("expose_id: " + expose_id);


      // if url is correct
      Meteor.call('get_expose_data', expose_id, post._id);


      this.template.$('button[type=submit]').removeClass('loading');
      trackEvent("new post", {'postId': post._id});
      Router.go('post_page', {_id: post._id});
      if (post.status === STATUS_PENDING) {
        flashMessage(i18n.t('thanks_your_post_is_awaiting_approval'), 'success');
      }
    },

    onError: function(operation, error) {
      this.template.$('button[type=submit]').removeClass('loading');
      flashMessage(error.message.split('|')[0], 'error'); // workaround because error.details returns undefined
      clearSeenMessages();
      // $(e.target).removeClass('disabled');
      if (error.error == 603) {
        var dupePostId = error.reason.split('|')[1];
        Router.go('post_page', {_id: dupePostId});
      }
    }

  }
});
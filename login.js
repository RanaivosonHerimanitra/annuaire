if (Meteor.isClient) {
  Router.route('/login', {
   waitOn: function(){
       return  false
   },
   action: function() {
    if ( this.ready() ) {
        this.render();
    } 
  }
});
  Template.login.events ({
    'click #home-button': function  (e,t) {
      Router.go('/');
    },
    'click #my-inscription': function  (e,t) {
      Router.go('/login');

    }
  })
}

if (Meteor.isServer) {
  





}
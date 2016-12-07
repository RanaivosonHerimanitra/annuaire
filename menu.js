if (Meteor.isClient) {
    
  Session.set('searchQuery', null)
  Session.set('which_language',"Francais")
  
	Template.menu.events ({
    'click #mylanguage': function(e,t) {
      console.log(e.target.text)
       if ( e.target.text =="English")
       {
        Session.set('which_language','Francais')
         $('#mylanguage').html('Francais')
       } else {
         Session.set('which_language',"English")
         $('#mylanguage').html('English')
       }
       
    },
    'click #send-email': function (e,t)  {
      e.preventDefault();
       var link = "mailto:annuaire@pro-mada.com"
             + "?cc=myCCannuaire@pro-mada.com"
             + "&subject=" + escape(document.getElementById('Sujet').value)
             + "&body=" + escape(document.getElementById('message').value)
    ;

    window.location.href = link;
    

    },
    'click #my-inscription': function (e,t) {
      var mydata = Corporation.find({repondant:Meteor.userId()})
      if (mydata.count()===0 ) {
         //nothing to do:
      } else {
         var mystep=Corporation.find(
                                   {repondant:Meteor.userId()}
                                  ).map( function(u) { return u.step; } );
         Session.set(mystep[0],1 )
         var array_sessions = ['go_step1','go_step2','go_step3','go_step3_a','go_step3_b',
                                'go_step3_c','go_step3_d','go_step3_e','go_step3_f','go_step4',
                                'go_step5','go_step6','go_step6','go_step7','go_step8','go_step9',
                                'go_step10','go_step11','go_step12','go_step13','go_step14','go_step15']
         for (j=1;j<=array_sessions.length;j++) {
             if ( array_sessions[j] === mystep[0] ) {
                //nothing to do
             } else {
                Session.set(array_sessions[j],0)
             }
         }
      }

    },
    'click #launch_search'	: function (e,t)
        {
        	e.preventDefault();
        	Router.go('/mysearch')

        }
});
  Template.menu.helpers ({
     change_language: function () {

       return Session.get('which_language')=='English';
     },
     usermail: function() {
	   return Meteor.user().emails[0].address
     },
     inscription_finished: function () {
       var mystep=Corporation.find(
                                   {repondant:Meteor.userId()}
                                  ).map( function(u) { return u.step; } );
       if (mystep[0]==="finished") {
          return true
       } else {
          return false
       }

     }
   })
}

if (Meteor.isServer) {
  
//publish depending on the query search of the user
//Meteor.publish("search-corporation", getSearchResult);

 Meteor.startup(function () {  
   Corporation._ensureIndex({_id:1,Name: "text",repondant:1});
}); 

        
//external link
Router.route('/pro-mada', {where: 'server'}).get(function() {
    this.response.writeHead(302, {
         'Location': "pro-mada.com"
    });
    this.response.end();
});

}

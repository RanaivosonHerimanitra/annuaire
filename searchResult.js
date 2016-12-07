
Historicalsearch = new Mongo.Collection('historicalsearch');
Historicalsearch.allow({
  insert: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});

Router.onBeforeAction("loading");
Router.configure({
  loadingTemplate: "loading"
});

if (Meteor.isClient) {
 Session.set('searchQuery', null)
  Template.mysearch.onCreated(function () {
     var self = this;
     self.autorun(function () {
         self.subscribe("search-corporation", Session.get("searchQuery"));
     });
  });

     Template.mysearch.events ({
         'click #displayed_name': function (event,t)
         {
          var xscale = d3.scale.linear().range([0,250])
          var yscale = d3.scale.linear().range([0,250])
          var mydata=Historicalsearch.find(
                                   {Name: event.target.text }
                                  ).map( function(u) { return u.CA_annuel; } );
          var min = d3.min(mydata, function(d) { return d.annee  })
          var max = d3.max(mydata, function(d) { return d.annee })
          console.log('le max est:',max)
          console.log('le min est:',min)

         },
         'click #home-button': function  (e,t) {
           Router.go('/');
         },
         'click #my-inscription': function  (e,t) {
           Router.go('/completeProfile');

         },

        'click #launch_search1'  : function (e,t)
          {
            if ( Historicalsearch.find().count() >0 )
            {
              Meteor.call('remove_search_history')
            }
            Session.set('searchQuery', $('#myquery1').val() )
            Router.go('/mysearch')


            Meteor.call('search_from_esaws', $('#myquery1').val(), function(err,res){
                if (!err) {
                  console.log(res["count"].count)
                      Session.set('search_from_esaws_result', res["count"].count);

                      if ( res["count"].count>10 )
                      {
                      for (j=0;j<10;j++)
                      {

                        Historicalsearch.insert ({
                                repondant:Meteor.userId(),
                                ACTPR:res["response"].hits.hits[j]['_source'].ACTPR,
                                FJ:res["response"].hits.hits[j]['_source'].FJ,
                                MainActivity:res["response"].hits.hits[j]['_source'].MainActivity,
                                Name:res["response"].hits.hits[j]['_source'].Name,
                                adresse_siege:res["response"].hits.hits[j]['_source'].adresse_siege,
                                nom_resp:res["response"].hits.hits[j]['_source'].nom_resp,
                                CA_annuel:res["response"].hits.hits[j]['_source'].CA_annuel
                        })
                      }
                      } else {
                      for (j=0;j<res["count"].count;j++)
                        {
                        Historicalsearch.insert ({
                                repondant:Meteor.userId(),
                                ACTPR:res["response"].hits.hits[j]['_source'].ACTPR,
                                FJ:res["response"].hits.hits[j]['_source'].FJ,
                                MainActivity:res["response"].hits.hits[j]['_source'].MainActivity,
                                Name:res["response"].hits.hits[j]['_source'].Name,
                                adresse_siege:res["response"].hits.hits[j]['_source'].adresse_siege,
                                nom_resp:res["response"].hits.hits[j]['_source'].nom_resp,
                                CA_annuel:res["response"].hits.hits[j]['_source'].CA_annuel
                        })
                      }

                      }

                } else
                {
                 Session.set('search_from_esaws_result', {error: err})
                }

            });
          }
  });
    Template.mysearch.helpers ({
        change_language: function () {
           return Session.get('which_language')=='English';
        },
        myresult: function () {
               return Historicalsearch.find({repondant:Meteor.userId()})
        },
        myquery: function () {
          return Session.get('searchQuery')
        },
        num_res: function () {
          return Session.get('search_from_esaws_result')
        },
         usermail: function() {
           return Meteor.user().emails[0].address
         }
   })

//
Router.route('/mysearch', {
  
});

} //end of isClient

if (Meteor.isServer) {
 Meteor.startup(function () {
});

}

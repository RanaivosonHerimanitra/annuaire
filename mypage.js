
Annonce = new Mongo.Collection('annonce');

Annonce.allow ({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});

if ( Meteor.isClient ) {  
  
   Session.set('cv_clicked_val',false)
   Session.set('default_page',true)
   Session.set('myrenseignement',false)      
   Meteor.subscribe('mycorporation')
   Template.mypage.helpers ({
        cv_clicked: function () {
           return Session.get('cv_clicked_val')
        },
         default_page: function () {
           return  Session.get('default_page') 
         },
         myrenseignement: function () {
           return  Session.get('myrenseignement') 
         },
         mydata: function () {
                return Corporation.find();
         },
         myannonce: function () {
                return Annonce.find({},{sort:{createdAt:-1}})
         }
    });
	Meteor.subscribe('annonce');

          $(document).ready(function(){$(".alert").addClass("in").fadeOut(4500);
          /* swap open/close side menu icons */
          $('[data-toggle=collapse]').click(function(){
  	               // toggle icon
  	               $(this).find("i").toggleClass("glyphicon-chevron-right glyphicon-chevron-down");
          });





Template.mypage.events ({
  'click #ren_cv': function (e,t) {
          Session.set('cv_clicked_val',true)
  },
  'click #vos_annonce': function (e,t) {
     Session.set('default_page',true)
     Session.set('myrenseignement',false) 
  },
  'click #ren_generaux': function (e,t) {
     Session.set('default_page',false)
     Session.set('myrenseignement',true) 
      $('li#tab_gen').addClass('active');
       $('li#tab_cial').removeClass('active')
       $('li#tab_rh').removeClass('active');
       $('li#tab_fin').removeClass('active')


       $('#rg').attr('class','tab-pane active well');
       $('#rf').attr('class','tab-pane well')
       $('#rh').attr('class','tab-pane well');
       $('#rcial').attr('class','tab-pane well')
     
  },
  'click #ren_ciaux': function (e,t) {
     Session.set('default_page',false)
     Session.set('myrenseignement',true) 
      $('li#tab_gen').removeClass('active');
       $('li#tab_cial').addClass('active')
       $("div #rcial").trigger("click");
       $('li#tab_rh').removeClass('active');
       $('li#tab_fin').removeClass('active')

          $('#rg').attr('class','tab-pane well');
       $('#rf').attr('class','tab-pane well')
       $('#rh').attr('class','tab-pane well');
       $('#rcial').attr('class','tab-pane active well')
  },
  'click #ren_fin': function (e,t) {
     Session.set('default_page',false)
     Session.set('myrenseignement',true) 
      $('li#tab_gen').removeClass('active');
       $('li#tab_cial').removeClass('active')
       $('li#tab_rh').removeClass('active');
       $('li#tab_fin').addClass('active')
       

         $('#rg').attr('class','tab-pane well');
       $('#rf').attr('class','tab-pane active well')
       $('#rh').attr('class','tab-pane well');
       $('#rcial').attr('class','tab-pane well')
  },
  'click #ren_rh': function (e,t) {
     Session.set('default_page',false)
     Session.set('myrenseignement',true) 
       $('li#tab_gen').removeClass('active');
       $('li#tab_cial').removeClass('active')
       $('li#tab_rh').addClass('active');
        
       $('li#tab_fin').removeClass('active')

         $('#rg').attr('class','tab-pane well');
       $('#rf').attr('class','tab-pane well')
       $('#rh').attr('class','tab-pane active well');
       $('#rcial').attr('class','tab-pane well')
  },
  'click #ren_cv': function (e,t) {
     Session.set('default_page',false)
     Session.set('myrenseignement',true) 
  },
  'click #ren_projet': function (e,t) {
     Session.set('default_page',false)
     Session.set('myrenseignement',true) 
  },
  'click #publish': function (e,t) {
  	var myname = Corporation.find(
                                   {repondant:Meteor.userId()}
                                  ).map( function(u) { return u.NOM; } )

  	Annonce.insert ({
  		repondant:Meteor.userId(),
  		createdAt: Date.now(),
  		corps_annonce: $('#my-annonce').val(),
  		type_annonce: $('#type_annonce').val(),
      nb_postulant:0,
  		NOM: myname
  	});
  	$('#my-annonce').val('');
  	$('#type_annonce').val('');
  },
  'click .postuler': function (e,t) {
    //le postulant ne peut être égal à l'annonceur:
    var postulant_id =Annonce.find(
                                   {repondant:Meteor.userId()}
                                  ).map( function(u) { return u._id; } )
    console.log(postulant_id)

     Annonce.findAndModify ({
        query: { $and : [ {_id:this._id},{_id: {$nin: postulant_id } } ] },
       update: {$inc : {nb_postulant:1} }
    });

  }
});


});

}

if ( Meteor.isServer ) {
  Meteor.publish('mycorporation',function () {
           return Corporation.find({repondant:this.userId})
  });
	Meteor.publish('annonce', function () {
          return Annonce.find()
	});
}
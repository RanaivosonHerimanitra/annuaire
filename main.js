//database for corporation:
Corporation = new Mongo.Collection('corporation');

//database for product PHOTOS:
Photoproducts= new FS.Collection('Photoproducts', {
	stores: [new FS.Store.GridFS('Photoproducts')]
});
//database for CV of individuals:
var pdfStore = new FS.Store.GridFS("pdf");
CVstorage = new FS.Collection("CVstorage", {
    stores: [pdfStore],
    filter: {
        maxSize: 50485760, //in bytes
        allow: {
            contentTypes: ['application/pdf'],
            extensions: ['pdf']
        },
        onInvalid: function (message) {
            if(Meteor.isClient){
                alert(message);
            } else{
                console.warn(message);
            }
        }
    }
});
// CVstorage= new FS.Collection('CVstorage', {
//   stores: [new FS.Store.GridFS('CVstorage')]
// });
Clients = new Mongo.Collection('clients');
Fournisseurs = new Mongo.Collection('fournisseurs');
Gammeproduits= new Mongo.Collection('gammeproduits');
Concurrents= new Mongo.Collection('concurrents');

CVstorage.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});

Photoproducts.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});
Corporation.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  }
});
Concurrents.allow({
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
Clients.allow({
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
Gammeproduits.allow({
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
Fournisseurs.allow({
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
//configuration initiale
Router.configure({
    layoutTemplate: 'main'
});
//Template de la page d'accueil
Router.route('/', {
    name: 'menu',
    template: 'menu'
});

//Toutes les routes vers les différentes pages/formulaires/query du site web
Router.route('/completeProfile');
Router.route('/readfileorders');
Router.route('/mypage');


if (Meteor.isClient) {
	Meteor.subscribe('historicalsearch')
  Meteor.subscribe('gammeproduits')
  Meteor.subscribe('fournisseurs')
  Meteor.subscribe('concurrents')
  Meteor.subscribe('clients')
 
}

if (Meteor.isServer) {
   
	 Meteor.publish('historicalsearch',function () {
          return Historicalsearch.find();
    });
  Meteor.publish('gammeproduits',function () {
          return Gammeproduits.find();
    });
  Meteor.publish('fournisseurs',function () {
          return Fournisseurs.find();
    });
  Meteor.publish('concurrents',function () {
          return Concurrents.find();
    });
  Meteor.publish('clients',function () {
          return Clients.find();
    });
  
  Meteor.startup(function () {  
  //Corporation._ensureIndex({_id:1,Name: "text",repondant:1});

});
}

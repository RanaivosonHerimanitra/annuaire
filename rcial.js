if ( Meteor.isClient ) {
	Template.rcial.helpers ({
		mydata_edit: function () {
			return Corporation.find({repondant:Meteor.userId()})
		},
    societe: function () {
      var mytype = Corporation.find(
                                   {repondant:Meteor.userId()}
                                  ).map( function(u) { return u.type_societe; } )
      if (mytype[0]===1) {
        return true
      } else {
        return false
      }

    }
	});
	Template.rcial.events ({
       'blur #nom_produit': function (event,target) {
       var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id    
             Corporation.update ({ _id: myid},
             	{$addToSet: 
                                  { 
                                    gamme : {
                                      nom_produit: val
                                     }             
                                  }
                                  } 
             );  
       },
       'blur #marque_produit': function (event,target) {  
       var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id  
             Corporation.update ({ _id: myid},
             	{$addToSet: 
                                  { 
                                    gamme : {
                                      marque_produit: val
                                     }             
                                  } 
                                }
             );  
       },
       'blur #prix_produit': function (event,target) { 
       var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id   
             Corporation.update ({ _id: myid},
             	{$addToSet: 
                                  { 
                                    gamme : {
                                      prix_produit: val
                                     }             
                                  }
                                  } 
             );  
       },
       'blur #nom_fournisseur': function (event,target) {
        var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
                   Corporation.update 
                        ( 
                                { _id: myid },
                                {
                                  $addToSet: 
                                  { 
                                    fournisseur : {
                                      nom_fournisseur: val
                                      
                                     
                                     }             
                                  } 
                                } 
                        )
       },
       'blur #prct_achat_fournisseur': function (event,target) {
        var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
                   Corporation.update 
                        ( 
                                { _id: myid },
                                {
                                  $addToSet: 
                                  { 
                                    fournisseur : {
                                     
                                      prct_achat_fournisseur: val
                                     
                                     
                                     }             
                                  } 
                                } 
                        )
       },
       'blur #produit_fourni': function (event,target) {
        var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
                   Corporation.update 
                        ( 
                                { _id: myid },
                                {
                                  $addToSet: 
                                  { 
                                    fournisseur : {
                                     
                                      produit_fourni: val
                                     
                                     }             
                                  } 
                                } 
                        )
       },
       'blur #nom_concurrent': function (event,target) {
        var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
                   Corporation.update 
                        ( 
                                { _id: myid },
                                {
                                  $addToSet: 
                                  { 
                                    concurrent : {
                                      nom_concurrent: val
                                      
                                      
                                     }             
                                  } 
                                } 
                        )
       },
       'blur #marketshare_concurrent': function (event,target) {
        var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
                   Corporation.update 
                        ( 
                                { _id: myid },
                                {
                                  $addToSet: 
                                  { 
                                    concurrent : {
                                     
                                      marketshare_concurrent: val
                                     
                                      
                                     }             
                                  } 
                                } 
                        )
       },
       'blur #produit_fourni_concurrent': function (event,target) {
        var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
                   Corporation.update 
                        ( 
                                { _id: myid },
                                {
                                  $addToSet: 
                                  { 
                                    concurrent : {
                                     
                                      produit_fourni_concurrent: val
                                      
                                     }             
                                  } 
                                } 
                        )
       },
       'blur #nom_client': function (event,target) {
        var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id

          Corporation.update 
                        ( 
                                { _id: myid },
                                {
                                  $addToSet: 
                                  { 
                                    client : {
                                      nom_client: val                                   
                                     }             
                                  } 
                                } 
                        )

},
       'blur #prct_vente_client': function (event,target) {
        var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id

          Corporation.update 
                        ( 
                                { _id: myid },
                                {
                                  $addToSet: 
                                  { 
                                    client : {
                                      prct_vente_client: val
                                      
                                     }             
                                  } 
                                } 
                        )

},
     'blur #lieu_exploitation': function (event,target) {
      var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
         Corporation.update ({_id: myid},{$set:{lieu_exploitation:val}})
     },
     'blur #adresse_lieu_exploitation': function (event,target) {
      var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
      Corporation.update ({_id: myid},{$set:{adresse_lieu_exploitation:val}})

     },
     'blur #agence': function (event,target) {
      var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
      Corporation.update ({_id: myid},{$set:{agence:val}})

     },
     'blur #adresse_agence': function (event,target) {
      var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
      Corporation.update ({_id: myid},{$set:{adresse_agence:val}})
      
     },
     'blur #bureau': function (event,target) {
      var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
      Corporation.update ({_id: myid},{$set:{bureau:val}})
      
     },
     'blur #adresse_bureau': function (event,target) {
      var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
      Corporation.update ({_id: myid},{$set:{adresse_bureau:val}})
      
     },
     'blur #nom_resp_cial': function (event,target) {
      var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
      Corporation.update ({_id: myid},{$set:{nom_resp_cial:val}})
      
     },
     'blur #phone_resp_cial': function (event,target) {
      var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
      Corporation.update ({_id: myid},{$set:{phone_resp_cial:val}})
      
     },
     'blur #fonction_resp_cial': function (event,target) {
      var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
      Corporation.update ({_id: myid},{$set:{fonction_resp_cial:val}})
      
     },
     'blur #email_resp_cial': function (event,target) {
      var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
      Corporation.update ({_id: myid},{$set:{email_resp_cial:val}})
      
     },
     'blur #lien_website': function (event,target) {
      var val = $(event.target).val()
      var z= Corporation.find({_id: myid}).fetch()
            var myid=z[0]._id
      Corporation.update ({_id: myid},{$set:{lien_website:val}})
     }
	});
}
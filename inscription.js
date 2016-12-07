
 if (Meteor.isClient) {
   

    Session.set('myclickNewClient',1)
    Session.set('myclickNewProductsConcurrent',1)
    Session.set('myclickNewConcurrent',1)
    Session.set('myclickNewFournisseur',1)
    Session.set('myclickNewProductsFourni',1)
    Session.set('myclickNewGamme', 1);
    Session.set('myclickNewProducts', 0);
    Session.set('go_step1',1);
    Session.set('go_step2',0);
    Session.set('go_step3',0);
    Session.set('go_step3_a',0);
    Session.set('go_step3_b',0);
    Session.set('go_step3_c',0);
    Session.set('go_step3_d',0);
    Session.set('go_step3_e',0);
    Session.set('go_step3_f',0);
    Session.set('go_step4',0);
    Session.set('go_step5',0);
    Session.set('go_step6',0);
    Session.set('go_step7',0);
    Session.set('go_step8',0);
    Session.set('go_step9',0);
    Session.set('go_step10',0);
    Session.set('go_step11',0);
    Session.set('go_step12',0);
    Session.set('go_step13',0);
    Session.set('go_step14',0);
    Session.set('go_step15',0);

    Template.CompleteProfile.helpers ({
      change_language: function () {
           return Session.get('which_language')=='English';
       },
       mycount: function () {
          return Session.get("myclickNewGamme")
       },
      myclient: function () {
          return Clients.find();
       },
       myconcurrent: function () {
          return Concurrents.find();
       },
        myfournisseur : function () {
          return Fournisseurs.find();
        },
        mygammeproduits: function () {
          return Gammeproduits.find();
        },
        step1: function () {
          return Session.equals('go_step1',1);
        },
        step2: function () {
          return Session.equals('go_step3',1);
        },
        step3: function() {
          return Session.equals('go_step4',1);
        },
        step3_a: function () {
          return Session.equals('go_step3_a',1);
        },
        step3_b: function () {
          return Session.equals('go_step3_b',1);
        },
        step3_c: function () {
          return Session.equals('go_step3_c',1);
        },
        step3_d: function () {
          return Session.equals('go_step3_d',1);
        },
        step3_e: function () {
          return Session.equals('go_step3_e',1);
        },
        step3_f: function () {
          return Session.equals('go_step3_f',1);
        },
        step4: function() {
          return Session.equals('go_step5',1);
        },
        step5: function() {
          return Session.equals('go_step6',1);
        },
        step6: function() {
          return Session.equals('go_step7',1);
        },
        step7: function() {
          return Session.equals('go_step8',1);
        },
        step8: function() {
          return Session.equals('go_step9',1);
        },
        step9: function() {
          return Session.equals('go_step10',1);
        },
        step10: function() {
          return Session.equals('go_step11',1);
        },
        step11: function() {
          return Session.equals('go_step12',1);
        },
        step12: function() {
          return Session.equals('go_step13',1);
        },
        step13: function() {
          return Session.equals('go_step14',1);
        },
        step14: function() {
          return Session.equals('go_step15',1);
        }
  });
// events:

  Template.CompleteProfile.events ({
    'click #home-button': function  (e,t) {
      Router.go('/');
    },
    'click #my-inscription': function  (e,t) {
      Router.go('/login');

    },
    //cannot select the two checkboxes simulatenously:
    'change #type_societe': function (e,t) {
      if ( $('#type_individu').prop('checked')==true) {
        $('#type_individu').prop('checked',false);
      }
    },
    'change #type_individu': function (e,t) {
      if ( $('#type_societe').prop('checked')==true) {
        $('#type_societe').prop('checked',false);
      }
    },
    'click #ajout_produit_fourni': function (e,t) {
      var x= {nom_fournisseur:$('#nom_fournisseur').val(),
              prct_achat_fournisseur:$('#prct_achat_fournisseur').val(),
              produit_fourni:$('#produit_fourni').val()}
      Meteor.call('insert_ajout_produit_fourni',x, function(error,data) {
              if (!error) {
                alert('insertion reussi')
                $('#nom_fournisseur').val('')
                $('#prct_achat_fournisseur').val('')
                $('#produit_fourni').val('')
              } else {
                alert('Erreur insertion!')
              }
      })
      
    },
    'click #ajout_produit_concurrent': function (e,t) {
      var x = {nom_concurrent:$('#nom_concurrent').val(),
               marketshare_concurrent: $('#marketshare_concurrent').val(),
               produit_fourni_concurrent:$('#produit_fourni_concurrent').val()}
      Meteor.call('insert_ajout_produit_concurrent',x, function (error,data) {
           if (!error) {
               alert('insertion réussie!')
               $('#nom_concurrent').val('')
               $('#marketshare_concurrent').val('')
               $('#produit_fourni_concurrent').val('')
           } else {
               alert('insertion échouée!')
           }

      });
     
    },
    
    'click #ajout_client': function (e,t) {
      var x = {nom_client:$('#nom_client').val(),prct_vente_client:$('#prct_vente_client').val()}
      Meteor.call('insert_ajout_client',x,function (error,data) {
        if (!error) {
           alert('ajout de client réussi!')
           $('#nom_client').val('')
           $('#prct_vente_client').val('')
        } else {
           alert ('erreur!')
        }
      });
         
    },
    'click #ajout_concurrent': function (e,t) { 
       var tmp1 = Session.get('myclickNewConcurrent');
       var tmp2 = Session.get('myclickNewConcurrent') + 1;
       Concurrents.insert ({
            x: {nom_concurrent:"concurrent" + tmp2, produits: ["produit"+tmp1]},
            repondant: Meteor.userId()
         })
       Session.set('myclickNewConcurrent',tmp2);
    },
    'click #ajout_fournisseur': function (e,t) { 
       var tmp1 =   Session.get('myclickNewFournisseur');
       var tmp2 = Session.get('myclickNewFournisseur') + 1;
       Fournisseurs.insert ({
            x: {nom_fournisseur:"fournisseur" + tmp2, produits: ["produit"+tmp1]},
            repondant: Meteor.userId()
         })
       Session.set('myclickNewFournisseur',tmp2);
    },
    'click #ajout_produit': function (e,t) {
    
       //insère dans la base si NON vide:
       var tmp1 =   Session.get('myclickNewProducts');
                        var nom_produit= $('[id=nom_produit')[tmp1].value
                        var marque_produit=$('[id=marque_produit')[tmp1].value
                        var prix_produit = $('[id=prix_produit')[tmp1].value
                        var photo_prod = $('[id=photo_produit]').get(tmp1).files[0]
                        
                         console.log("le nom du produit est:"+ nom_produit)
                         console.log("la marque du produit est:"+ marque_produit)
                         console.log("le prix du produit est:"+ prix_produit)

       console.log("Valeur de myclickNewProducts:",tmp1)
       if ( nom_produit && marque_produit && prix_produit ) {
            // si photo NON vide
             if ( photo_prod) {
                    fsFile = new  FS.File(photo_prod)
                    Photoproducts.insert(fsFile, function (error,result) {
                      if (!error) {
                         //index produits à insérer:
                        var myurl = '/cfs/files/Photoproducts/' + result._id
                        console.log(myurl)
                        var z= Corporation.find({repondant:Meteor.userId()}).fetch()
                        var myid=z[0]._id
                        var myquery = {_id:myid }
                        Corporation.update 
                        ( 
                                myquery,
                                {
                                  $addToSet: 
                                  { 
                                    gamme : {
                                      nom_produit: nom_produit,
                                      marque_produit: marque_produit,
                                      prix_produit: prix_produit,
                                      photo_produit: myurl
                                     }             
                                  } 
                                } 
                        )
                        alert('ajout réussi!')
                        $('#nom_produit').val('')
                        $('#marque_produit').val('')
                        $('#prix_produit').val('')
                      } else {
                        alert('erreur insertion!');
                      }
                    });

             } else {
              //si pas de photo:
                        var z= Corporation.find({repondant:Meteor.userId()}).fetch()
                        var myid=z[0]._id
                        var myquery = {_id:myid }
                        Corporation.update 
                        ( 
                                myquery,
                                {
                                  $addToSet: 
                                  { 
                                    gamme : {
                                      nom_produit: nom_produit,
                                      marque_produit: marque_produit,
                                      prix_produit: prix_produit
                                     }             
                                  } 
                                } 
                        )
                        alert('ajout réussi')
                        $('#nom_produit').val('')
                        $('#marque_produit').val('')
                        $('#prix_produit').val('')
             }

         
       } else {
         alert('Les champs doivent être non vides sauf pour la photo, Gamme à sélectionner!')
       }

       
      
    },
    'click #ajout_gamme': function (e,t) {
     
   
    },
     'click #next4' : function  (e,t) {
      //populate gamme & produits
      if (Gammeproduits.find().count() === 0 ) {
         Gammeproduits.insert ({
            x: {  
              nom_gamme:"gamme1", 
              produits: ["produit1"]
               },
            repondant: Meteor.userId()
         })
      } else {
        Gammeproduits.remove({});
      }
     
      var x = {nom_resp:$('#nom_resp').val(),phone_resp:$('#phone_resp').val(),fonction_resp:$('#fonction_resp').val(),
               email_resp:$('#email_resp').val(),capital_social:$("#capital_social").val()}
      Meteor.call('insert_next4',x, function (error,data) {
          if (error) {

          } else {
              Session.set(data.action1,0);
              Session.set(data.action2,1);
          }
     });
      Tracker.flush();
    },
    'click #final_button': function (e,t) {
          var x = {annee:$('#annee').val(),CA:$('#CA').val(),profit:$('#profit').val(),
                   benefice:$('#benefice').val(),revenu_net:$('#revenu_net').val()}
          Meteor.call('insert_final_button',x, function  (error,data) {
            if (!error) {
               alert('Votre inscription est terminée!')
               Router.go('/mypage');
            } else {
              alert('Erreur!')
            }
          });
    },
    'click #next11' : function  (e,t) {
      var x= {nb_dirigeant:$('#nb_dirigeant').val(),
              nb_cadre: $('#nb_cadre').val(),
              nb_employee:$('#nb_employee').val(),
              nb_ouvrier: $('#nb_ouvrier').val(),
              nb_consultant:$('#nb_consultant').val(),
              nb_ouvrier_tmp:$('#nb_ouvrier_tmp').val()
             }
      Meteor.call('insert_next11',x, function (error,data) {
        if (!error) {
          Session.set(data.action1,0);
          Session.set(data.action2,1);
        } else {
          alert('Erreur!')
        }
      });
      Tracker.flush();
    },
  
    'click #next10' : function  (e,t) {
      var x = {dir_exec:$('#dir_exec').val(),phone_dir_exec:$('#phone_dir_exec').val(),
               dir_prod:$('#dir_prod').val(),phone_dir_prod:$('#phone_dir_prod').val(),
               dir_cial:$('#dir_cial').val(),phone_dir_cial:$('#phone_dir_cial').val(),
               drh:$('#drh').val(),phone_drh:$('#phone_drh').val(),
               daf:$('#daf').val(),phone_daf:$('#phone_daf').val(),
               di:$('#di').val(),phone_di:$('#phone_di').val()}
      Meteor.call('insert_next10',x,function (error, data) {
        if (!error) {
          Session.set(data.action1,0);
          Session.set(data.action2,1);
        } else {
          alert('Erreur!')
        }
        
      })
      
      Tracker.flush();
    },

    'click #next9' : function  (e,t) {
      var x = {lieu_exploitation:$('#lieu_exploitation').val(), adresse_lieu_exploitation:$('#adresse_lieu_exploitation').val(),
               agence:$('#agence').val(),adresse_agence: $('#adresse_agence').val(), bureau: $('#bureau').val(),adresse_bureau:$('#adresse_bureau').val(),
               nom_resp_cial:$('#nom_resp_cial').val(), phone_resp_cial:$('#phone_resp_cial').val(),fonction_resp_cial:$('#fonction_resp_cial').val(),
               email_resp_cial:$('#email_resp_cial').val(),lien_website:$('#lien_website').val()}
      Meteor.call ('insert_next9',x, function (error,data) {
        if (!error) {
           Session.set(data.action1,0);
           Session.set(data.action2,1);
        } else {
          alert(error)
        }
      });
      
      Tracker.flush();
    },
   
    'click #next8' : function  (e,t) {
      Session.set('go_step11',0);
      Session.set('go_step12',1);
      Tracker.flush();
    },
   
    'click #next7' : function  (e,t) {
      if (Clients.find().count() === 0 ) {
         Clients.insert ({
            nom: "client1",
            repondant: Meteor.userId()
         })
      } else {
        Clients.remove({});
      }
      Session.set('go_step10',0);
      Session.set('go_step11',1);
      //Tracker.flush();
    },
   
    'click #next6' : function  (e,t) {
      if (Concurrents.find().count() === 0 ) {
         Concurrents.insert ({
            x: {nom_concurrent:"concurrent1", produits: ["produit1"]},
            repondant: Meteor.userId()
         })
      } else {
        Concurrents.remove({});
      }
      Session.set('go_step9',0);
      Session.set('go_step10',1);
      
    },
    
    'click #next5' : function  (e,t) {     
           
     //prepopulate Fournisseurs collections:
      if (Fournisseurs.find().count() === 0 ) {
         Fournisseurs.insert ({
            x: {nom_fournisseur:"fournisseur1", produits: ["produit1"]},
            repondant: Meteor.userId()
         })
      } else {
        Fournisseurs.remove({});
      }
      Session.set('go_step8',0);
      Session.set('go_step9',1);
      Tracker.flush();
    },
   
    
    'click #upload-photo': function (e,t) {
      var myphoto = $('#photo_prod_ref').get(0).files[0]
      //prepare uploading
      if ( myphoto ) {
         fsFile = new  FS.File(myphoto);
         Photoproducts.insert(fsFile, function (error,result) {
            if (!error) {
              var myurl = '/cfs/files/Photoproducts/' + result._id
              console.log(myurl)
              var z= Corporation.find({repondant:Meteor.userId()}).fetch()
              var myid=z[0]._id
              Corporation.update ( { _id: myid },
               {$set: 
                {photo_prod_ref:myurl} 
               }
             )
            }
         });
      } else {
        alert('Ajouter une photo de votre produit de référence!')
      }

    },
    'click #next3' : function  (e,t) {
      var x = {MainActivity:$('#MainActivity').val(),ACTP:$('#ACTP').val(),ACTS:$('#ACTS').val(),
               ref_prod:$('#ref_prod').val(),
               price_prod:$('#price_prod').val()}
      
      Meteor.call('insert_next3',x, function (error,data) {
      if (error) {

      } else {
          Session.set(data.action1,0);
          Session.set(data.action2,1);
      }
     });
      
      Tracker.flush();
    },
    
    'click #next2_c' : function  (e,t) {
      var x = {date_creation:$("#date_creation").val(),num_cartestat:$("#num_cartestat").val(),num_nif:$("#num_nif").val()}
      Meteor.call('insert_next2_c',x, function (error,data) {
          if (error) {

          } else {
               Session.set(data.action1,0);
               Session.set(data.action2,1); 
          }
     });
      Tracker.flush();
    },
    'click #valider_step3_f': function (e,t)  {
     var x = {volontariat_individu:$('#volontariat_individu').val(),individu_stage:$('#individu_stage').val()}
     Meteor.call('insert_valider_step3_f',x, function (error,data) {
      if (error) {

      } else {
        if (data==="success") {
          alert("inscription terminée!")
          Router.go('/mypage');
        }
      }

     });
    },
    'click #valider_step3_e': function (e,t) {
     var x = {employeur:$('#employeur').val(),taches:$('#taches').val(),diplome:$('#diplome').val(),
              certificat:$('#certificat').val(),cv:$('#mycv').val()}
     Meteor.call ('insert_valider_step3_e',x, function (error, data) {
        if (error) {

        } else {
          if (data==="success") {
            alert('inscription terminée')
            Router.go('/mypage')
          }
        }
     });
    },
    'click #next2_b_3': function (e,t) {
      var x = {poste_emploi:$('#poste_emploi').val(),
               competence:$('#competence').val(),
               expertise:$('#expertise').val()
             }
       Meteor.call('insert_next2_b_3', x, function (error,data) {
          if (error) {

          } else {
             Session.set('go_step3_d',0);
             Session.set(data,1);

          }
       })
      Session.set('go_step3_d',0);
      Session.set('go_step3_e',1);
     },
    'click #next2_b_2': function (e,t) {
      var x = $('#emploi').val();
      Meteor.call('insert_next2_b_2', x,function (error,data) {
        if (error ) {

        } else {
             Session.set('go_step3_c',0);
             Session.set(data,1);    
        }
        
      });
     
    },
    
    'click #next2_b_1': function (e,t) {
      var x={titre_projet:$('#titre_projet').val(),phase_idee:$('#phase_idee').val(),
             phase_prototypage:$('#phase_prototypage').val(),besoin_prod:$('#besoin_prod').val(),
             phase_demarrage:$('#phase_demarrage').val(),
             ressource_demarrage_projet:$('#ressource_demarrage_projet').val()
             }
     Session.set('go_step3_a',0);
     Meteor.call('insert_next2_b_1',x, function(error,data) {
           if (error) {
         } else {
             Session.set('go_step3_a',0);
             if ( data==="go_step3_b") {
                   Session.set(data,1)
             } else {
              alert('Incription terminée')
              Router.go('/mypage')
             }
         }
     })
    },
    'click #next2_b' : function (e,t) {
      var x= {cin:$('#cin').val(),porteur:$('#porteur').val()}
      Meteor.call("insert_next2_b",x,function  (error,data) {
        if (error) {
         } else {
           Session.set('go_step4',0);
           Session.set(data,1)
         }
      });
    },
    'click #valider_step3_b': function (e,t) {
       var x = {mode_financement:$('#mode_financement').val(),partie_prenante:$('#partie_prenante').val()}
       Meteor.call("insert_valider_step3_b",x,function  (error,data) {
        if (error) {
         } else {
           if ( data==="success") {
              Router.go('/mypage')
           } else {
              alert('champs obligatoires!');
           }
         }
      });
         
    },
    'click #next2_a' : function  (e,t) {
      var x={FJ:$('#fj').val(),adresse_siege:$('#adresse_siege').val(),tel_siege:$('#tel_siege').val()}
      Meteor.call("insert_next2_a",x, function(error,data) {
         if (error) {
         } else {
             Session.set(data.action1,0);
             Session.set(data.action2,0);
             Session.set(data.action3,1);
         }
      })
      Tracker.flush();
      },
      'click #next1' : function  (e,t) {
      //e.preventDefault();
      var x = {Name:$('#Name').val(),type_individu:$('#type_individu').prop('checked'), type_societe:$('#type_societe').prop('checked')}
      Meteor.call ('insert_next1',x, function (error,data) {
             if (error ) {
             } else { 
                  console.log(data)
                  if (data==="go_step3" || data==="go_step4" ) {
                    Session.set('go_step1',0);
                    Session.set(data,1)
                  } else {
                    alert('Champs incorrects et/ou doublon!')
                  }     
             }                          
      });
      Tracker.flush();
    }
      //Tracker.flush();
         //focusText(t.find("#nom_new_gamme"));
      
  });
}

if (Meteor.isServer) {

Meteor.startup ( function () {
  
})
  

}
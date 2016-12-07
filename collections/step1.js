
 Meteor.methods ({
  'remove_search_history': function() {

        return Historicalsearch.remove({});

      },
   'search_from_esaws': function (myquery) {
    
    this.unblock
    var apiCall = function (apiUrl, callback) {

  // try…catch allows you to handle errors 

  try {

    var response = HTTP.get(apiUrl).data;

    // A successful API call returns no error 

    // but the contents from the JSON response

    callback(null, response);

  } catch (error) {

    // If the API responded with an error message and a payload 

    if (error.response) {

      var errorCode = error.response.data.code;

      var errorMessage = error.response.data.message;

    // Otherwise use a generic error message

    } else {

      var errorCode = 500;

      var errorMessage = 'Cannot access the API';

    }

    // Create an Error object and return it via callback

    var myError = new Meteor.Error(errorCode, errorMessage);

    callback(myError, null);

  }

}
        // Construct the API URL
    var apiUrl1 = 'http://search-pro-mada-search-mmaqhkwxkwttph44tkqtuew5fi.us-west-2.es.amazonaws.com/corporation/_search?q=' + myquery;
    var apiUrl2 = 'http://search-pro-mada-search-mmaqhkwxkwttph44tkqtuew5fi.us-west-2.es.amazonaws.com/_count?q=Name:' + myquery;
    // query the API
    var response = Meteor.wrapAsync(apiCall)(apiUrl1);
    var countresponse = Meteor.wrapAsync(apiCall)(apiUrl2);

    return {"response":response, "count":countresponse};
  },

    
 

   insert_next1 : function (x) {

        if ( x.type_individu === true &&  x.type_societe === false ) {
            if ( Meteor.userId() && x.Name ) {
                  Corporation.insert ({
                     Name: x.Name,
                     type_societe:  0,
                     type_individu:  1,
                     repondant: Meteor.userId(),
                     email_repondant: Meteor.user().emails[0].address,
                     step:"go_step4"
                  })
                 return 'go_step4';

          } else {
                return 'champ obligatoire';
          }
        } // 
        if ( x.type_societe === true && x.type_individu === false ) {
          if ( Meteor.userId() && x.Name ) {
                  Corporation.insert ({
                     Name: x.Name,
                     type_societe:  1,
                     type_individu:  0,
                     repondant: Meteor.userId(),
                     email_repondant: Meteor.user().emails[0].address,
                     step: "go_step3"
                  })
                  return 'go_step3' ;

          } else {
                  return 'champ obligatoire';
          }
        } // 
   
},
insert_next2_a : function (x) {
   //on peut vérifier le numéro:
   var num_len=x.tel_siege.length
   if ( x.FJ && x.adresse_siege && x.tel_siege && num_len===10 ) {
      // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      //then update:
       Corporation.update ( 
          { _id: myid },
               {$set: 
                {
                  FJ:x.FJ,
                  adresse_siege:x.adresse_siege,
                  tel_siege:x.tel_siege,
                  step:"go_step5"
                } 
               }
       )
       return {action1:"go_step3", action2:"go_step4",action3:"go_step5"}      
   }
},
insert_next2_b : function (x) {
      if ( x.porteur && x.cin) {
        // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      if ( x.porteur==="1" ) {
          var mystep="go_step3_a"
      } else {
          var mystep="go_step3_c"
      }
      //then update:
       Corporation.update ( 
          { _id: myid },
               {$set: 
                {porteur:x.porteur,
                  num_cin:x.cin,
                  step:mystep
                } 
               }
       )
       if ( x.porteur==="1") {
          //si porteur de projet
          return "go_step3_a" 
       } else {
          //si non
          return "go_step3_c"
       }

      }
},

insert_next2_b_1 : function (x) {
  
  if ( x.titre_projet && x.ressource_demarrage_projet ) {

       // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      if ( x.ressource_demarrage_projet =="0" ) {
         var mystep='go_step3_b'

      } else {
        var mystep="finished"

      }
      //then update:
       Corporation.update ( 
          { _id: myid },
               {$set: 
                { titre_projet:x.titre_projet,
                  phase_idee:x.phase_idee,
                  phase_prototypage:x.phase_prototypage,
                  besoin_prod:x.besoin_prod,
                  phase_demarrage:x.phase_demarrage,
                  ressource_demarrage_projet:x.ressource_demarrage_projet,
                  step:mystep
                } 
               }
       )

     //si le porteur de projet n'a pas de ressources propres:
     if (x.ressource_demarrage_projet =="0")
      {
        return 'go_step3_b';
       
      } 


  }

},

insert_valider_step3_b: function (x) {
    // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      //then update:
      if ( x.mode_financement && x.partie_prenante ) {
       Corporation.update ( 
          { _id: myid },
               {$set: 
                {
                  mode_financement:x.mode_financement,
                  partie_prenante:x.partie_prenante,
                  step:"finished"
                } 
               }
       )
        return "success";
     } else {
        return "failed";
     }

},
insert_next2_b_2: function(x) {
  // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      if ( x==="1") {
          var mystep="go_step3_d"
        } else {
          var mystep= "go_step3_f"
        }
      //then update:
      if ( x ) {
       Corporation.update ( 
          { _id: myid },
               {$set: 
                {
                  emploi:x,
                  step:mystep
                } 
               }
       )
        if ( x==="1") {
          return "go_step3_d"
        } else {
          return "go_step3_f"
        }
     }  else {
        return "failed";
     }

},
insert_next2_b_3: function(x) {
  // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      //then update:
      if ( x.poste_emploi && x.competence ) {
       Corporation.update ( 
          { _id: myid },
               {$set: 
                {
                  poste_emploi:x.poste_emploi,
                  competence:x.competence,
                  expertise:x.expertise,
                  step:"go_step3_e"
                } 
               }
       )
        return "go_step3_e" 
     }  else {
        return "failed";
     }
},
insert_valider_step3_e: function  (x) {
  // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      if ( x.employeur && x.taches && x.cv ) {
        Corporation.update ( 
          { _id: myid },
               {$set: 
                {
                  employeur:x.employeur,
                  taches:x.taches,
                  diplome:x.diplome,
                  certificat:x.certificat,
                  cv:x.cv,
                  step: "finished"
                } 
               }
       )
        return "success"
      }

},
insert_valider_step3_f: function (x) {
   // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      if ( x.volontariat_individu && x.individu_stage  ) {
        Corporation.update ( 
          { _id: myid },
               {$set: 
                {
                  volontariat_individu:x.volontariat_individu,
                  individu_stage:x.individu_stage,
                  step:"finished"
                } 
               }
       )
        return "success"
      }
},
insert_next2_c: function (x) {
  // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      if ( x.date_creation && x.num_cartestat && x.num_nif  ) {
        Corporation.update ( 
          { _id: myid },
               {$set: 
                {
                  date_creation:x.date_creation,
                  num_cartestat:x.num_cartestat,
                  num_nif:x.num_nif,
                  step:"go_step6"
                } 
               }
       )
        return {action1:"go_step5",action2:"go_step6"}
      }
},

insert_next3: function (x) {
  // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      if ( x.MainActivity && x.ACTP && x.price_prod ) {
        Corporation.update ( 
          { _id: myid },
               {$set: 
                {
                  MainActivity:x.MainActivity,
                  ACTP:x.ACTP,
                  price_prod:x.price_prod,
                  ref_prod:x.ref_prod,
                  step:"go_step7"
                } 
               }
       )
        return { action1:"go_step6" , action2:"go_step7" }  
      }

},
insert_next4: function (x) {
  // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      if ( x.nom_resp && x.phone_resp && x.fonction_resp && x.email_resp && x.capital_social ) {
        Corporation.update ( 
          { _id: myid },
               {$set: 
                {
                  nom_resp:x.nom_resp,
                  phone_resp:x.phone_resp,
                  fonction_resp:x.fonction_resp,
                  email_resp:x.email_resp, 
                  capital_social:x.capital_social,
                  step: "go_step8"
                } 
               }
        )
        return { action1:"go_step7" , action2:"go_step8" }  
      }

},
insert_next9 : function (x) {
  // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      if ( x.lieu_exploitation && x.adresse_lieu_exploitation) {
        Corporation.update ( 
          { _id: myid },
               {$set: 
                {
                  lieu_exploitation:x.lieu_exploitation,
                  adresse_lieu_exploitation:x.adresse_lieu_exploitation,
                  agence:x.agence, 
                  adresse_agence:x.adresse_agence, 
                  bureau:x.bureau,
                  nom_resp_cial:x.nom_resp_cial,
                  phone_resp_cial:x.phone_resp_cial,
                  fonction_resp_cial:x.fonction_resp_cial,
                  email_resp_cial:x.email_resp_cial,
                  lien_website: x.lien_website,
                  step: "go_step13"
                } 
               }
        )
         return {action1: 'go_step12', action2: 'go_step13'}
      }

},
insert_next10 : function (x) {
     // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      if (x.dir_exec && x.phone_dir_exec) {
         Corporation.update ( 
          { _id: myid },
               {$set: 
                { 
                  dir_exec:x.dir_exec,
                  phone_dir_exec:x.phone_dir_exec,
                  dir_prod:x.dir_prod, phone_dir_prod:x.phone_dir_prod, 
                  dir_cial:x.dir_cial,phone_dir_cial:x.phone_dir_cial,
                  drh:x.drh, phone_drh:x.phone_drh,
                  daf:x.daf,phone_daf:x.phone_daf,
                  di:x.di,phone_di: x.phone_di,
                  step: "go_step14"
                } 
               }
        )
         return {action1: 'go_step13', action2: 'go_step14'}

      }

},
insert_next11 : function (x) {
   // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      Corporation.update ( 
          { _id: myid },
               {$set: 
                { nb_dirigeant:x.nb_dirigeant,
                  nb_cadre:x.nb_cadre,
                  nb_employee:x.nb_employee,
                  nb_ouvrier:x.nb_ouvrier, 
                  nb_consultant:x.nb_consultant,
                  nb_ouvrier_tmp:x.nb_ouvrier_tmp,
                  step:"go_step15"
                } 
               }
        )
         return {action1: 'go_step14', action2: 'go_step15'}

},
insert_final_button: function (x) {
  // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      Corporation.update 
                        ( 
                                { _id: myid },
                                {
                                  $set: 
                                  {                
                                      annee: x.annee,
                                      CA: x.CA,
                                      profit: x.profit,
                                      benefice: x.benefice,
                                      revenu_net:x.revenu_net,
                                      step:"finished"                
                                  } 
                                } 
                        )

  
},
insert_ajout_produit_fourni: function(x) {
  // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      Corporation.update 
                        ( 
                                { _id: myid },
                                {
                                  $addToSet: 
                                  { 
                                    fournisseur : {
                                      nom_fournisseur: x.nom_fournisseur,
                                      prct_achat_fournisseur: x.prct_achat_fournisseur,
                                      produit_fourni: x.produit_fourni,
                                      step:"go_step10"
                                     
                                     }             
                                  } 
                                } 
                        )

},
insert_ajout_produit_concurrent: function (x) {
   // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      Corporation.update 
                        ( 
                                { _id: myid },
                                {
                                  $addToSet: 
                                  { 
                                    concurrent : {
                                      nom_concurrent: x.nom_concurrent,
                                      marketshare_concurrent: x.marketshare_concurrent,
                                      produit_fourni_concurrent: x.produit_fourni_concurrent,
                                      step:"go_step11"
                                     }             
                                  } 
                                } 
                        )

},
insert_ajout_client: function (x) {
  // retrieve the id of the collection of the corresponding to the current connected user
      var z= Corporation.find({repondant:Meteor.userId()}).fetch()
      var myid=z[0]._id
      Corporation.update 
                        ( 
                                { _id: myid },
                                {
                                  $addToSet: 
                                  { 
                                    client : {
                                      nom_client: x.nom_client,
                                      prct_vente_client: x.prct_vente_client,
                                      step:"go_step12"
                                     }             
                                  } 
                                } 
                        )

}


 });
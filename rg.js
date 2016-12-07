if ( Meteor.isClient ) {
	Template.rg.events ({
		'click #upload_cv': function() {
			var mycv = $('[id=mycv]').get(0).files[0]
                        
			if ( mycv ) {
                    fsFile = new  FS.File(mycv)

                    CVstorage.insert(fsFile, function (error,result) {
                      if (!error) {
                         //index produits à insérer:
                        var myurl = '/cfs/files/CVstorage/' + result._id
                        var z= Corporation.find({repondant:Meteor.userId()}).fetch()
                        var myid=z[0]._id
                        var myquery = {_id:myid }
                        Corporation.update 
                        ( 
                                myquery,
                                {
                                  $set: 
                                  { 
                                    mycv :   myurl
                                  } 
                                } 
                        )
                        alert('ajout réussi!')                     
                      } else {
                        alert('erreur insertion!');
                      }
                  });
              } else {
              	 alert("Charger votre CV!")
              }
             

		},
		'blur #Name': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
            Corporation.update ({_id: myid},{$set: {Name: val }})
		},
		'blur #FJ': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{FJ:val}})
		},
		'blur #adresse_siege': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{adresse_siege:val}})
		},
		'blur #tel_siege': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{tel_siege:val}})
		},
		'blur #cin': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{cin:val})
		},
		'blur #porteur': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{porteur:val}})
		},
		'blur #titre_projet': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{titre_projet:val}})
		},
		'blur #phase_idee': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{phase_idee:val}})
		},
		'blur #prod_projet': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{prod_projet:val}})
		},
		'blur #phase_prototypage': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{phase_prototypage:val}})
		},
		'blur #besoin_prod': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{besoin_prod:val}})
		},
		'blur #phase_demarrage': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{phase_demarrage:val}})
		},
		'blur #ressource_demarrage_projet': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{ressource_demarrage_projet:val}})
		},
		'blur #mode_financement': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{mode_financement:val}})
		},
		'blur #partie_prenante': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{partie_prenante:val}})
		},
		'blur #emploi': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{emploi:val}})
		},
		'blur #poste_emploi': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{poste_emploi:val}})
		},
		'blur #competence': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{competence:val}})
		},
		'blur #expertise': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{expertise:val}})
		},
		'blur #employeur': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{employeur:val})
		},
		'blur #taches': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{taches:val}})
		},
		'blur #diplome': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{diplome:val}})
		},
		'blur #certificat': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{certificat:val}})
		},
		'blur #volontariat_individu': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{volontariat_individu:val}})
		},
		'blur #individu_stage': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{individu_stage:val}})
		},
		'blur #date_creation': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{date_creation:val}})
		},
		'blur #num_cartestat': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{num_cartestat:val}})
		},
		'blur #num_nif': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{num_nif:val}})
		},
		'blur #MainActivity': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{MainActivity:val}})
		},
		'blur #ACTP': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{ACTP:val}})
		},
		'blur #ACTS': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{ACTS:val}})
		},
		'blur #ref_prod': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{ref_prod:val}})
		},
		'blur #price_prod': function (event,target) {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{price_prod:val}})
		}
	})
	Template.rg.helpers ({
		mydata_edit: function () {
			return Corporation.find({repondant:Meteor.userId()})
		},
		individu_porteur_projet: function () {
			var mytype = Corporation.find(
                                   {repondant:Meteor.userId()}
                                  ).map( function(u) { return u.type_individu; } )
			var porteur = Corporation.find(
                                   {repondant:Meteor.userId()}
                                  ).map( function(u) { return u.porteur; } )

			if ( mytype ===1 && porteur==="1" ) {
				return true
			} else {
                return false
			}
		},
		no_ressource: function () {
			var myressource = Corporation.find(
                                   {repondant:Meteor.userId()}
                                  ).map( function(u) { return u.ressource_demarrage_projet; } )
			if (myressource[0] ==="0" ) {
				return true
			} else {
                return false
			}

		},
		no_projet: function () {
			var myprojet = Corporation.find(
                                   {repondant:Meteor.userId()}
                                  ).map( function(u) { return u.porteur; } )
			if (myprojet[0] ==="0" ) {
				return true
			} else {
                return false
			}

		},
		recherche_emploi: function () {
			var myemploi = Corporation.find(
                                   {repondant:Meteor.userId()}
                                  ).map( function(u) { return u.emploi; } )
			if (myemploi[0] ==="1" ) {
				return true
			} else {
                return false
			}


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
}
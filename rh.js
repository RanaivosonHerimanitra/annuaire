if ( Meteor.isClient ) {
	Template.rh.events ({
		'blur #nom_resp': function () {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{nom_resp:val}})
		},
		'blur #phone_resp': function () {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{phone_resp:val}})
		},
		'blur #fonction_resp': function () {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{fonction_resp:val}})
		},
		'blur #email_resp': function () {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{email_resp:val}})
		},
		'blur #capital_social': function () {
			var val = $(event.target).val()
			var z= Corporation.find({repondant:Meteor.userId()}).fetch()
            var myid=z[0]._id
			Corporation.update ({_id: myid},{$set:{capital_social:val}})
		}
	})
	Template.rh.helpers ({
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
}
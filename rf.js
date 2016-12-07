if ( Meteor.isClient ) {
	Template.rf.events ({
		
	})
	Template.rf.helpers ({
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
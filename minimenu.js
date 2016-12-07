if (Meteor.isClient ) {

	Template.minimenu.helpers ({
		mydata: function() {
			return Corporation.find({repondant:Meteor.userId()})
		},
		hasName: function() {
			if ( Corporation.find({repondant:Meteor.userId()}).count() === 1 ) {
				return true
			} else {
				return false
			}
		}
	})
}
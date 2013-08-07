/* 

Code mercilessly stolen from github.com/martinrue

I make no apologies

M1ke

*/

var genderGuesser = {
	genders:{},
	gotGenders:false,
	find: function(name) {
		if (name.length<1) {
			return;
		}
		if (this.gotGenders) {
			this.findName(name,this.genders);
		}
		else {
			this.getGenders(name);
		}
	},
	findName: function(name,genders) {
		var gender=genders[name.toUpperCase()] || 'male';
		$('div.alert strong').text(gender).parent().fadeIn();
	},
	getGenders: function(name) {
		var self = this;
		$.getJSON('genders.json',function(response){
			self.genders = response;
			self.gotGenders = true;
			self.findName(name,response);
		});
	},
};

$(function(){
	$('button.submit').click(function(e){
		e.preventDefault();
		var name=$('#inputName').val();
		genderGuesser.find(name);
	});
});

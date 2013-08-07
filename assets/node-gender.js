/* 

Gender code mercilessly stolen from github.com/martinrue

I make no apologies

M1ke

*/

var updateReady;
window.applicationCache.addEventListener('updateready',function(){
	updateReady=true;
	jQuery && updateInform();
});
function updateInform() {
	$('<div class="alert hide"><p>An update to this app has been downloaded. Please <a href="'+window.location.href+'">click here to update to the new version</a></p>.</div>').prependTo('div.content').slideDown();
};

var genderGuesser={
	genders:{},
	gotGenders:false,
	find: function(name) {
		if (name.length<1) {
			return;
		}
		if (this.gotGenders) {
			this.findName(name,this.genders,this.names);
		}
		else {
			this.getGenders(name);
		}
	},
	findName: function(nameInput,genders) {
		var gender,nameInputUC=nameInput.toUpperCase();
		if (genders[nameInputUC]) {
			gender=genders[nameInputUC];
		}
		else {
			for (var name in genders) {
				if (name.match(nameInputUC)) {
					gender=genders[name];
					break;
				}
			}
			if (!gender) {
				gender='ambiguous';
			}
		}
		$('div.alert strong').text(gender).parent().fadeIn();
		this.save(nameInput,gender);
	},
	getGenders: function(name) {
		var self=this;
		$.getJSON('genders.json',function(response){
			self.genders=response;
			self.gotGenders=true;
			self.findName(name,response);
		});
	},
	storageID:function() {
		return 1*localStorage.getItem('storageID');
	},
	save: function(name,gender) {
		var storageID=this.storageID();
		storageID++;
		localStorage.setItem('storageID',storageID);
		localStorage.setItem('name-'+storageID,name);
		localStorage.setItem('gender-'+storageID,gender);
	},
	load:function() {
		var storageID=this.storageID(),name='',gender='';
		var $table=$('table.saved');
		for (var n=storageID;n>0;n--) {
			name=localStorage.getItem('name-'+n);
			gender=localStorage.getItem('gender-'+n);
			$table.append('<tr><td>'+name+'</td><td>'+gender+'</td></tr>');
		}
	},
};

$(function(){
	$('button.submit').click(function(e){
		e.preventDefault();
		var name=$('#inputName').val();
		genderGuesser.find(name);
	});
	if (updateReady) {
		updateInform();
	}
	genderGuesser.load();
});

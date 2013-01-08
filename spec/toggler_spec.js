describe('Mutiny.toggler', function() {
	beforeEach(function(){
		loadFixtures('toggler.html');
		Mutiny.init();
	});

	it('triggers Bare Bones toggler', function() {
		expect($('#bare-bones')).toBeVisible();
		$('#bare_bones_toggler').click();
		expect($('#bare-bones')).toBeHidden();
	});

	it('triggers Radio Button toggler', function() {
		expect($('#option_group')).toBeHidden();
		$('#choice2').click();
		expect($('#option_group')).toBeVisible();
	});
});
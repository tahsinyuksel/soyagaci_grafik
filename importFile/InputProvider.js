var InputProvider = function() {

	this.handleFile = function(f, callback) {
		if(f) {
        	this.setResult(f);		            
            callback(this.getResult());			            				            
        }
	},

	this.getResult = function() {
		return this.result;
	},

	this.setResult = function(data) {
		this.result = data;
	}

	this.getFormat = function(data) {
		var result = [];

		data = $(data);
		if(data.length == 0) {
			return result;
		}		

		$(data[0]).find('> tbody  > tr').each(function(i,item) {
			var tdElements = $(item).find('td');

			result.push({
				id: $(tdElements).eq(0).text(),
				gender: $(tdElements).eq(1).text(),
				relation: $(tdElements).eq(2).text(),
				name: $(tdElements).eq(3).text(),
				lastName: $(tdElements).eq(4).text(),
				father: $(tdElements).eq(5).text(),
				mother: $(tdElements).eq(6).text(),
				birth: $(tdElements).eq(7).text(),
				city: $(tdElements).eq(8).text(),
				houseNum: $(tdElements).eq(9).text(),
				married: $(tdElements).eq(10).text(),
				status: $(tdElements).eq(11).text(),
			});
			
		});

		return result;
	}

};
function familyOperation() {            

	this.relationKey = 'relation';
	var self = this;

	this.getData = function() {
  		return this.data;
  	}

  	this.setData = function(_data) {
  		this.data = _data;
  	}


	this.getRelationCode = function(name) {	        		

		if(name.substring(0, 4).toLowerCase() == 'baba') {
			return 'baba';
		} else if(name.substring(0, 4).toLowerCase() == 'anne') {
			return 'anne';
		} else {
			return 'kendi';
		}
	},

	this.run = function() {

		var result = [];

		this.data.forEach(function(item, i) {	        			

			var itemResult = self.getRelationList(item[self.relationKey], true);

			if(itemResult.length != 0) {
				
				var subItem = self.subFind(itemResult, i);
				if(subItem != null) {
					
					/*
    				console.log(item);		        			
    				console.log(subItem);		        			
    				console.log('-----');	
    				*/

    				result.push([
    					(item),
    					(subItem)
					]);	        			
    				
				}

			} else {
				// my
				if(self.getRelationCode(item[self.relationKey]) != 'kendi') {
					//console.log('my family');		
					//console.log(self.data[0]);	

					result.push([
    					item,
    					self.findByCode(item[self.relationKey])
					]);	        		
				}	        			        			
			}

		});

		return result;
	}

	this.findByCode = function(code) {
		for(var i = 0; i < this.data.length; i++) {
			if(this.getRelationCode(this.data[i][this.relationKey]) == 'kendi') {
				return this.data[i];
			}
		}
		return null;
	}

	this.subFind = function(itemResult, itemIndex) {
		var result = null;

		for(var i = 0; i < this.data.length; i++) {

			if(itemIndex != i) {

				var subItem = this.data[i];
				
				var subItemResult = self.getRelationList(subItem[self.relationKey], false); 	
				
				if(subItemResult.length != 0) {

					/*
					console.log(itemResult);	
					console.log(subItemResult);		
    				console.log('***' + itemIndex + '-' + i);
    				*/

					if(self.compareResult(itemResult, subItemResult)) {        							
						result = subItem;
						break;
					}

				}
				
			}

		};

		return result;
	}

	this.getRelationList = function(relation, isBefore) {
		var segment = relation.split(' ');
		var result = [];
		var relCode = '';

		for(var i = 0; i < segment.length; i ++) {
			relCode = this.getRelationCode(segment[i]);
			if(relCode != '') {
				result.push(relCode);	
			}
			
		}

		if(isBefore && result.length > 0) {
			return result.slice(0, result.length - 1);
		}

		return result;
	}

	this.compareResult = function(source, target) {	        	

		if(source.length != target.length) {
			return false;
		}

		var result = true;

		for(i = 0; i < source.length; i ++) {
			if(source[i] != target[i]) {
				result = false;
				break;
			}
		}

		return result;
	}

};
/*
var soyDataOperation = new soyDataOperation();
soyDataOperation.setData( JSON.parse( localStorage.getItem("soyData") ) );
var result = soyDataOperation.run();
console.log(result);
*/

var ExcelProvider = function() {

	this.result;

	this.handleFile = function(f, callback) {
		if(f) {
        	var reader = new FileReader();
        	var self = this;

	        reader.onload = function (e) {
	            var data = e.target.result;

	            var workbook = XLSX.read(data, { type: 'binary' });
	            
	            var sheetName = workbook.SheetNames[0];

	            var response = self.sheet3arr(workbook.Sheets[sheetName]);

	            self.setResult(response);	
	            callback(self.getResult());			            				            
	        };

	        reader.readAsArrayBuffer(f);
        }
	},

	this.sheet3arr = function(sheet) {
	   var result = [];
	   var row;
	   var rowNum;
	   var colNum;
	   var range = XLSX.utils.decode_range(sheet['!ref']);
	   var i = 0;
	   for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
	      row = [];
	       for(colNum=range.s.c; colNum<=range.e.c; colNum++){	       	  

	          var nextCell = sheet[
	             XLSX.utils.encode_cell({r: rowNum, c: colNum})
	          ];

	          if( typeof nextCell === 'undefined' ){
	             row.push('*');
	          } else {	          	
	          	row.push(nextCell.w);
	          } 
	       }

	       // is record row
	       if(parseInt(row[0]) > 0) {
	       		result.push(row);
	       		i += 1;	
	       } else {
	       		// is sub record
	       		row.forEach(function(item, index) {
	       			if(item != '*' && result.length > 0) {
	       				result[i-1][index] += ' ' + item;
	       			}
	       			
	       		});	       		
	       }
	       
	   }

	   return result;
	},

	this.getToJson = function(sheet) {
		var result;

        var roa = XLSX.utils.sheet_to_json(sheet);                    

        if (roa.length > 0) {
            result = (roa);
        }

        return result;
    },

    this.sheet2arr = function(sheet){
	   var result = [];
	   var row;
	   var rowNum;
	   var colNum;
	   var range = XLSX.utils.decode_range(sheet['!ref']);
	   for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
	      row = [];
	       for(colNum=range.s.c; colNum<=range.e.c; colNum++){
	          var nextCell = sheet[
	             XLSX.utils.encode_cell({r: rowNum, c: colNum})
	          ];
	          if( typeof nextCell === 'undefined' ){
	             row.push('*');
	          } else row.push(nextCell.w);
	       }
	       result.push(row);
	   }
	   return result;
	},

	this.getResult = function() {
		return this.result;
	},

	this.setResult = function(data) {
		this.result = data;
	}

	this.getFormat = function(data) {
		var result = [];

		data.forEach(function(item) {
			result.push({
				id: item[0],
				gender: item[1],
				relation: item[2],
				name: item[3],
				lastName: item[4],
				father: item[5],
				mother: item[6],
				birth: item[7],
				city: item[8],
				houseNum: item[9],
				married: item[10],
				status: item[11],
			})
		});

		return result;
	}

};
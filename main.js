var graphCan = function() {
	this.network = null;
	this.layoutMethod = "directed";
	this.isEdit = false;
	this.nodes = [];
	this.edges = [];
	this.data = [];
	this.currentNodeEdge = {};

	var self = this;

	this.destroy = function() {
      if (this.network !== null) {
        this.network.destroy();
        this.network = null;
      }
  	}

  	this.draw = function() {
  		this.destroy();		      							
		this.do(this.edges, this.nodes);
  	}

  	this.drawByData = function(soyData, relationData) {
  		var drawData = this.prepareNodeEdge(soyData, relationData);
		this.nodes = new vis.DataSet(drawData.nodes);
		this.edges = new vis.DataSet(drawData.edges);
		this.draw();
  	}

  	this.prepareNodeEdge = function(soyData, relationData) {
  		var nodes = [];
  		var edges = [];

  		soyData.forEach(function(item) {
  			nodes.push( self.getNodeItem(item) );
  		});

  		relationData.forEach(function(item) {
  			edges.push( self.getEdgeItem(item[1], item[0]) );
  		});

  		return { edges: edges, nodes: nodes };					
  	},

  	this.getNodeItem = function(item) {
  		var result = {
  			id: item.id, 
  			label: item.name + ((item.lastName) ? ' ' + item.lastName : ''), 
  			color: { background: (item.gender == 'E' ? '' : 'pink' ) }
  		};
  		
  		return result;
  	}

  	this.getEdgeItem = function(from, to) {
  		var result = { 
  			from: from.id, 
  			to: to.id,
  			label: (to.gender == 'E' ? 'Baba' : 'Anne' ),
  			color: { color: (to.gender == 'E' ? 'blue' : 'red' ), highlight: 'purple' }
  		};

  		return result;
  	}

  	this.do = function(edges, nodes) {
  		 // create a network
	  var container = document.getElementById('mynetwork');
	  var data = {
	    nodes: nodes,
	    edges: edges
	  };

	  var options = {
        edges: {
          smooth: true,
          arrows: {to : true }
        }
      };

      // layout for hierarchical
      if(this.layoutMethod != '') {
      	options.layout = {
          hierarchical: {
            sortMethod: this.layoutMethod
          }
        }
      }

      // is can edit
      options.manipulation = {
		enabled: this.isEdit
	  }

      this.network = new vis.Network(container, data, options);
      this.events();
  	}

  	this.events = function() {

  		this.network.on("click", function (params) {
	        params.event = "[original event]";
	        var selectedNode = this.getNodeAt(params.pointer.DOM);
	        var clickData = self.getNode(selectedNode);
	        console.log(clickData);
	        self.currentNodeEdge = params;
	        if(clickData != null) {
	        	self.setDetailRecord(clickData);	
	        }				        				        
	    });							    
  	}

  	this.setDetailRecord = function(data) {
  		var fields = ['id', 'relation', 'name', 'lastName', 'gender', 'father', 'mother', 'birth', 'city', 'houseNum', 'married', 'status'];

  		fields.forEach(function(item) {
  			var element = document.getElementById('detail-' + item)
  			if(element) {
  				element.innerText = (data[item]) ? data[item] : '';
  			}
  		});
  		
  	}

  	this.getNode = function(id) {
  		var result = null;
  		this.getData().forEach(function(item) {

  			if(item.id == id) {
  				result = item;
  			}
  		});
  		return result;
  	}

  	this.export = function() {
  		return { edges: Object.values(this.edges._data), nodes: Object.values(this.nodes._data), data: this.getData() };							      		
  	}

  	this.import = function(importData) {
  		if(importData.data && importData.edges && importData.nodes) {
  			this.data = importData.data;		      			
      		this.nodes = new vis.DataSet(importData.nodes);
			this.edges = new vis.DataSet(importData.edges);

      		this.draw();
  		}		      		
  	}

  	this.getData = function() {
  		return this.data;
  	}

  	this.setData = function(_data) {
  		this.data = _data;
  	}

  	this.addData = function(item) {
  		this.data.push(item);
  	}

  	this.addNewRecord = function(item) {
  		this.data.push(item);
  		this.nodes.add(this.getNodeItem(item));
  		graphCanProvider.draw();
  	}		      	

  	this.addNewEdge = function(item) {
  		graphCanProvider.edges.add(item);
		graphCanProvider.draw();
  	}

  	this.removeCurrent = function() {

  		if(this.currentNodeEdge.nodes) {
  			this.currentNodeEdge.nodes.forEach(function(item) {
      			console.log(item);
      			self.nodes.remove({id: item});		      			
      		});
  		}

  		if(this.currentNodeEdge.edges) {
  			this.currentNodeEdge.edges.forEach(function(item) {
      			console.log(item);
      			self.edges.remove({id: item});
      		});	
  		}
      				      				      		
  	}

};
sap.app.dataCache = {
	data : {},

	loadOData : function(odatamodel) {
		var fnSuccess = function(oData, oResponse) {
			this.data = oData;
		};

		var fnError = function() {
			return -1;
		};

		odatamodel.read("/Products", null, null, true, fnSuccess, fnError);
	},

	getOData : function() {
		return this.data;
	}

};

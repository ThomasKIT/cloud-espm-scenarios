sap.ui.controller("espm-ui-reviews-web.productbutler-relations", {

	onInit : function() {

	},

	getSimilarProducts : function() {
		var fnSuccess = function(oData, oResponse) {
			alert("Read successful: " + JSON.stringify(oData))
		}

		var fnError = $.proxy(this.showReadError, this);

		sap.app.extensionodatamodel.read("/ProductRelations", null, null, true, fnSuccess, fnError);
	}
});
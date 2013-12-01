sap.ui.controller("espm-ui-reviews-web.productbutler-details", {
	onInit : function() {
		sap.app.viewCache.set("productbutler-details", this.getView());
	},

	createProductRelations : function() {
		var selectedItem = sap.ui.getCore().byId("productButlerSelItemTextField");
		var itemPath = sap.ui.getCore().byId("productButlerItemPathTextField");

		sap.app.viewCache.get("productbutler-relations").createProductRelations(selectedItem, itemPath);
	}
});
sap.ui.controller("espm-ui-reviews-web.productbutler", {

	onInit : function() {
		sap.app.viewCache.set("productbutler", this.getView());
		sap.app.dataCache.loadOData(sap.app.odatamodel);
	}
});
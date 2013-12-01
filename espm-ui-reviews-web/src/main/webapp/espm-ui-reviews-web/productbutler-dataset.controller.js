sap.ui.controller("espm-ui-reviews-web.productbutler-dataset", {

	onInit : function() {
		sap.app.viewCache.set("productbutler-dataset", this.getView());
	},

	dataSetItemClicked : function(idx, oProductsDataSet) {
		var title = oProductsDataSet.getItems()[idx].getTitle();

		document.getElementById("productButlerSelItemTextField").value = "" + title;
		document.getElementById("productButlerItemPathTextField").value = ""
				+ document.getElementById("productButlerItemPathTextField").value + ";" + title;

		sap.app.viewCache.get("productbutler-relations").getController().updateCarousel(oProductsDataSet);

		var fnSuccessProd = function(oData, oResponse) {
			for (i = 0; i < oData.results.length; i++) {
				if (oData.results[i].ProductId == title) {

					sap.app.viewCache.get("productbutler-details").updateProductDetailsLayout(title, oData.results[i]);
					break; // !
				}
			}

		}

		var fnErrorProd = function() {
			return -1;
		}

		sap.app.odatamodel.read("/Products", null, null, true, fnSuccessProd, fnErrorProd);
	},
	// This variant is much faster and will use a data cache to cache the products each team the productbutler gets
	// clicked
	dataSetItemClickedCache : function(idx, oProductsDataSet) {
		var title = oProductsDataSet.getItems()[idx].getTitle();

		document.getElementById("productButlerSelItemTextField").value = "" + title;
		document.getElementById("productButlerItemPathTextField").value = ""
				+ document.getElementById("productButlerItemPathTextField").value + ";" + title;

		var products = sap.app.dataCache.getOData();

		for (i = 0; i < products.results.length; i++) {
			if (products.results[i].ProductId == title) {
				sap.app.viewCache.get("productbutler-details").updateProductDetailsLayout(title, products.results[i]);

				break; // !
			}
		}

		sap.app.viewCache.get("productbutler-relations").getController().updateCarousel(oProductsDataSet);
	}

});

sap.ui.controller("espm-ui-reviews-web.productbutler-relations", {

	onInit : function() {
		sap.app.viewCache.set("productbutler-relations", this.getView());
	},

	getSimilarProducts : function() {
		var fnSuccess = function(oData, oResponse) {
			alert("Read successful: " + JSON.stringify(oData))
		}

		var fnError = $.proxy(this.showReadError, this);

		sap.app.extensionodatamodel.read("/ProductRelations", null, null, true, fnSuccess, fnError);
	},

	createProductRelations : function(selectedItem, itemPath) {

		// var selectedItem = sap.ui.getCore().byId("productButlerSelItemTextField");
		// var itemPath = sap.ui.getCore().byId("productButlerItemPathTextField");

		var items_tmp = itemPath.split(";");
		var from = 0;
		var to = items_tmp.length;

		if (to > 5) {
			from = items_tmp.length - 5;
		}

		var items = items_tmp.slice(from, to);

		var oProductRelation = {};

		// Gewinner --> ELO Win

		// Betrachte die letzten 5 Produkte
		// P4 gewinnt gegen P5, P3 gegen P4 usw., P1 ist der erste Gewinner, erhält seine ELO aber als letzter.
		// hole product id
		// existiert bereits eine Relation?
		// Ja --> ELO anpassen
		// --> nur prüfen ob ähnliches produkt bereits eingetragen
		// ansonsten merken
		// Nein --> Neu anlegen
		oProductRelation.ProductId = selectedItem.getValue();
		// oProductRelation.Elo = get old elo, calculate new one

		/*
		 * // für alle IDs aus itemPath // { var oSimilarProduct = {}; oSimilarProduct.ProductId =
		 * selectedItem.getValue(); oSimilarProduct.CreationDate = new Date().toISOString().replace("Z", "0000");
		 * oSimilarProduct.Responsible_user = "test"; // get current logged in user // create customer review var
		 * fnSuccess = $.proxy(this.showSuccessMsg, this); var fnError = $.proxy(this.showReadError, this);
		 * sap.ui.getCore().getModel("extensionodatamodel").create("/SimilarProducts", oSimilarProduct, null, fnSuccess,
		 * fnError); // }
		 */
		var oExtensionODataModel = sap.ui.getCore().getModel("extensionodatamodel");

		var fnSuccess = $.proxy(this.showSuccessMsg, this);
		var fnError = $.proxy(this.showReadError, this);
		// sap.app.extensionodatamodel.read("/CustomerReviews", null, null, true, fnSuccess, fnError);
		// sap.app.extensionodatamodel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
		sap.app.extensionodatamodel.create("/ProductRelations", oProductRelation, null, fnSuccess, fnError);

	}
});
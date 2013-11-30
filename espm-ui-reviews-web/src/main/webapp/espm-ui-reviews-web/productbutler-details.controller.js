sap.ui.controller("espm-ui-reviews-web.productbutler-details", {
	onInit : function() {

	},

	createProductRelations : function() {

		var selectedItem = sap.ui.getCore().byId("productButlerSelItemTextField");
		var itemPath = sap.ui.getCore().byId("productButlerItemPathTextField");

		var oProductRelation = {};

		// Gewinner --> ELO Win
		oProductRelation.ProductId = selectedItem.getValue();
		oProductRelation.Rating = "111";
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

	},

	createReview : function() {
		var oCommentField = sap.ui.getCore().byId("productButlerSelItemTextField");
		var oCustomerReview = {};
		// user defined comment
		oCustomerReview.Comment = oCommentField.getValue();
		// all other values are pre-defined
		oCustomerReview.FirstName = "First name";
		oCustomerReview.LastName = "Last name";
		oCustomerReview.Rating = "3";
		oCustomerReview.CreationDate = new Date().toISOString().replace("Z", "0000");
		oCustomerReview.ProductId = "HT-2000";
		// create customer review
		var fnSuccess = $.proxy(this.showSuccessMsg, this);
		var fnError = $.proxy(this.showReadError, this);
		sap.ui.getCore().getModel("extensionodatamodel").create("/CustomerReviews", oCustomerReview, null, fnSuccess,
				fnError);
	}
});
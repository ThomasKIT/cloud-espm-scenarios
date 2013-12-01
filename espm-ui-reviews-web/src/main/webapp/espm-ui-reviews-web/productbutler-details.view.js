sap.ui.jsview("espm-ui-reviews-web.productbutler-details", {

	getControllerName : function() {
		return "espm-ui-reviews-web.productbutler-details";
	},

	createContent : function(oController) {
		// Create the Carousel control
		var oCarousel = sap.app.viewCache.get("productbutler-relations").makeCarousel();

		var oCommentFieldItem = new sap.ui.commons.TextField({
			id : "productButlerSelItemTextField",
			value : ''
		});

		var oCommentFieldItemPath = new sap.ui.commons.TextField({
			id : "productButlerItemPathTextField",
			value : ''
		});

		var oPurchaseButton = new sap.ui.commons.Button({
			text : "Artikel kaufen",
			tooltip : "Diesen Artikel jetzt kaufen.",
			press : function() {
				oController.createProductRelations();
			},
		// press : this.getController().createProductRelations() will get executed automatically??
		});

		var oWriteReview = new sap.ui.commons.Button({
			text : "Artikel bewerten",
			tooltip : "Diesen Artikel jetzt bewerten.",
			press : function() {
				sap.app.viewCache.get("reviews").getController().openCustomerReviewCreationDialog();
			},
		});

		this.oProductDetailsLayout = this.createProductDetailsLayout();

		var oLayout = new sap.ui.commons.layout.VerticalLayout({
			content : [ oCommentFieldItem, oCommentFieldItemPath, new sap.ui.commons.Label({
				text : "{i18n>PRODUCT_DETAILS_LABEL}"
			}), this.oProductDetailsLayout, oPurchaseButton, oWriteReview, oCarousel ]
		});

		return oLayout;
	},

	createProductRelations : function() {
		this.getController().createProductRelations();
	},

	createProductDetailsLayout : function() {
		var oMatrixLayout = new sap.ui.commons.layout.MatrixLayout({
			id : "productDetailsLayout"
		});

		return oMatrixLayout;
	},

	updateProductDetailsLayout : function(product) {
		var oMatrixLayout = sap.ui.getCore().byId("productDetailsLayout");

		oMatrixLayout.removeAllRows();

		oMatrixLayout.createRow(new sap.ui.commons.Label({
			text : "" + product.Name
		}), new sap.ui.commons.Label({
			text : ""
		}));

		oMatrixLayout.createRow(new sap.ui.commons.Label({
			text : "Preis:"
		}), new sap.ui.commons.Label({
			text : "" + product.Price + " " + product.CurrencyCode
		}));

		oMatrixLayout.createRow(new sap.ui.commons.Label({
			text : "Beschreibung:"
		}), new sap.ui.commons.Label({
			text : "" + product.LongDescription
		}));

		// foreach .... if(!isNaN())
	}
});
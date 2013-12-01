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
			width : "100%",
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
			id : "productDetailsLayout",
			width : "100%",
			widths : [ "30%", "70%" ]
		});

		return oMatrixLayout;
	},

	updateProductDetailsLayout : function(productTitle, product) {
		// get all the Products from the OData Service,
		// forced to do this manually, because the OData Service
		// doesn't contain any getElement Method to pick one Product

		// now update the product details more or less dynamically
		var oMatrixLayout = sap.ui.getCore().byId("productDetailsLayout");

		oMatrixLayout.removeAllRows();

		oMatrixLayout.createRow(new sap.ui.commons.Image("", {
			src : that.formatter("" + product.PictureUrl),
			alt : "Alternativtext",
			width : "200px",
			height : "150px",
			border : "1px solid #000000"
		}), new sap.ui.commons.Label({
			text : ""
		}));

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

		oMatrixLayout.createRow(new sap.ui.commons.Label({
			text : "Hersteller:"
		}), new sap.ui.commons.Label({
			text : "" + product.SupplierName
		}));

		oMatrixLayout.createRow(new sap.ui.commons.Label({
			text : "Gewicht:"
		}), new sap.ui.commons.Label({
			text : "" + product.Weight + " " + product.WeightUnit.toLowerCase()
		}));

		oMatrixLayout.createRow(new sap.ui.commons.Label({
			text : "Abmessung (Breite):"
		}), new sap.ui.commons.Label({
			text : "" + product.DimensionWidth + " " + product.DimensionUnit.toLowerCase()
		}));

		oMatrixLayout.createRow(new sap.ui.commons.Label({
			text : "Abmessung (Tiefe):"
		}), new sap.ui.commons.Label({
			text : "" + product.DimensionDepth + " " + product.DimensionUnit.toLowerCase()
		}));

		oMatrixLayout.createRow(new sap.ui.commons.Label({
			text : "Abmessung (Höhe):"
		}), new sap.ui.commons.Label({
			text : "" + product.DimensionHeight + " " + product.DimensionUnit.toLowerCase()
		}));

		oMatrixLayout.createRow(new sap.ui.commons.Label({
			text : "Alle Eigenschaften anzeigen"
		}), new sap.ui.commons.Label({
			text : "klick"
		}));

		// foreach .... if(!isNaN())
	},

	formatter : function(src) {
		if (!src) {
			return (sap.app.config.productPlaceholderImg);
		} else {
			var re = /.JPG/g;
			src = src.replace(re, ".jpg");
			return (sap.app.utility.getBackendImagesDestination() + sap.app.utility.getImagesBaseUrl() + src);
		}
	}
});
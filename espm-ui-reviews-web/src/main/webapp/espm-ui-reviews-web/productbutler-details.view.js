sap.ui.jsview("espm-ui-reviews-web.productbutler-details", {

	getControllerName : function() {
		return "espm-ui-reviews-web.productbutler-details";
	},

	createContent : function(oController) {
		// Create the Carousel control
		// Either inside the Relations View/Panel or here
		// var oCarousel = sap.app.viewCache.get("productbutler-relations").makeCarousel();

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
			}), this.oProductDetailsLayout, oPurchaseButton, oWriteReview ]
		// , oCarousel alternatively within the
		// product details
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
			widths : [ "180px", "300px" ]
		});

		return oMatrixLayout;
	},

	updateProductDetailsLayout : function(productTitle, product) {
		// get all the Products from the OData Service,
		// forced to do this manually, because the OData Service
		// doesn't contain any getElement Method to pick one Product

		// now update the product details more or less dynamically
		var oMatrixLayout = sap.ui.getCore().byId("productDetailsLayout");

		var that = this;

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

		// -------------------------------------------------------------------- Price

		var oDataSet = sap.ui.getCore().byId("oDataSetProducts");
		var toolPopupPrice = this.makeToolPopup(oDataSet, "Price", priceLink, product.Price);

		var priceLink = new sap.ui.commons.Link({
			text : "" + product.Price + " " + product.CurrencyCode,
			press : function() {
				if (toolPopupPrice.isOpen()) {
					toolPopupPrice.close();
				} else {
					toolPopupPrice.open();
				}
			}
		});

		oMatrixLayout.createRow(new sap.ui.commons.Label({
			text : "Preis:"
		}), priceLink);

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

		// -------------------------------------------------------------------- Weight

		var toolPopupWeight = this.makeToolPopup(oDataSet, "Weight", weightLink, product.Weight);

		var weightLink = new sap.ui.commons.Link({
			text : "" + product.Weight + " " + product.WeightUnit.toLowerCase(),
			press : function() {
				if (toolPopupWeight.isOpen()) {
					toolPopupWeight.close();
				} else {
					toolPopupWeight.open();
				}
			}
		});

		oMatrixLayout.createRow(new sap.ui.commons.Label({
			text : "Gewicht:"
		}), weightLink);
		// -------------------------------------------------------------------- Width

		var toolPopupWidth = this.makeToolPopup(oDataSet, "DimensionWidth", widthLink, product.DimensionWidth);

		var widthLink = new sap.ui.commons.Link({
			text : "" + product.DimensionWidth + " " + product.DimensionUnit.toLowerCase(),
			press : function() {
				if (toolPopupWidth.isOpen()) {
					toolPopupWidth.close();
				} else {
					toolPopupWidth.open();
				}
			}
		});

		oMatrixLayout.createRow(new sap.ui.commons.Label({
			text : "Abmessung (Breite):"
		}), widthLink);

		// -------------------------------------------------------------------- Depth

		var toolPopupDepth = this.makeToolPopup(oDataSet, "DimensionDepth", widthLink, product.DimensionDepth);

		var depthLink = new sap.ui.commons.Link({
			text : "" + product.DimensionDepth + " " + product.DimensionUnit.toLowerCase(),
			press : function() {
				if (toolPopupDepth.isOpen()) {
					toolPopupDepth.close();
				} else {
					toolPopupDepth.open();
				}
			}
		});

		oMatrixLayout.createRow(new sap.ui.commons.Label({
			text : "Abmessung (Tiefe):"
		}), depthLink);

		// -------------------------------------------------------------------- Height
		var toolPopupHeight = this.makeToolPopup(oDataSet, "DimensionHeight", widthLink, product.DimensionHeight);

		var heightLink = new sap.ui.commons.Link({
			text : "" + product.DimensionHeight + " " + product.DimensionUnit.toLowerCase(),
			press : function() {
				if (toolPopupHeight.isOpen()) {
					toolPopupHeight.close();
				} else {
					toolPopupHeight.open();
				}
			}
		});

		oMatrixLayout.createRow(new sap.ui.commons.Label({
			text : "Abmessung (Höhe):"
		}), heightLink);

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
	},

	makeToolPopup : function(oDataSet, elementToSearchFor, openerLink, value) {
		var filterOperator = sap.ui.model.FilterOperator.LE;

		var filterValuePrice = value * 1;

		var filterAmount = new sap.ui.commons.TextField({
			value : 100,
			width : "80px"
		});

		var valueLabel = new sap.ui.commons.Label({
			text : " " + filterValuePrice,
		});

		return new sap.ui.ux3.ToolPopup({
			autoClose : true,
			content : [ new sap.ui.commons.CheckBox({
				text : 'Nur größere Werte zulassen',
				tooltip : 'Aktivieren um nur nach Werten zu filtern die größer sind.',
				checked : false,
				change : function() {
					if (this.getChecked()) {
						filterOperator = sap.ui.model.FilterOperator.GE;
					} else {
						filterOperator = sap.ui.model.FilterOperator.LE;
					}
				}
			}), new sap.ui.core.HTML({
				content : "<br/>"
			}), new sap.ui.commons.Button({
				text : "-",
				press : function() {
					var oBinding = oDataSet.getBinding("items");
					filterValuePrice = filterValuePrice * 1 - filterAmount.getLiveValue() * 1;
					valueLabel.setText(" " + filterValuePrice);

					oBinding.filter(new sap.ui.model.Filter(elementToSearchFor, filterOperator, filterValuePrice));

					oDataSet.setLeadSelection(-1);

				}
			}), filterAmount, new sap.ui.commons.Button({
				text : "+",
				press : function() {

					var oBinding = oDataSet.getBinding("items");
					filterValuePrice = filterValuePrice * 1 + filterAmount.getLiveValue() * 1;
					valueLabel.setText(" " + filterValuePrice);

					oBinding.filter(new sap.ui.model.Filter(elementToSearchFor, filterOperator, filterValuePrice));

					oDataSet.setLeadSelection(-1);

				}
			}), new sap.ui.core.HTML({
				content : "<br/><br/>"
			}), new sap.ui.commons.Label({
				text : "Filterwert: "
			}), valueLabel ],
			opener : openerLink
		}).addStyleClass('largePopup');
	}
});
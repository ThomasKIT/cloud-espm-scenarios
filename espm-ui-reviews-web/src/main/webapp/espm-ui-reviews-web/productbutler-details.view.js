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
		var filterAmount = new sap.ui.commons.TextField({
			value : 100,
			width : "80px"
		});

		var filterValuePrice = product.Price * 1;

		var toolPopupPrice = new sap.ui.ux3.ToolPopup({
			autoClose : true,
			content : [
					new sap.ui.commons.Button({
						text : "-",
						press : function() {
							var oDataSet = sap.ui.getCore().byId("oDataSetProducts");
							var test = oDataSet.getItems()[0];
							var oBinding = oDataSet.getBinding("items");
							filterValuePrice = filterValuePrice * 1 - filterAmount.getLiveValue() * 1;
							oBinding.filter(new sap.ui.model.Filter("Price", sap.ui.model.FilterOperator.LE,
									filterValuePrice));

							oDataSet.setLeadSelection(-1);
						}
					}),
					filterAmount,
					new sap.ui.commons.Button({
						text : "+",
						press : function() {
							var oDataSet = sap.ui.getCore().byId("oDataSetProducts");
							var test = oDataSet.getItems()[0];
							var oBinding = oDataSet.getBinding("items");
							filterValuePrice = filterValuePrice * 1 + filterAmount.getLiveValue() * 1;
							oBinding.filter(new sap.ui.model.Filter("Price", sap.ui.model.FilterOperator.GE,
									filterValuePrice));

							oDataSet.setLeadSelection(-1);
						}
					}) ],
			opener : priceLink
		}).addStyleClass('largePopup');

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

		var filterAmountWeight = new sap.ui.commons.TextField({
			value : 0.5,
			width : "80px"
		});

		var filterValueWeight = product.Weight * 1;

		var toolPopupWeight = new sap.ui.ux3.ToolPopup({
			autoClose : true,
			content : [
					new sap.ui.commons.Button({
						text : "-",
						press : function() {
							var oDataSet = sap.ui.getCore().byId("oDataSetProducts");
							var test = oDataSet.getItems()[0];
							var oBinding = oDataSet.getBinding("items");
							filterValueWeight = filterValueWeight * 1 - filterAmountWeight.getLiveValue() * 1;
							oBinding.filter(new sap.ui.model.Filter("Weight", sap.ui.model.FilterOperator.LE,
									filterValueWeight));

							oDataSet.setLeadSelection(-1);
						}
					}),
					filterAmountWeight,
					new sap.ui.commons.Button({
						text : "+",
						press : function() {
							var oDataSet = sap.ui.getCore().byId("oDataSetProducts");
							var test = oDataSet.getItems()[0];
							var oBinding = oDataSet.getBinding("items");
							filterValueWeight = filterValueWeight * 1 + filterAmountWeight.getLiveValue() * 1;
							oBinding.filter(new sap.ui.model.Filter("Weight", sap.ui.model.FilterOperator.GE,
									filterValueWeight));

							oDataSet.setLeadSelection(-1);
						}
					}) ],
			opener : weightLink
		}).addStyleClass('largePopup');

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

		var filterAmountWidth = new sap.ui.commons.TextField({
			value : 0.1,
			width : "80px"
		});

		var filterValueWidth = product.DimensionWidth * 1;

		var toolPopupWidth = new sap.ui.ux3.ToolPopup({
			autoClose : true,
			content : [
					new sap.ui.commons.Button({
						text : "-",
						press : function() {
							var oDataSet = sap.ui.getCore().byId("oDataSetProducts");
							var test = oDataSet.getItems()[0];
							var oBinding = oDataSet.getBinding("items");
							filterValueWidth = filterValueWidth * 1 - filterAmountWidth.getLiveValue() * 1;
							oBinding.filter(new sap.ui.model.Filter("DimensionWidth", sap.ui.model.FilterOperator.LE,
									filterValueWidth));

							oDataSet.setLeadSelection(-1);
						}
					}),
					filterAmountWidth,
					new sap.ui.commons.Button({
						text : "+",
						press : function() {
							var oDataSet = sap.ui.getCore().byId("oDataSetProducts");
							var test = oDataSet.getItems()[0];
							var oBinding = oDataSet.getBinding("items");
							filterValueWidth = filterValueWidth * 1 + filterAmountWidth.getLiveValue() * 1;
							oBinding.filter(new sap.ui.model.Filter("DimensionWidth", sap.ui.model.FilterOperator.GE,
									filterValueWidth));

							oDataSet.setLeadSelection(-1);
						}
					}) ],
			opener : widthLink
		}).addStyleClass('largePopup');

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

		var filterAmountDepth = new sap.ui.commons.TextField({
			value : 0.1,
			width : "80px"
		});

		var filterValueDepth = product.DimensionDepth * 1;

		var toolPopupDepth = new sap.ui.ux3.ToolPopup({
			autoClose : true,
			content : [
					new sap.ui.commons.Button({
						text : "-",
						press : function() {
							var oDataSet = sap.ui.getCore().byId("oDataSetProducts");
							var test = oDataSet.getItems()[0];
							var oBinding = oDataSet.getBinding("items");
							filterValueDepth = filterValueDepth * 1 - filterAmountDepth.getLiveValue() * 1;
							oBinding.filter(new sap.ui.model.Filter("DimensionWidth", sap.ui.model.FilterOperator.LE,
									filterValueDepth));

							oDataSet.setLeadSelection(-1);
						}
					}),
					filterAmountDepth,
					new sap.ui.commons.Button({
						text : "+",
						press : function() {
							var oDataSet = sap.ui.getCore().byId("oDataSetProducts");
							var test = oDataSet.getItems()[0];
							var oBinding = oDataSet.getBinding("items");
							filterValueDepth = filterValueDepth * 1 + filterAmountDepth.getLiveValue() * 1;
							oBinding.filter(new sap.ui.model.Filter("DimensionDepth", sap.ui.model.FilterOperator.GE,
									filterValueDepth));

							oDataSet.setLeadSelection(-1);
						}
					}) ],
			opener : depthLink
		}).addStyleClass('largePopup');

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

		// -------------------------------------------------------------------- Depth

		var filterAmountHeight = new sap.ui.commons.TextField({
			value : 0.1,
			width : "80px"
		});

		var filterValueHeight = product.DimensionHeight * 1;

		var toolPopupHeight = new sap.ui.ux3.ToolPopup({
			autoClose : true,
			content : [
					new sap.ui.commons.Button({
						text : "-",
						press : function() {
							var oDataSet = sap.ui.getCore().byId("oDataSetProducts");
							var test = oDataSet.getItems()[0];
							var oBinding = oDataSet.getBinding("items");
							filterValueHeight = filterValueHeight * 1 - filterAmountHeight.getLiveValue() * 1;
							oBinding.filter(new sap.ui.model.Filter("DimensionWidth", sap.ui.model.FilterOperator.LE,
									filterValueHeight));

							oDataSet.setLeadSelection(-1);
						}
					}),
					filterAmountHeight,
					new sap.ui.commons.Button({
						text : "+",
						press : function() {
							var oDataSet = sap.ui.getCore().byId("oDataSetProducts");
							var test = oDataSet.getItems()[0];
							var oBinding = oDataSet.getBinding("items");
							filterValueHeight = filterValueHeight * 1 + filterAmountHeight.getLiveValue() * 1;
							oBinding.filter(new sap.ui.model.Filter("DimensionHeight", sap.ui.model.FilterOperator.GE,
									filterValueHeight));

							oDataSet.setLeadSelection(-1);
						}
					}) ],
			opener : heightLink
		}).addStyleClass('largePopup');

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
	}
});
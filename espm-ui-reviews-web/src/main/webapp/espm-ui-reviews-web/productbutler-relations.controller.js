sap.ui.controller("espm-ui-reviews-web.productbutler-relations", {

	onInit : function() {
		sap.app.viewCache.set("productbutler-relations", this.getView());
	},

	getSimilarProducts : function() {
		var fnSuccess = function(oData, oResponse) {
			alert("Read successful: " + JSON.stringify(oData))
		};

		var fnError = $.proxy(this.showReadError, this);

		sap.app.extensionodatamodel.read("/ProductElos", null, null, true, fnSuccess, fnError);
	},

	updateCarousel : function(oProductsDataSet) {

		that = this;
		var oExtensionODataModel = sap.ui.getCore().getModel("extensionodatamodel");
		var oCarousel = sap.ui.getCore().byId("SimilarProductsCarousel");
		oCarousel.destroyContent();

		// Product Relations successfully fetched
		var fnSuccess = function(oDataProductRelation, oResponse) {
			if (oDataProductRelation.error == undefined) {

				// Link ProductRelations with SimilarProducts
				var fnSuccessSimProd = function(oDataSimilarProducts, oResponse2) {

					// if more than one related product
					if (oDataSimilarProducts.results) {
						for (j = 0; j < oDataSimilarProducts.results.length; ++j) {
							if (oDataSimilarProducts.results[j].ProductId == oDataProductRelation.ProductId) {

								var tmpProductId = oDataSimilarProducts.results[j].RelatedProduct;

								// link with Products from the DataSet and get the Image-Url
								var a = oProductsDataSet.getItems();

								for (i = 0; i < a.length; ++i) {
									if (a[i].getTitle() == tmpProductId) {
										that.addCarouselContent(oCarousel, tmpProductId, a[i].getIconSrc(),
												oProductsDataSet);
									}
								}
							}
						}
						// if just one related product exists
					} else if (oDataSimilarProducts.RelatedProduct) {
						for (i = 0; i < a.length; ++i) {
							if (a[i].getTitle() == oDataSimilarProducts.RelatedProduct) {
								that.addCarouselContent(oCarousel, oDataSimilarProducts.RelatedProduct, a[i]
										.getIconSrc(), oProductsDataSet);
							}
						}
					}
				};
				var fnErrorSimProd = function() {
					return -1;
				};

				oExtensionODataModel.read("/SimilarProducts", null, null, true, fnSuccessSimProd, fnErrorSimProd);

			}
		};

		var fnError = function() {
			return -1;
		};

		oExtensionODataModel.read("/ProductElos('" + document.getElementById("productButlerSelItemTextField").value
				+ "')", null, null, true, fnSuccess, fnError);

	},

	addCarouselContent : function(oCarousel, productId, iconSrc, oProductsDataSet) {
		var that = this;

		oCarousel.addContent(new sap.ui.commons.Image("", {
			src : that.formatter("" + iconSrc),
			alt : "Alternativtext",
			width : "100px",
			height : "75px",
			press : function() {
				document.getElementById("productButlerSelItemTextField").value = "" + productId;
				document.getElementById("productButlerItemPathTextField").value = ""
						+ document.getElementById("productButlerItemPathTextField").value + ";" + productId;

				// TODO update details layout
				that.updateCarousel(oProductsDataSet);

				var fnSuccessProd = function(oData, oResponse) {
					for (i = 0; i < oData.results.length; i++) {
						if (oData.results[i].ProductId == productId) {

							sap.app.viewCache.get("productbutler-details").updateProductDetailsLayout(productId,
									oData.results[i]);
							break; // !
						}
					}
				}

				var fnErrorProd = function() {
					return -1;
				}

				sap.app.odatamodel.read("/Products", null, null, true, fnSuccessProd, fnErrorProd);
			}
		}));
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

	createProductRelations : function(selectedItem, itemPath) {
		// Gewinner --> ELO Win

		// Betrachte die letzten 3 Produkte
		// P4 gewinnt gegen P5, P3 gegen P4 usw., P1 ist der erste Gewinner, erhält seine ELO aber als letzter.
		// hole product id
		// existiert bereits eine Relation?
		// Ja --> ELO anpassen
		// --> nur prüfen ob ähnliches produkt bereits eingetragen
		// ansonsten merken
		// Nein --> Neu anlegen
		// oProductRelation.Elo = get old elo, calculate new one

		var oExtensionODataModel = sap.ui.getCore().getModel("extensionodatamodel");

		var items_tmp = itemPath.split(";");
		var from = 0;
		var to = items_tmp.length - 1;

		if (to > 4) {
			from = items_tmp.length - 3;
		}

		var items = items_tmp.slice(from, to);

		this.updateElosAndCreateNewOnes(items);

		for (var i = 0; i < items.length; ++i) {
			// skip the first one, it's going to be empty because of the semicolon
			if (items[i] != "") {
				var oSimilarProduct = {};
				oSimilarProduct.ProductId = selectedItem;
				oSimilarProduct.CreationDate = new Date().toISOString().replace("Z", "0000");
				oSimilarProduct.RelatedProduct = items[i];
				oSimilarProduct.Responsible_user = "test"; // get current logged in user // create customer review
				var fnSuccess = $.proxy(this.showSuccessMsg, this);
				var fnError = $.proxy(this.showReadError, this);
				oExtensionODataModel.create("/SimilarProducts", oSimilarProduct, null, fnSuccess, fnError);
			}
		}

	},

	updateElosAndCreateNewOnes : function(items) {
		var itemsElo = [];
		var oExtensionODataModel = sap.ui.getCore().getModel("extensionodatamodel");

		// get existing elos for each product or create them
		for (var i = 0; i < items.length; ++i) {
			if (items[i] != "") {
				var fnSuccessProdRel = function(oData, oRequest) {

					var oProductRelation = {};

					// if it already exists store the value else create a new relation
					if (oData.error) {
						var oProductRelation = {};
						oProductRelation.ProductId = "" + items[i];
						oProductRelation.ProductElo = "1400"; // default chess value for starters

						var fnSuccess = function() {
							itemsElo.push(oProductRelation);
						};

						var fnError = $.proxy(this.showReadError, this);
						oExtensionODataModel.create("/ProductElos", oProductRelation, null, fnSuccess, fnError);

					} else {
						oProductRelation.ProductId = oData.ProductId;
						oProductRelation.ProductElo = oData.ProductElo;

						itemsElo.push(oProductRelation);
					}

				}

				var fnErrorProdRel = function() {
					if (items[i] != "") {
						var oProductRelation = {};
						oProductRelation.ProductId = "" + items[i];
						oProductRelation.ProductElo = "1400"; // default chess value for starters

						var fnSuccessCreate = function() {
							itemsElo.push(oProductRelation);
						};

						var fnErrorCreate = $.proxy(this.showReadError, this);
						oExtensionODataModel.create("/ProductElos", oProductRelation, null, fnSuccessCreate,
								fnErrorCreate);
					}
				};

				oExtensionODataModel.read("/ProductElos('" + items[i] + "')", null, null, true, fnSuccessProdRel,
						fnErrorProdRel);
			}
		}

		// update
		for (var i = 0; i < itemsElo.length; ++i) {
			if (i + 1 < itemsElo.length) {
				// rA
				var oEntryA = {};
				oEntryA.ProductId = itemsElo[i].ProductId;
				oEntryA.ProductElo = calculateNewElo(itemsElo[i].ProductElo, itemsElo[i + 1].ProductElo, false); // rB
				// is
				// the
				// winner

				var oParamsA = {};
				oParamsA.fnSuccess = function() {
					alert("Update successful");
				};
				oParamsA.fnError = function() {
					alert("Update failed");
				};
				oParamsA.bMerge = true;
				oExtensionODataModel.update("/ProductElos('" + selectedItem + "')", oEntryA, oParamsA);

				// rB
				var oEntryB = {};
				oEntryB.ProductId = itemsElo[i + 1].ProductId;
				oEntryB.ProductElo = calculateNewElo(itemsElo[i].ProductElo, itemsElo[i + 1].ProductElo, true); // rB is
				// the
				// winner

				var oParamsB = {};
				oParamsB.fnSuccess = function() {
					alert("Update successful");
				};
				oParamsB.fnError = function() {
					alert("Update failed");
				};
				oParamsB.bMerge = true;
				oExtensionODataModel.update("/ProductElos('" + selectedItem + "')", oEntryB, oParamsB);
			}
		}

	},

	calculateNewElo : function(rA, rB, win) {
		var pow_term = ((rB - rA) / 400);
		var bottom = 1 + Math.pow(10, pow_term);
		var eA = 1 / bottom;
		var sA = 0;

		if (win) {
			sA = 1;
		}

		return (rA + 15 * (sA - eA));
	}
});

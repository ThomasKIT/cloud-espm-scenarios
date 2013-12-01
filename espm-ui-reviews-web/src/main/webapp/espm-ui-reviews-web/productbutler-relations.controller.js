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

	updateCarousel : function(oProductsDataSet) {
		that = this;
		var oCarousel = sap.ui.getCore().byId("SimilarProductsCarousel");
		var selectedItem = sap.ui.getCore().byId("productButlerSelItemTextField");
		var oExtensionODataModel = sap.ui.getCore().getModel("extensionodatamodel");
		oCarousel.destroyContent();

		// Product Relations successfully fetched
		var fnSuccess = function(oData, oResponse) {
			if (oData.error == undefined) {

				// Link ProductRelations with SimilarProducts
				var fnSuccessSimProd = function(oData2, oResponse2) {

					// TODO for each one
					// link with Products from the DataSet and get the Image-Url
					var a = oProductsDataSet.getItems();

					for (i = 0; i < a.length; ++i) {
						if (a[i].getTitle() == oData2.RelatedProduct) {
							oCarousel.addContent(new sap.ui.commons.Image("", {
								src : that.formatter("" + a[i].getIconSrc()),
								alt : "Alternativtext",
								width : "100px",
								height : "75px",
								press : function() {
									document.getElementById("productButlerSelItemTextField").value = ""
											+ oData2.RelatedProduct;
									document.getElementById("productButlerItemPathTextField").value = ""
											+ document.getElementById("productButlerItemPathTextField").value + ";"
											+ oData2.RelatedProduct;

									// TODO update details layout
								}
							}));
						}
					}
				}
				var fnErrorSimProd = function() {
					return -1;
				}

				oExtensionODataModel.read("/SimilarProducts('" + oData.ProductId + "')", null, null, true,
						fnSuccessSimProd, fnErrorSimProd);

			}
		}

		var fnError = function() {
			return -1;
		}

		oExtensionODataModel.read("/ProductRelations('"
				+ document.getElementById("productButlerSelItemTextField").value + "')", null, null, true, fnSuccess,
				fnError);

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

		var items_tmp = itemPath.split(";");
		var from = 0;
		var to = items_tmp.length - 1;

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
		oProductRelation.ProductId = selectedItem;
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
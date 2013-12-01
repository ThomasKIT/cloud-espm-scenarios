sap.ui.controller("espm-ui-reviews-web.productbutler-dataset", {

	onInit : function() {
		sap.app.viewCache.set("productbutler-dataset", this.getView());
	},

	updateCarousel : function(oProductsDataSet) {
		that = this;

		var selectedItem = sap.ui.getCore().byId("productButlerSelItemTextField");
		var oExtensionODataModel = sap.ui.getCore().getModel("extensionodatamodel");
		var oCarousel = sap.ui.getCore().byId("SimilarProductsCarousel");

		var fnSuccess = function(oData, oResponse) {
			if (oData.error == undefined) {

				// ProductRelations mit ALLEN SimilarProducts linken
				var fnSuccessSimProd = function(oData2, oResponse2) {

					// TODO FÜR ALLE
					// mit Products linken und Bilddaten ermitteln
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

									alert(a[i]);
									sap.app.viewCache.get("productbutler-details").updateProductDetailsLayout(a[i]);
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
	}
});
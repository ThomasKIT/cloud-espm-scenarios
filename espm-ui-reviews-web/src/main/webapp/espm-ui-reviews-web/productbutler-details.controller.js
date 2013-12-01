sap.ui.controller("espm-ui-reviews-web.productbutler-details",
		{
			onInit : function() {
				sap.app.viewCache.set("productbutler-details", this.getView());
			},

			createProductRelations : function() {
				var selectedItem = document.getElementById("productButlerSelItemTextField").value;
				var itemPath = document.getElementById("productButlerItemPathTextField").value;

				sap.app.viewCache.get("productbutler-relations").getController().createProductRelations(selectedItem,
						itemPath);
			}
		});
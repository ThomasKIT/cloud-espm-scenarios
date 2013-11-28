sap.ui.jsview("espm-ui-reviews-web.productinfo", {

	oProductListItemTemplate : new sap.ui.core.ListItem({
		key : "{ProductId}",
		text : "{Name}"
	}),

	oProductDetailsLayout : null,

	getControllerName : function() {
		return "espm-ui-reviews-web.productinfo";
	},

	createContent : function(oController) {
		var oCommentField = new sap.ui.commons.TextField({
			id : "huhutextfield", // sap.ui.core.ID
			value : ''
		});

		this.oProductDetailsLayout = this.createProductDetailsLayout();

		var oLayout = new sap.ui.commons.layout.VerticalLayout({
			content : [ oCommentField, new sap.ui.commons.Label({
				text : "{i18n>PRODUCT_DETAILS_LABEL}"
			}), this.oProductDetailsLayout ]
		});

		return oLayout;
	},

	createProductDetailsLayout : function() {
		var oVerticalProductNameDescLayout = new sap.ui.commons.layout.VerticalLayout({
			width : "500px",
			content : [ new sap.ui.commons.TextView({
				id : "productbutler-selected-product-name-view-id",
				text : "{Name}",
			}), new sap.ui.commons.TextView({
				id : "productbutler-selected-product-desc-view-id",
				text : "{ShortDescription}",
			}) ]
		}).addStyleClass("layoutPaddingProductDetails");

		return new sap.ui.commons.layout.HorizontalLayout({
			content : [
					new sap.ui.commons.Image({
						id : "productbutler-selected-product-image-id",
						src : {
							path : "PictureUrl",
							formatter : function(src) {
								if (!src) {
									return (sap.app.config.productPlaceholderImg);
								} else {
									var re = /.JPG/g;
									src = src.replace(re, ".jpg");
									return (sap.app.utility.getBackendImagesDestination()
											+ sap.app.utility.getImagesBaseUrl() + src);
								}
							}
						},
						width : "75px",
						height : "75px"
					}), oVerticalProductNameDescLayout ]
		});
	},

	setProductFilter : function(aFilter) {
		var oController = this.getController();
		var oOldBinding = this.oProductsDropdownBox.getBinding("items");
		if (oOldBinding) {
			oOldBinding.detachChange(oController.selectedProductChanged, oController);
		}
		this.oProductsDropdownBox.bindItems("/Products", this.oProductListItemTemplate, new sap.ui.model.Sorter("Name",
				false), aFilter);
		this.oProductsDropdownBox.getBinding("items").attachChange(oController.selectedProductChanged, oController);
	},

	getSelectedProductItem : function() {
		return document.getElementById("huhutextfield").value;
	}
});
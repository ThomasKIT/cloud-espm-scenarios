sap.ui.jsview("espm-ui-reviews-web.productbutler-dataset", {

	oAverageRatingIndicator : null,

	getControllerName : function() {
		return "espm-ui-reviews-web.customer-reviews";
	},

	oProductListItemTemplate : new sap.ui.core.ListItem({
		key : "{ProductId}",
		text : "{Name}"
	}),

	createContent : function(oController) {
		// Create a custom control as template for the Dataset items
		sap.ui.core.Control.extend("ItemLayout", {
			metadata : {
				aggregations : {
					"link" : {
						type : "sap.ui.commons.Link",
						multiple : false
					},
					"image" : {
						type : "sap.ui.commons.Image",
						multiple : false
					},
					"form" : {
						type : "sap.ui.commons.form.Form",
						multiple : false
					},
				}
			},

			renderer : function(rm, ctrl) {
				rm.write("<div");
				rm.writeControlData(ctrl);
				rm.writeAttribute("class", "CustomItemLayout");
				rm.write("><div");
				rm.writeAttribute("class", "CustomItemLayoutInner");
				rm.write("><div");
				rm.writeAttribute("class", "CustomItemLayoutTitle");
				rm.write(">");
				rm.renderControl(ctrl.getImage());
				rm.write("<div>");
				rm.renderControl(ctrl.getLink());
				rm.write("</div></div><div");
				rm.writeAttribute("class", "CustomItemLayoutCntnt");
				rm.write(">");
				rm.renderControl(ctrl.getForm());
				rm.write("</div></div></div>");
			},

			onBeforeRendering : function() {
				if (this.resizeTimer) {
					clearTimeout(this.resizeTimer);
					this.resizeTimer = null;
				}
			},

			onAfterRendering : function() {
				var $This = this.$();
				if ($This.parent().parent().hasClass("sapUiUx3DSSVSingleRow")) {
					this._resize();
				} else {
					$This.addClass("CustomItemLayoutSmall");
				}
			},

			_resize : function() {
				if (!this.getDomRef()) {
					return;
				}
				var $This = this.$();
				if ($This.outerWidth() >= 440) {
					$This.removeClass("CustomItemLayoutSmall").addClass("CustomItemLayoutLarge");
				} else {
					$This.removeClass("CustomItemLayoutLarge").addClass("CustomItemLayoutSmall");
				}
				setTimeout(jQuery.proxy(this._resize, this), 300);
			}
		});

		// Initialize the example data and the model
		var data = {
			products : []
		};
		/*
		 * var aTitles = [ "Notebook Basic", "UMTS PDA", "Easy Hand", "Deskjet Super Highspeed", "Copperberry
		 * Cellphone", "Notebook LCD Display", "PC Power Station", "Gaming Monster Pro", "ITelO FlexTop I4000", "ITelO
		 * FlexTop I6300c", "Goldberry Cellphone", "ITelO FlexTop I9100", "Notebook Professional", "Smart Office",
		 * "Deskjet Super Highspeed", "Notebook Basic XS" ]; for (var i = 0; i < aTitles.length; i++) { var sTitle =
		 * aTitles[i]; var oProduct = { id : "" + i, price : Math.floor((Math.random() * 1000)) + 1 + " $", category :
		 * "PC", title : sTitle, rating : Math.floor((Math.random() * 5)) + 1 }; if (sTitle.indexOf("Notebook") >= 0) {
		 * oProduct.category = "Notebook"; } else if (sTitle.indexOf("Cellphone") >= 0 || sTitle.indexOf("PDA") >= 0) {
		 * oProduct.category = "Mobile"; } oProduct.image = "images/" + oProduct.category + ".png";
		 * data.products.push(oProduct); }
		 * 
		 * var oModel = new sap.ui.model.json.JSONModel();
		 */
		// var oModel = new sap.ui.model.odata.ODataModel(sap.app.utility.getBackendDestination(), true);
		var oModel = sap.app.odatamodel;

		// Initialize the Dataset and the layouts
		function createTemplate() {
			var c = sap.ui.commons;
			return new ItemLayout({
				image : new c.Image({
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
				}),
				link : new c.Link({
					text : "{Name}"
				}),
				form : new c.form.Form({
					width : "80%",
					layout : new c.form.GridLayout(),
					formContainers : [ new c.form.FormContainer({
						formElements : [ new c.form.FormElement({
							label : new c.Label({
								text : "Preis",
								layoutData : new c.form.GridElementData({
									hCells : "5"
								})
							}),
							fields : [ new c.TextField({
								value : "{Price}",
								editable : false
							}) ]
						}), new c.form.FormElement({
							label : new c.Label({
								text : "Wertung",
								layoutData : new c.form.GridElementData({
									hCells : "5"
								})
							}),
							fields : [ new c.RatingIndicator({
								value : "{rating}",
								editable : false
							}) ]
						}) ]
					}) ]
				})
			});
		}

		var oDataSet = new sap.ui.ux3.DataSet({
			items : {
				path : "/Products",
				template : new sap.ui.ux3.DataSetItem({
					title : "{Name}",
					iconSrc : "{PictureUrl}"
				})
			},
			views : [ new sap.ui.ux3.DataSetSimpleView({
				name : "Floating, responsive View",
				icon : "",
				iconHovered : "",
				iconSelected : "",
				floating : true,
				responsive : true,
				itemMinWidth : 200,
				template : createTemplate()
			}) ],
			search : function search(oEvent) {
				var sQuery = oEvent.getParameter("query");
				var oBinding = oDataSet.getBinding("items");
				oBinding.filter(!sQuery ? [] : [ new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains,
						sQuery) ]);
				oDataSet.setLeadSelection(-1);
			},
			selectionChanged : function search(oEvent) {
				var idx = oEvent.getParameter("newLeadSelectedIndex");
				// alert("Product '" + oDataSet.getItems()[idx].getTitle() + "' selected.'");
				document.getElementById("huhutextfield").value = "" + oDataSet.getItems()[idx].getTitle();

			}
		});
		oDataSet.setModel(oModel);
		// oDataSet.placeAt("sample1");
		return oDataSet;
	}
});
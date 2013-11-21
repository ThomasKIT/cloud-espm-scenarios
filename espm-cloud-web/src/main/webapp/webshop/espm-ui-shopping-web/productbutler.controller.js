sap.ui.controller("espm-ui-shopping-web.productbutler", {
	onInit : function() {
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
		var aTitles = [ "Notebook Basic", "UMTS PDA", "Easy Hand", "Deskjet Super Highspeed", "Copperberry Cellphone",
				"Notebook LCD Display", "PC Power Station", "Gaming Monster Pro", "ITelO FlexTop I4000",
				"ITelO FlexTop I6300c", "Goldberry Cellphone", "ITelO FlexTop I9100", "Notebook Professional",
				"Smart Office", "Deskjet Super Highspeed", "Notebook Basic XS" ];
		for (var i = 0; i < aTitles.length; i++) {
			var sTitle = aTitles[i];
			var oProduct = {
				id : "" + i,
				price : Math.floor((Math.random() * 1000)) + 1 + " $",
				category : "PC",
				title : sTitle,
				rating : Math.floor((Math.random() * 5)) + 1
			};
			if (sTitle.indexOf("Notebook") >= 0) {
				oProduct.category = "Notebook";
			} else if (sTitle.indexOf("Cellphone") >= 0 || sTitle.indexOf("PDA") >= 0) {
				oProduct.category = "Mobile";
			}
			oProduct.image = "images/" + oProduct.category + ".png";
			data.products.push(oProduct);
		}

		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData(data);

		// Initialize the Dataset and the layouts
		function createTemplate() {
			var c = sap.ui.commons;
			return new ItemLayout({
				link : new c.Link({
					text : "{title}"
				}),
				image : new c.Image({
					src : "{image}"
				}),
				form : new c.form.Form({
					width : "100%",
					layout : new c.form.GridLayout(),
					formContainers : [ new c.form.FormContainer({
						formElements : [ new c.form.FormElement({
							label : new c.Label({
								text : "Category",
								layoutData : new c.form.GridElementData({
									hCells : "5"
								})
							}),
							fields : [ new c.TextField({
								value : "{category}",
								editable : false
							}) ]
						}), new c.form.FormElement({
							label : new c.Label({
								text : "Price",
								layoutData : new c.form.GridElementData({
									hCells : "5"
								})
							}),
							fields : [ new c.TextField({
								value : "{price}",
								editable : false
							}) ]
						}), new c.form.FormElement({
							label : new c.Label({
								text : "Rating",
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
				path : "/products",
				template : new sap.ui.ux3.DataSetItem({
					title : "{title}",
					iconSrc : "{image}"
				})
			},
			views : [ new sap.ui.ux3.DataSetSimpleView({
				name : "Floating, non-responsive View",
				icon : "images/tiles.png",
				iconHovered : "images/tiles2_hover.png",
				iconSelected : "images/tiles2_hover.png",
				floating : true,
				responsive : false,
				itemMinWidth : 0,
				template : createTemplate()
			}), new sap.ui.ux3.DataSetSimpleView({
				name : "Floating, responsive View",
				icon : "images/tiles.png",
				iconHovered : "images/tiles_hover.png",
				iconSelected : "images/tiles_hover.png",
				floating : true,
				responsive : true,
				itemMinWidth : 200,
				template : createTemplate()
			}), new sap.ui.ux3.DataSetSimpleView({
				name : "Single Row View",
				icon : "images/list.png",
				iconHovered : "images/list_hover.png",
				iconSelected : "images/list_hover.png",
				floating : false,
				responsive : false,
				itemMinWidth : 0,
				template : createTemplate()
			}) ],
			search : function search(oEvent) {
				var sQuery = oEvent.getParameter("query");
				var oBinding = oDataSet.getBinding("items");
				oBinding.filter(!sQuery ? [] : [ new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.Contains,
						sQuery) ]);
				oDataSet.setLeadSelection(-1);
			},
			selectionChanged : function search(oEvent) {
				var idx = oEvent.getParameter("newLeadSelectedIndex");
				alert("Product '" + oDataSet.getItems()[idx].getTitle() + "' selected.'");
			}
		});
		oDataSet.setModel(oModel);
		oDataSet.placeAt("productDataSet");
	},

});

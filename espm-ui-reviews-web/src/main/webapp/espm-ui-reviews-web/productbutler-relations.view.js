sap.ui.jsview("espm-ui-reviews-web.productbutler-relations", {
	createContent : function(oController) {
		// auskommentiert, wird nun in den Produktdetails eingebunden durch Aufruf von makeCarousel
		return this.makeCarousel();
	},

	getControllerName : function() {
		return "espm-ui-reviews-web.productbutler-relations";
	},

	makeCarousel : function() {
		// Create the Carousel control
		var oCarousel = new sap.ui.commons.Carousel("SimilarProductsCarousel");
		oCarousel.setWidth("400px");
		oCarousel.setOrientation("horizontal");

		return oCarousel;
	}
});
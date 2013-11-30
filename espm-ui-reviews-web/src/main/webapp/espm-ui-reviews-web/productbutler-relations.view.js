sap.ui.jsview("espm-ui-reviews-web.productbutler-relations", {
	createContent : function(oController) {
		return this.makeCarousel();
	},

	getControllerName : function() {
		return "espm-ui-reviews-web.productbutler-relations";
	},

	makeCarousel : function(oContentArray) {
		// Create the Carousel control
		var oCarousel = new sap.ui.commons.Carousel("SimilarProductsCarousel");
		oCarousel.setWidth("700px");
		oCarousel.setOrientation("horizontal");

		// oCarousel.addContent(new sap.ui.commons.Image("", {
		// src : "images/carousel/img1.jpg",
		// alt : "sample image",
		// width : "100px",
		// height : "75px"
		// }));

		// oCarousel.addContent(new sap.ui.commons.Image("", {
		// src : "images/carousel/img2.jpg",
		// alt : "sample image",
		// width : "100px",
		// height : "75px"
		// }));

		// oCarousel.addContent(new sap.ui.commons.Image("", {
		// src : "images/carousel/img3.jpg",
		// alt : "sample image",
		// width : "100px",
		// height : "75px"
		// }));

		// oCarousel.addContent(new sap.ui.commons.Image("", {
		// src : "images/carousel/img4.jpg",
		// alt : "sample image",
		// width : "100px",
		// height : "75px"
		// }));

		// oCarousel.addContent(new sap.ui.commons.Image("", {
		// src : "images/carousel/img5.jpg",
		// alt : "sample image",
		// width : "100px",
		// height : "75px"
		// }));

		// oCarousel.addContent(new sap.ui.commons.Image("", {
		// src : "images/carousel/img6.jpg",
		// alt : "sample image",
		// width : "100px",
		// height : "75px"
		// }));

		return oCarousel;
	}
});
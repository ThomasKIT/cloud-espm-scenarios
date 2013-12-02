package com.sap.espm.model.extension.data;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sap.espm.model.extension.CustomerReview;
import com.sap.espm.model.extension.ProductRelation;
import com.sap.espm.model.extension.SimilarProduct;

/**
 * Data loader tool for loading JPA entities (here customer reviews) into the
 * db.
 */
public class DataLoader {

	private static Logger logger = LoggerFactory.getLogger(DataLoader.class);
	private final EntityManagerFactory emf;

	public DataLoader(EntityManagerFactory emf) {
		this.emf = emf;
	}

	/**
	 * Load customer reviews.
	 */
	public void loadData() {
		EntityManager em = emf.createEntityManager();
		try {
			persistSampleCustomerReview(em);
			persistSampleProductRelations(em);
			logNumberOfCustomerReviews(em);
		} catch (Exception e) {
			logger.error("Exception occured", e);
		} finally {
			em.close();
		}
	}

	private void persistSampleProductRelations(EntityManager em)
			throws ParseException {
		Calendar cal = Calendar.getInstance();
		Date date = null;
		DateFormat formatter = new SimpleDateFormat("yyyymmdd");

		try {

			// ;HT-1000;HT-1001;HT-1002;HT-1003;HT-1010;HT-1011
			// manuelles Handling der Beziehung
			// vorerst nur eine Richtung um Applikation fertigzustellen

			date = formatter.parse("19770707");
			cal.setTime(date);

			em.getTransaction().begin();

			ProductRelation relations = new ProductRelation();

			// HT-1000
			// Creating the relation
			relations.setProductId("HT-1000");
			relations.setProductElo(2100);
			em.persist(relations);

			// // Similar products
			SimilarProduct relatedProducts = new SimilarProduct();
			relatedProducts.setProductId("HT-1000");
			relatedProducts.setRelatedProduct("HT-1002");
			relatedProducts.setResponsible_user("system");
			em.persist(relatedProducts);
			// relatedProducts = new SimilarProduct();
			// relatedProducts.setProductRelationId("HT-1000");
			// relatedProducts.setRelatedProduct("HT-1003");
			// relatedProducts.setResponsible_user("system");
			// em.persist(relatedProducts);
			// relatedProducts = new SimilarProduct();
			// relatedProducts.setProductRelationId("HT-1000");
			// relatedProducts.setRelatedProduct("HT-1011");
			// relatedProducts.setResponsible_user("system");
			// em.persist(relatedProducts);
			//
			// // HT-1001
			// // Creating the relation
			// relations.setProductId("HT-1001");
			// relations.setProductElo(1700);
			// em.persist(relations);
			//
			// // Similar products
			// relatedProducts = new SimilarProduct();
			// relatedProducts.setProductRelationId("HT-1001");
			// relatedProducts.setRelatedProduct("HT-1002");
			// relatedProducts.setResponsible_user("system");
			// em.persist(relatedProducts);
			// relatedProducts = new SimilarProduct();
			// relatedProducts.setProductRelationId("HT-1001");
			// relatedProducts.setRelatedProduct("HT-1003");
			// relatedProducts.setResponsible_user("system");
			// em.persist(relatedProducts);

			em.getTransaction().commit();
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
		}

	}

	/**
	 * Persist one customer
	 * 
	 * @param em
	 *            Entity Manager
	 * @throws ParseException
	 */
	private void persistSampleCustomerReview(EntityManager em)
			throws ParseException {
		Calendar cal = Calendar.getInstance();
		Date date = null;
		DateFormat formatter = new SimpleDateFormat("yyyymmdd");
		try {
			date = formatter.parse("19770707");
			cal.setTime(date);
			em.getTransaction().begin();

			CustomerReview customerReview = new CustomerReview();
			customerReview
					.setComment("This product is really great. I like especially the design, speed and performance");
			customerReview.setRating("5");
			customerReview.setFirstName("John");
			customerReview.setLastName("Smith");
			customerReview.setProductId("HT-2001");
			customerReview.setCreationDate(cal);

			em.persist(customerReview);
			em.getTransaction().commit();
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
		}
	}

	/**
	 * Get number of customer reviews in database
	 * 
	 * @param em
	 *            Entity Manager
	 * @return number of customers
	 */
	private void logNumberOfCustomerReviews(EntityManager em) {
		TypedQuery<CustomerReview> queryCustomerReview = em.createQuery(
				"SELECT cr FROM CustomerReview cr", CustomerReview.class);
		List<CustomerReview> resCustomerReview = queryCustomerReview
				.getResultList();
		logger.info(resCustomerReview.size()
				+ " CustomerReview loaded in the db");
	}
}
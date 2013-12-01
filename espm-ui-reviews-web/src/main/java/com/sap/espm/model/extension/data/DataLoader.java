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

		try {

			// ;HT-1000;HT-1001;HT-1002;HT-1003;HT-1010;HT-1011
			// manuelles Handling der Beziehung
			// vorerst nur eine Richtung um Applikation fertigzustellen

			em.getTransaction().begin();

			persistRelation(em, "HT-1003", 2100, new String[] { "HT-1003",
					"HT-1010", "HT-1011", "HT-1021", "HT-1020" });

			persistRelation(em, "HT-1002", 2100, new String[] { "HT-1000",
					"HT-1001", "HT-1011" });

			persistRelation(em, "HT-1011", 2100, new String[] { "HT-1000" });

			em.getTransaction().commit();
		} finally {
			if (em.getTransaction().isActive()) {
				em.getTransaction().rollback();
			}
		}

	}

	private void persistRelation(EntityManager em, String productA,
			int productAElo, String[] relatedProducts) throws ParseException {

		Calendar cal = Calendar.getInstance();
		Date date = null;
		DateFormat formatter = new SimpleDateFormat("yyyymmdd");
		date = formatter.parse("19770707");
		cal.setTime(date);

		ProductRelation entity = new ProductRelation();

		// Creating the relation
		entity.setProductId(productA);
		entity.setProductElo(productAElo);
		em.persist(entity);

		// Similar products
		for (String product : relatedProducts) {
			SimilarProduct relation = new SimilarProduct();

			relation.setProductId(productA);
			relation.setRelatedProduct(product);
			relation.setCreationDate(cal);
			relation.setResponsible_user("system");
			em.persist(relation);
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
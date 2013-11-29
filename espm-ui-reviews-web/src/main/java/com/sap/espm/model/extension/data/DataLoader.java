package com.sap.espm.model.extension.data;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sap.espm.model.extension.CustomerReview;
import com.sap.espm.model.extension.ProductRelation;
import com.sap.espm.model.extension.ProductSimilarity;

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
			date = formatter.parse("19770707");
			cal.setTime(date);

			em.getTransaction().begin();

			ProductRelation relations = new ProductRelation();
			List<ProductSimilarity> similarities = new LinkedList<ProductSimilarity>();

			// Similar products
			ProductSimilarity relatedProduct = new ProductSimilarity();
			relatedProduct.setProductRelationId(1);
			List<String> productIDs = new ArrayList<String>();
			productIDs.add("Produkt A");
			productIDs.add("Produkt B");
			relatedProduct.setRelatedProducts(productIDs);
			relatedProduct.setResponsible_user("system");

			// Creating the relation to those similar products
			relations.setProductRelationId(1);
			relations.setProductId("Produkt C");
			relations.setProductElo(2100);
			relations.setRelations(similarities);

			em.persist(relations);
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
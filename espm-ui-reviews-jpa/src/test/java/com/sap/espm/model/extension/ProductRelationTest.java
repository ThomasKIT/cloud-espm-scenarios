package com.sap.espm.model.extension;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.text.ParseException;
import java.util.List;

import javax.persistence.EntityManager;

import org.junit.Before;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sap.espm.model.extension.util.TestFactory;

public class ProductRelationTest extends AbstractTest {
	EntityManager em;
	TestFactory testFactory;
	long relationsID;
	private static Logger logger;

	@Before
	public void initTest() {
		this.em = emf.createEntityManager();
		this.testFactory = new TestFactory();
		this.relationsID = 1;
		ProductRelationTest.logger = LoggerFactory
				.getLogger(TestFactory.class);
	}

	@Test
	public void testCreationAndDeletion() throws ParseException {
		ProductRelation relations = null;

		EntityManager em = emf.createEntityManager();
		TestFactory testFactory = new TestFactory();
		try {
			// add customer review
			assertTrue("creation failed",
					testFactory.createProductRelations(em, relationsID));

			em.getTransaction().begin();
			// search for customer review
			relations = em.find(ProductRelation.class, relationsID);
			assertNotNull("Search for product relations failed with id: "
					+ relationsID, relations);
			// testFactory.deleteProductRelations(em, relationsID);
		} finally {
			em.close();
		}
	}

	// Vorgezogener Test, betrachten des Services direkt:
	// https://productbutlerp1940225425trial.hanatrial.ondemand.com/espm-ui-reviews-web/espm.svc/ProductRelationss
	// Alternativ: Auskommentierung entfernen und Test laufen lassen
	// @Test
	public void testSelection() {

		try {
			em.getTransaction().begin();

			// Selektieren
			List<ProductRelation> allRelations = this.testFactory
					.getProductRelations(em);

			// Ausgabe
			if (allRelations != null & allRelations.size() > 0) {
				for (ProductRelation item : allRelations) {
					logger.info(item.toString());
				}
			}
		} finally {
			em.close();
		}
	}

	@Test
	public void testCreation() throws ParseException {
		ProductRelation relations = null;
		this.relationsID = 2;

		EntityManager em = emf.createEntityManager();
		TestFactory testFactory = new TestFactory();
		try {
			// add customer review
			assertTrue("creation failed",
					testFactory.createProductRelations(em, relationsID));

		} finally {
			em.close();
		}
	}
}

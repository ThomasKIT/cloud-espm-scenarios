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

public class ProductRelationsTest extends AbstractTest {
	EntityManager em;
	TestFactory testFactory;
	long relationsID;
	private static Logger logger;

	@Before
	public void initTest() {
		this.em = emf.createEntityManager();
		this.testFactory = new TestFactory();
		this.relationsID = 1;
		ProductRelationsTest.logger = LoggerFactory
				.getLogger(TestFactory.class);
	}

	@Test
	public void testDeletion() throws ParseException {
		ProductRelations relations = null;

		logger.info("Trying to delete the entity: " + this.relationsID);
		try {
			em.getTransaction().begin();

			// Beziehung suchen
			relations = em.find(ProductRelations.class, relationsID);
			assertNotNull("Search for product relations failed with id: "
					+ relationsID, relationsID);

			// Beziehung löschen
			testFactory.deleteProductRelations(em, relationsID);
		} finally {
			em.close();
		}
	}

	@Test
	public void testCreation() throws ParseException {
		try {
			em.getTransaction().begin();

			// Beziehung erstellen
			assertTrue("Couldn't create the ProductRelation",
					testFactory.createProductRelations(em, relationsID));

			// Cleaning up
			// Beziehung suchen
			ProductRelations relations = null;

			relations = em.find(ProductRelations.class, relationsID);
			assertNotNull("Search for product relations failed with id: "
					+ relationsID, relationsID);

			// Beziehung löschen
			testFactory.deleteProductRelations(em, relationsID);

		} finally {
			em.close();
		}
	}

	@Test
	public void testSelection() {
		initTest();

		try {
			em.getTransaction().begin();

			// Selektieren
			List<ProductRelations> allRelations = this.testFactory
					.getProductRelations(em);

			// Ausgabe
			for (ProductRelations item : allRelations) {
				logger.info(item.toString());
			}
		} finally {
			em.close();
		}
	}
}

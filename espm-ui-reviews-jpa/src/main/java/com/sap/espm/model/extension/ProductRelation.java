package com.sap.espm.model.extension;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Entity implementation class for entity Product Relations
 */

@Entity
@Table(name = "ESPM_EXTENSION_PRODUCT_RELATIONS")
public class ProductRelation implements Serializable {

	private static final Integer STARTING_RX_ELO = 1400;

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "PRODUCT_ID")
	private String productId;

	List<ProductSimilarity> relations;

	@Column(name = "PRODUCT_ELO")
	private Integer productElo;

	public int getProductElo() {
		if (productElo == null || productElo < 0 || productElo == 0) {

			productElo = STARTING_RX_ELO;
		}

		return productElo;
	}

	public void setProductElo(int productElo) {
		this.productElo = productElo;
	}

	public List<ProductSimilarity> getRelations() {
		return relations;
	}

	public void setRelations(List<ProductSimilarity> relations) {
		this.relations = relations;
	}

	public long getProductRelationId() {
		return id;
	}

	public void setProductRelationId(long id) {
		this.id = id;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public ProductRelation() {
		super();
	}

}

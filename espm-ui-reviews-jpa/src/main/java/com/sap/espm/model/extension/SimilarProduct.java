package com.sap.espm.model.extension;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "ESPM_SIMILAR_PRODUCTS")
public class SimilarProduct implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "PRODUCT_ID")
	private String productId;

	@Column(name = "RESPONSIBLE_USER")
	private String responsible_user;

	@Column(name = "RELATED_PRODUCT")
	private String relatedProduct;

	@Column(name = "DATE_OF_CREATION")
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar creationDate;

	public String getResponsible_user() {
		return responsible_user;
	}

	public void setResponsible_user(String responsible_user) {
		this.responsible_user = responsible_user;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductRelationId(String productId) {
		this.productId = productId;
	}

	public Calendar getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Calendar creationDate) {
		this.creationDate = creationDate;
	}

	public String getRelatedProduct() {
		return relatedProduct;
	}

	public void setRelatedProduct(String relatedProduct) {
		this.relatedProduct = relatedProduct;
	}

}

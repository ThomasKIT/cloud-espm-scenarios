package com.sap.espm.model.extension;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Entity implementation class for entity CustomerReview
 */

@Entity
@Table(name = "ESPM_EXTENSION_PRODUCT_RELATIONS")
public class ProductRelations implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long productRelationId;

	@Column(name = "PRODUCT_ID", length = 10)
	private String productId;

	@Column(name = "DATE_OF_CREATION")
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar creationDate;

	@Column(name = "RESPONSIBLE_USERE", length = 40)
	private String responsible_user;

	public long getProductRelationId() {
		return productRelationId;
	}

	public void setProductRelationId(long productRelationId) {
		this.productRelationId = productRelationId;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public Calendar getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Calendar creationDate) {
		this.creationDate = creationDate;
	}

	public String getResponsible_user() {
		return responsible_user;
	}

	public void setResponsible_user(String responsible_user) {
		this.responsible_user = responsible_user;
	}

	public ProductRelations() {
		super();
	}

}

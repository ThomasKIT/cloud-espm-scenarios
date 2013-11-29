package com.sap.espm.model.extension;

import java.util.Calendar;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "ESPM_EXTENSION_PRODUCT_SIMILARITY")
public class ProductSimilarity {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "PRODUCT_RELATION_ID")
	private long productRelationId;

	@Column(name = "RESPONSIBLE_USER")
	private String responsible_user;

	@Column(name = "RELATED_PRODUCTS")
	List<String> relatedProducts;

	@Column(name = "DATE_OF_CREATION")
	@Temporal(TemporalType.TIMESTAMP)
	private Calendar creationDate;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getResponsible_user() {
		return responsible_user;
	}

	public void setResponsible_user(String responsible_user) {
		this.responsible_user = responsible_user;
	}

	public List<String> getRelatedProducts() {
		return relatedProducts;
	}

	public void setRelatedProducts(List<String> relatedProducts) {
		this.relatedProducts = relatedProducts;
	}

	public long getProductRelationId() {
		return productRelationId;
	}

	public void setProductRelationId(long productRelationId) {
		this.productRelationId = productRelationId;
	}

	public Calendar getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Calendar creationDate) {
		this.creationDate = creationDate;
	}

}

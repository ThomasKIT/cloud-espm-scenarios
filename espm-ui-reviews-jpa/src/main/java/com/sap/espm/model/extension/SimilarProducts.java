package com.sap.espm.model.extension;

import java.util.Calendar;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name = "ESPM_SIMILAR_PRODUCTS")
public class SimilarProducts {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Column(name = "PRODUCT_RELATION_ID")
	private long productRelationId;

	@Column(name = "RESPONSIBLE_USER")
	private String responsible_user;

	@ElementCollection
	private Set<String> relatedProducts = new HashSet();

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

	public Set<String> getRelatedProducts() {
		return relatedProducts;
	}

	public void setRelatedProducts(Set<String> relatedProducts) {
		this.relatedProducts = relatedProducts;
	}

}

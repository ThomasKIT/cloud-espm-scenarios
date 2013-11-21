package com.sap.espm.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class AdditionalProductInformation implements Serializable {

	private static final long serialVersionUID = 1L;

	public AdditionalProductInformation() {
	}

	@Id
	@OneToOne
	@JoinColumn(name = "ESPM_PRODUCT_PRODUCT_ID", referencedColumnName = "PRODUCT_ID")
	private Product product;
	private StringBuilder info_xml;

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product param) {
		this.product = param;
	}

	public StringBuilder getInfo_xml() {
		return info_xml;
	}

	public void setInfo_xml(StringBuilder param) {
		this.info_xml = param;
	}

}
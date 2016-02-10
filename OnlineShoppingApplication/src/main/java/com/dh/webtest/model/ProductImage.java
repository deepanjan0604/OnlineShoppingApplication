package com.dh.webtest.model;

import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mysql.jdbc.Blob;

@Entity
@Table(name="productimages")
public class ProductImage {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int imageId;
	
	@Basic(fetch = FetchType.LAZY)
	@Column(name="thumbnail")
    private byte [] thumbnail;	
	
		
	@Basic(fetch = FetchType.LAZY)
	@Column(name="image")
    private byte [] image;
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnore
	Product product;


	public int getImageId() {
		return imageId;
	}


	public void setImageId(int imageId) {
		this.imageId = imageId;
	}


	public byte[] getThumbnail() {
		return thumbnail;
	}


	public void setThumbnail(byte[] thumbnail) {
		this.thumbnail = thumbnail;
	}


	public byte[] getImage() {
		return image;
	}


	public void setImage(byte[] image) {
		this.image = image;
	}


	public Product getProduct() {
		return product;
	}


	public void setProduct(Product product) {
		this.product = product;
	}

	
	
		

}



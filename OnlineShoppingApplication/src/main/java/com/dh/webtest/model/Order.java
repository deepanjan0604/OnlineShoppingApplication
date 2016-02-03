package com.dh.webtest.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mysql.jdbc.Blob;

@Entity
@Table(name="orders")
public class Order{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int orderId;

	@Column(name = "totalcost")
	float totalCost;
	

	@Column(name = "cost")
	float cost;
	
	
	@Column(name = "tax")
	float tax;


	public int getOrderId() {
		return orderId;
	}


	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}


	public float getTotalCost() {
		return totalCost;
	}


	public void setTotalCost(float totalCost) {
		this.totalCost = totalCost;
	}


	public float getCost() {
		return cost;
	}


	public void setCost(float cost) {
		this.cost = cost;
	}


	public float getTax() {
		return tax;
	}


	public void setTax(float tax) {
		this.tax = tax;
	}


	
}



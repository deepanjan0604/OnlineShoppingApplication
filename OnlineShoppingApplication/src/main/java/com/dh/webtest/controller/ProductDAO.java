package com.dh.webtest.controller;

import java.util.List;


 
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.dh.webtest.model.Product;
 
@Repository
public class ProductDAO {
     
    @Autowired
    SessionFactory sessionFactory;
     
    @Transactional
    public void save(Product product) {
        Session session = sessionFactory.getCurrentSession();
        session.save(product);
    }
     
    @Transactional
    public List<Product> list() {
        Session session = sessionFactory.getCurrentSession();
        List<Product> products = null;
        try {
            products = (List<Product>)session.createQuery("from Product").list();
 
        } catch (HibernateException e) {
            e.printStackTrace();
        }
        return products;
    }
     
    @Transactional
    public Product get(int productId) {
        Session session = sessionFactory.getCurrentSession();
        return (Product)session.get(Product.class, productId);
    }
 
    @Transactional
    public void remove(int productId) {
        Session session = sessionFactory.getCurrentSession();
         
        Product product = (Product)session.get(Product.class, productId);
         
        session.delete(product);
    }
}
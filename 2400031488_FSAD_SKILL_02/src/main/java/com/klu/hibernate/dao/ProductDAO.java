package com.klu.hibernate.dao;

import org.hibernate.Session;
import org.hibernate.Transaction;

import com.klu.hibernate.entity.Product;
import com.klu.hibernate.util.HibernateUtil;

public class ProductDAO {

    public void saveProduct(Product product){
        Session session=HibernateUtil.getSessionFactory().openSession();
        Transaction tx=session.beginTransaction();

        session.save(product);

        tx.commit();
        session.close();
    }

    public Product getProduct(int id){
        Session session=HibernateUtil.getSessionFactory().openSession();
        Product p=session.get(Product.class,id);
        session.close();
        return p;
    }

    public void updateProduct(int id,double price){
        Session session=HibernateUtil.getSessionFactory().openSession();
        Transaction tx=session.beginTransaction();

        Product p=session.get(Product.class,id);
        p.setPrice(price);

        session.update(p);

        tx.commit();
        session.close();
    }

    public void deleteProduct(int id){
        Session session=HibernateUtil.getSessionFactory().openSession();
        Transaction tx=session.beginTransaction();

        Product p=session.get(Product.class,id);
        session.delete(p);

        tx.commit();
        session.close();
    }
}

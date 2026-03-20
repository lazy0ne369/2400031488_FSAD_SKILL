package com.klu.hql.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.query.Query;

import com.klu.hql.entity.Product;
import com.klu.hql.util.HibernateUtil;

public class HQLQueries {

    // 1. Sort by price ASC
    public void sortPriceAsc() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Query<Product> q = session.createQuery("from Product order by price asc", Product.class);
        List<Product> list = q.list();
        list.forEach(p -> System.out.println(p.getName()+" "+p.getPrice()));
        session.close();
    }

    // 2. Sort by price DESC
    public void sortPriceDesc() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Query<Product> q = session.createQuery("from Product order by price desc", Product.class);
        List<Product> list = q.list();
        list.forEach(p -> System.out.println(p.getName()+" "+p.getPrice()));
        session.close();
    }

    // 3. Sort by quantity highest first
    public void sortByQuantity() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Query<Product> q = session.createQuery("from Product order by quantity desc", Product.class);
        List<Product> list = q.list();
        list.forEach(p -> System.out.println(p.getName()+" "+p.getQuantity()));
        session.close();
    }

    // 4. Pagination first 3 products
    public void firstThree() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Query<Product> q = session.createQuery("from Product", Product.class);
        q.setFirstResult(0);
        q.setMaxResults(3);
        List<Product> list = q.list();
        list.forEach(p -> System.out.println(p.getName()));
        session.close();
    }

    // 5. Pagination next 3
    public void nextThree() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Query<Product> q = session.createQuery("from Product", Product.class);
        q.setFirstResult(3);
        q.setMaxResults(3);
        List<Product> list = q.list();
        list.forEach(p -> System.out.println(p.getName()));
        session.close();
    }

    // 6a Count total products
    public void countProducts() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Query<Long> q = session.createQuery("select count(*) from Product", Long.class);
        System.out.println("Total products: "+q.uniqueResult());
        session.close();
    }

    // 6b Count where quantity > 0
    public void countAvailable() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Query<Long> q = session.createQuery("select count(*) from Product where quantity>0", Long.class);
        System.out.println("Available: "+q.uniqueResult());
        session.close();
    }

    // 6c Min and Max price
    public void minMaxPrice() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Query<Object[]> q = session.createQuery("select min(price), max(price) from Product", Object[].class);
        Object[] result = q.uniqueResult();
        System.out.println("Min price: "+result[0]);
        System.out.println("Max price: "+result[1]);
        session.close();
    }

    // 7 GROUP BY description
    public void groupByDescription() {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Query<Object[]> q = session.createQuery(
                "select description, count(*) from Product group by description",
                Object[].class);

        List<Object[]> list = q.list();
        for(Object[] row:list) {
            System.out.println(row[0]+" -> "+row[1]);
        }

        session.close();
    }

    // 8 Filter price range
    public void priceRange(double min,double max) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Query<Product> q=session.createQuery(
                "from Product where price between :min and :max",
                Product.class);

        q.setParameter("min",min);
        q.setParameter("max",max);

        q.list().forEach(p->System.out.println(p.getName()+" "+p.getPrice()));

        session.close();
    }

    // 9 LIKE queries

    public void nameStarts(String prefix){
        Session s=HibernateUtil.getSessionFactory().openSession();
        Query<Product> q=s.createQuery("from Product where name like :p",Product.class);
        q.setParameter("p",prefix+"%");
        q.list().forEach(p->System.out.println(p.getName()));
        s.close();
    }

    public void nameEnds(String suffix){
        Session s=HibernateUtil.getSessionFactory().openSession();
        Query<Product> q=s.createQuery("from Product where name like :p",Product.class);
        q.setParameter("p","%"+suffix);
        q.list().forEach(p->System.out.println(p.getName()));
        s.close();
    }

    public void nameContains(String text){
        Session s=HibernateUtil.getSessionFactory().openSession();
        Query<Product> q=s.createQuery("from Product where name like :p",Product.class);
        q.setParameter("p","%"+text+"%");
        q.list().forEach(p->System.out.println(p.getName()));
        s.close();
    }

}

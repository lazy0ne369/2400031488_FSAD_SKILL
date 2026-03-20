package com.klu.hibernate;

import com.klu.hibernate.dao.ProductDAO;
import com.klu.hibernate.entity.Product;

public class App {

    public static void main(String[] args) {

        ProductDAO dao=new ProductDAO();

        // INSERT
        Product p1=new Product("sohan","sohan product",75000,10);
        dao.saveProduct(p1);

        int productId = p1.getId();

        // READ
        Product p=dao.getProduct(productId);
        System.out.println(p.getName()+" "+p.getPrice());

        // UPDATE
        dao.updateProduct(productId,70000);

        // DELETE
        dao.deleteProduct(productId);

        System.out.println("CRUD Operations Completed");

    }
}

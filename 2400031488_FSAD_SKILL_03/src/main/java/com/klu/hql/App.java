package com.klu.hql;

import com.klu.hql.dao.HQLQueries;

public class App {

    public static void main(String[] args) {

        HQLQueries hql = new HQLQueries();

        hql.sortPriceAsc();
        hql.sortPriceDesc();
        hql.sortByQuantity();

        hql.firstThree();
        hql.nextThree();

        hql.countProducts();
        hql.countAvailable();

        hql.minMaxPrice();

        hql.groupByDescription();

        hql.priceRange(10000,60000);

        hql.nameStarts("s");
        hql.nameEnds("n");
        hql.nameContains("oha");

    }
}

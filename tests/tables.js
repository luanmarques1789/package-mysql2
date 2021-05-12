exports.tables = {
  categories: `
  CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT,
    category VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
    )
    `,

  products: `
    CREATE TABLE products (
      id INT NOT NULL AUTO_INCREMENT,
      product VARCHAR(255) NOT NULL,
      price FLOAT NOT NULL,
      PRIMARY KEY(id)
      )
      `,

  images: `
      CREATE TABLE images (
        id INT NOT NULL AUTO_INCREMENT,
        description VARCHAR(255) NOT NULL,
        url VARCHAR(255) NULL DEFAULT NULL,
        product_id INT NOT NULL,
        PRIMARY KEY(id),
        KEY fk_images_products_index (product_id),
        CONSTRAINT fk_images_products_constr
        FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE 
        )
        `,

  products_categories: `
      CREATE TABLE products_categories (
        product_id INT NOT NULL,
        category_id INT NOT NULL,
        KEY fk_products_categories_index (product_id, category_id),
        
        CONSTRAINT fk_prod_cat_constr1
        FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

        CONSTRAINT fk_prod_cat_constr2
        FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE  
        )
        `,
};

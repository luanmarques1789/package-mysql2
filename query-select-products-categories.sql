SELECT products.product, categories.category FROM products 
INNER JOIN products_categories ON products.id = products_categories.product_id 
INNER JOIN categories ON categories.id = products_categories.category_id;
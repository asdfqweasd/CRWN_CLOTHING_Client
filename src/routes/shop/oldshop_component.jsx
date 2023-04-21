import { useContext, Fragment } from "react";

import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../context/categories.context";

import CategoryPreview from "../../components/category-preview/category-preview.component";
import "./shop.styles.scss";

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    /* first map is used for mapping the different categories */
    /* {Object.keys(categoriesMap).map((title) => (
        <Fragment key={title}>
          <h1>{title}</h1>
          <div className="products-container"> */
    /* second map is used to mapping the different products in same categories. */
    /* {categoriesMap[title].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Fragment>
      ))} */
    <div className="shop-container">
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </div>
  );
};

export default Shop;

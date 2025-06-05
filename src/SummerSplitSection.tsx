import React from 'react';
import { Link } from 'react-router-dom';
import './SummerSplitSection.css';

interface ProductCardProps {
  image: string;
  name: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, category }) => {
  return (
    <div className="summer-product-card">
      <div className="summer-product-thumbnail">
        <img src={image} alt={name} loading="lazy" />
      </div>
      <div className="summer-product-info">
        <h3 className="summer-product-name">{name}</h3>
        <p className="summer-product-category">{category}</p>
      </div>
    </div>
  );
};

const SUMMER_PRODUCTS = [
  {
    image: 'babylon1.png',
    name: 'Riviera Bikini',
    category: 'Swimwear'
  },
  {
    image: 'babylon3.png',
    name: 'Capri Sunhat',
    category: 'Accessories'
  },
  {
    image: 'babylon2.png',
    name: 'Amalfi Linen Dress',
    category: 'Dresses'
  },
  {
    image: 'babylon4.png',
    name: 'Ocean Blue Necklace',
    category: 'Accessories'
  }
];

export default function SummerSplitSection() {
  return (
    <section className="summer-split-section">
      <div className="summer-split-container">
        <div className="summer-split-left">
          <Link to="/shop?category=Swimwear" className="corner-label top-left" data-component-name="SummerSplitSection">shop bikini</Link>
          <Link to="/shop?category=dresses" className="corner-label top-right">shop dresses</Link>
          <Link to="/shop?category=sunhats" className="corner-label bottom-left">shop sunhats</Link>
          <Link to="/shop?category=accessories" className="corner-label bottom-right">shop accessories</Link>
          <div className="summer-image-container">
            <img src="babylonbag.png" alt="Summer scene" className="summer-scene-image" />
          </div>
        </div>
        
        <div className="summer-split-right">
          <div className="summer-content">
            <h2 className="summer-heading">let's <span style={{textTransform: 'uppercase'}}>Summer</span></h2>
            
            <div className="summer-products-container">
              {SUMMER_PRODUCTS.map((product, index) => (
                <ProductCard
                  key={index}
                  image={product.image}
                  name={product.name}
                  category={product.category}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

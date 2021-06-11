import { useCallback, useState } from 'react';
import './App.css';
import productList from './productList.json';

const MILISSECOND_DELAY_TO_REMOVE_ADD_TO_CART_NOTIFY = 1500;

function App() {
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [activeProduct, setActiveProduct] = useState({});
  const [showProductAddToCartNotify, setShowProductAddToCartNotify] = useState(false);

  const onClickViewProductDetails = useCallback((product) => {
    setActiveProduct(product);
    setShowProductDetails(true);
  }, [setActiveProduct, setShowProductDetails]);

  const onClickCloseProductDetails = useCallback(() => {
    setShowProductDetails(false);
  }, [setShowProductDetails]);

  const onClickAddToCart = useCallback(() => {
    if (!showProductAddToCartNotify) {
      setShowProductAddToCartNotify(true);
      setTimeout(() => {
        setShowProductAddToCartNotify(false);
      }, MILISSECOND_DELAY_TO_REMOVE_ADD_TO_CART_NOTIFY);
    }
  }, [showProductAddToCartNotify, setShowProductAddToCartNotify]);

  return (
    <div className="App">
      {showProductAddToCartNotify &&
        <div className="product_modal_notify">
          <div className="product_modal_notify_wrapper">
            <h1>Product added successfully!</h1>
          </div>
        </div>
      }

      {showProductDetails &&
        <section className="product_modal">
          <button className="product_modal_close" onClick={onClickCloseProductDetails}>X</button>
          <div className="product_modal_wrapper">
            <div className="product_modal_wrapper_child">
              <div>
                <img src={activeProduct?.PictureURL} alt={activeProduct?.Name} />
                <span>{activeProduct.Badges}</span>
              </div>
              <div>{`Brand: ${activeProduct.Brand}`}</div>
              <div>{`Product Color: ${activeProduct.Color}`}</div>
            </div>
            <div className="product_modal_wrapper_child">
              <h1>{activeProduct.Name}</h1>
              <div>{activeProduct.RatingAvg}</div>
              <p>{activeProduct.Description}</p>
            </div>
            <div className="product_modal_wrapper_child">
              <div>
                <h2>{activeProduct.RetailPrice}</h2>
                {activeProduct.RetailPrice !== activeProduct.Price &&
                  <h3>{activeProduct.Price}</h3>
                }
              </div>
              <div>
                {activeProduct.Stock === 0 &&
                  <h3>Out of Stock</h3>
                }
                <button onClick={onClickAddToCart}>Add to cart</button>
              </div>
            </div>
          </div>
        </section>
      }

      <section className="product_list">
        {productList.map((product) => {
          const handleOnClickViewDetails = () => onClickViewProductDetails(product);
          return (
            <div className="product">
              <img className="product_img" src={product?.ThumbnailURL} alt={product?.Name} />
              <div className="product_description">
                <h2 className="product_title">{product?.Name}</h2>
                <span className="product_price">{product?.Price}</span>
              </div>
              <button className="product_button" onClick={handleOnClickViewDetails}>View Details</button>
            </div>
          )
        })}
      </section>
    </div>
  );
}

export default App;

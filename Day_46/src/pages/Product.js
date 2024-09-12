import data from '../data/data.json';
import productImg1 from '../assets/img/product-1.jfif';
import productImg2 from '../assets/img/product-2.jfif';
import productImg3 from '../assets/img/product-3.jfif';
import productStyles from './css/Product.module.css';
export const Product = () => {
  const productList = data;
  return `
    <div class="d-flex justify-content-center flex-wrap gap-3 my-5 align-items-center">
      ${productList
        .map(
          (product) => `
            <div class="card ${productStyles.product_card} text-center" style="width: 18rem;">
              <a href="/product/${product.id}">
                <img 
                  src="${getProductThumb(product)}" 
                  class="card-img-top img-fluid ${productStyles.img}" 
                  alt="${product.productName}
                ">
              </a>
              <div class="card-body">
                <a href="/product/${product.id}">
                  <h5 class="card-title">${product.productName}</h5>
                </a>
                <p class="card-text">${product.description}</p>
              </div>
              <p class="card-text text-danger fw-bold fs-6 ${productStyles.price} mx-3">
                ${product.price} VNĐ
              </p>
              <a href="/product/${product.id}" class="btn btn-primary ">Chi tiết</a>
            </div>
          `
        )
        .join('')}
    </div>
  `;

  function getProductThumb(product) {
    switch (product.id) {
      case 1:
        return productImg1;
      case 2:
        return productImg2;
      case 3:
        return productImg3;
      default:
        return productImg1;
    }
  }
};

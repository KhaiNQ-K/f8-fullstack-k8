import productImg1 from '../assets/img/product-1.jfif';
import productImg2 from '../assets/img/product-2.jfif';
import productImg3 from '../assets/img/product-3.jfif';
import data from '../data/data.json';
export const ProductDetail = (params) => {
  const product = data.find((item) => item.id == params.params.id);
  return `
    <div class="d-flex justify-content-center gap-2 my-5 align-items-center">
      <div class="col-md-4">
        <img class="img-fluid" src="${getProductThumb(product)}"/>
      </div>
      <div class="col-md-4">
        <h1>${product.productName}</h1>
        <p>${product.description}</p>
        <p class="fw-bold fs-5 text-danger mx-3 ">Giá: ${product.price} VNĐ</p>
        <button onclick="navigate('/product')">Quay lại</button>
      </div>
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

import {addToCart,cartToLocalStorage} from "../data/cart.js";
import {isProduct,products} from "../data/products.js";


let totalHtml='';
products.forEach((item) => {
    const html = `
<article class="product-card">
    <img src="${item.image}" alt="商品图片">
    <div class="product-info">
        <h1>${item.productName}</h1>
        <p>${item.productDescription}</p>
        <p>${item.price}元</p>
        <button class="js-add-to-cart-button" data-product-id=${item.productId}>加入购物车</button>
</div>
</article>
    `;
    totalHtml += html;
});
document.querySelector('.product-grid').innerHTML = totalHtml;


//添加到cartItems
document.querySelectorAll('.js-add-to-cart-button').forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', () => {
        const cartProductId = addToCartButton.dataset.productId;

        // 查找购物车中是否已有这个商品
        if (isProduct(cartProductId, products)) {

            addToCart(cartProductId);
            cartToLocalStorage();
        }
    });
});


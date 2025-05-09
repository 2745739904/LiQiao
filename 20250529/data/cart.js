import {products} from "./products.js";
//加载index页面click添加的cartItems
export let cartItems = JSON.parse(localStorage.getItem('cart'));

if (!cartItems) {
    cartItems = [];
    /*cartItems实例:
    cartItems.push({
        productId: cartProductId,
        quantity: 1
    });*/
}

export function getProductById(cartProductId, products) {
    return products.find(product => product.productId == cartProductId);
}

// 添加到购物车
export function addToCart(cartProductId) {
    // 在 cartItems 中查找匹配的项
    const existingCartItem = cartItems.find(item => item.productId == cartProductId);

    if (existingCartItem) {
        // 如果存在，数量 +1
        existingCartItem.quantity++;
        updateCartCount();
    } else {
        // 如果不存在，添加新商品到购物车
        cartItems.push({
            productId: cartProductId,
            quantity: 1
        });
        updateCartCount();
    }
    // 更新 localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

//更新右上角的购物车数字
export function updateCartCount(){
    let totalQuantity = 0;
    cartItems.forEach(item => {
        totalQuantity += item.quantity;
    });
    const badgeElement = document.querySelector('.cart-badge');
    if (badgeElement) {
        badgeElement.innerHTML = totalQuantity.toString();
    } else {
        console.warn("未找到 .cart-badge 元素");
    }
    return totalQuantity;
}

//保存购物车到本地
export function cartToLocalStorage() {
    const cartJson = JSON.stringify(cartItems);
    localStorage.setItem('cart', cartJson);
}

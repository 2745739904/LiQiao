import {products} from "./products.js";


//加载index页面click添加的cartItems
export let cartItems = JSON.parse(localStorage.getItem('cart'));

if (!cartItems) {
    cartItems = [{
        productId: 2,
        quantity: 1,
        deliveryId: 1,
    }];
}

//输入id,获取Item
export function getProductById(cartProductId, products) {
    return products.find(product => product.productId == cartProductId);
}


// 把id和数量添加到购物车数组
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


//更新右上角的购物车数量数字显示
export function updateCartCount(){
    let totalQuantity = 0;
    cartItems.forEach(item => {
        totalQuantity += item.quantity;
    });
    const badgeElement = document.querySelector('.cart-badge');
    if (badgeElement) {
        badgeElement.innerHTML = totalQuantity.toString();
    }
    return totalQuantity;
}

//更新head的购物车数量
export function updateHeadCount(){
    let headHtml=`结账（<a class="return-to-home-link"
href="index.html">${updateCartCount()}件商品</a>）`;
    document.querySelector('.checkout-header-middle-section').innerHTML = headHtml;
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cartItems.forEach(cartItem => {
        if(productId == cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    matchingItem.deliveryId = deliveryOptionId;

    console.log(cartItems);

    cartToLocalStorage();
}

//保存购物车到本地
export function cartToLocalStorage() {
    const cartJson = JSON.stringify(cartItems);
    localStorage.setItem('cart', cartJson);
}


// 传入需要删除的id,删除对应的HTML模板
// 检查每一个商品，如果不是传入的id，那么推到新数组
export function removeFromCart(productId) {
    const newCart = cartItems.filter(item => item.productId !== productId);
    cartItems.length = 0; // 清空原数组
    cartItems.push(...newCart); // 将新数组元素添加到原数组
    cartToLocalStorage();//更新购物车
    updateCartCount();
    console.log(newCart);
}


//目的:计算购物车总价格,可以输出购物车的合计价格
export function calculateCartPriceTotal(){
    let totalPrice = 0;
    cartItems.forEach(item => {
        const id = item.productId;
        const quantity = item.quantity;
        const productItem = getProductById(id, products);

        if(productItem) {
            const singlePrice = productItem.price;
            totalPrice += singlePrice * quantity;
        }else {
            console.log("购物车没有任何商品")
        }
    })
    return totalPrice;
}

//保留两位小数
export function fixNum(num){
    return Math.round(num * 100) / 100;
}
import {cartItems, cartToLocalStorage, getProductById,updateCartCount} from "../data/cart.js";
import {products} from "../data/products.js";

function getFutureDate(days) {
    const currentDate = dayjs();
    const futureDate = currentDate.add(days, 'day');
    return futureDate.format('M月D日');
}


let html = '';
cartItems.forEach(item => {
    const itemProductId = item.productId;
    const product = getProductById(itemProductId, products);
    if (product) {
        html += `
            <div class="cart-item-details-grid js-cart-item-grid-${product.productId}">
                <img class="product-image"
                     src=${product.image}>
            
                <div class="cart-item-details">
                    <div class="product-name">
                        ${product.productName}
                    </div>
                    <div class="product-price">
                        ￥${product.price}
                    </div>
                    <div class="product-quantity">
                          <span>
                            数量：<span class="quantity-label">${item.quantity}</span>
                          </span>
                        <span class="update-quantity-link link-primary">
                            修改
                          </span>
                        <span class="js-delete-link link-primary" data-product-id="${item.productId}">
                            删除
                          </span>
                    </div>
                </div>
            
                <div class="delivery-options">
                    <div class="delivery-options-title">
                        选择配送方式：
                    </div>
                    <div class="delivery-option">
                        <input type="radio" checked
                               class="delivery-option-input"
                               name="delivery-option-1"/>
                        <div>
                            <div class="delivery-option-date">
                                ${getFutureDate(4)}
                            </div>
                            <div class="delivery-option-price">
                                免费配送
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                               class="delivery-option-input"
                               name="delivery-option-1"/>
                        <div>
                            <div class="delivery-option-date">
                                ${getFutureDate(3)}
                            </div>
                            <div class="delivery-option-price">
                                加急配送 ￥10
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                               class="delivery-option-input"
                               name="delivery-option-1"/>
                        <div>
                            <div class="delivery-option-date">
                                ${getFutureDate(1)}
                            </div>
                            <div class="delivery-option-price">
                                特快配送 ￥18
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        console.warn(`找不到产品ID为${itemProductId}的产品`);
    }
});
document.querySelector('.cart-item-container').innerHTML = html;

//更新head的购物车数量
function updateHeadCount(){
    let headHtml=`结账（<a class="return-to-home-link"
href="index.html">${updateCartCount()}件商品</a>）`;
    document.querySelector('.checkout-header-middle-section').innerHTML = headHtml;
}
updateHeadCount();

// 在渲染完成后绑定删除事件
// 使用事件委托来处理动态生成的删除链接
document.querySelector('.cart-item-container').addEventListener('click', (event) => {
    if (event.target.classList.contains('js-delete-link')) {
        // 当发生点击事件时
        const productId = event.target.dataset.productId;
        removeFromCart(productId);

        //移除HTML代码
        const container = document.querySelector(`.js-cart-item-grid-${productId}`
        );
        if (container) {
            updateHeadCount();
            container.remove();
        }
    }
});

// 从购物车数组移除，传入需要删除的id，检查每一个商品，如果不是传入的id，那么推到新数组
function removeFromCart(productId) {
    const newCart = cartItems.filter(item => item.productId !== productId);
    cartItems.length = 0; // 清空原数组
    cartItems.push(...newCart); // 将新数组元素添加到原数组
    cartToLocalStorage();//更新购物车
    updateCartCount();
    updatePaymentCount();
}


//临时
function updatePaymentCount() {
    let tempHtml = `
    <div>商品${updateCartCount()}件）：</div>
    <div class="payment-summary-money">￥218.90</div>
    `;

    document.querySelector('.payment-summary-row').innerHTML = tempHtml;
}


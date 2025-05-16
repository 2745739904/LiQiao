import {products} from "../../data/products.js";
import {cartItems, getProductById, removeFromCart, updateHeadCount, updateDeliveryOption} from "../../data/cart.js";
import {calculateDeliveryPrice, deliveryOptions} from "../../data/delivery.js";
import {renderPaymentSummary} from "./paymentSummary.js";

// 渲染订单摘要
export function renderOrderSummary() {
    updateHeadCount();
    let html = '';

    cartItems.forEach(item => {
        const itemProductId = item.productId;
        const product = getProductById(itemProductId, products);
        if (product) {
            // 构建商品的 HTML 结构
            html += `
            <div class="cart-item-details-grid js-cart-item-grid-${product.productId}">
                <img class="product-image" src="${product.image}">
                <div class="cart-item-details">
                    <div class="product-name">${product.productName}</div>
                    <div class="product-price">￥${product.price}</div>
                    <div class="product-quantity">
                        <span>数量：<span class="quantity-label">${item.quantity}</span></span>
                        <span class="update-quantity-link link-primary">修改</span>
                        <span class="js-delete-link link-primary" data-product-id="${item.productId}">删除</span>
                    </div>
                </div>
                <div class="delivery-options">
                    ${renderDeliveryOptions(product.productId)}
                </div>
            </div>
            `;
        }
    });

    const cartContainer = document.querySelector('.cart-item-container');
    cartContainer.innerHTML = html;

    // 购物车的删除按钮事件处理
    cartContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('js-delete-link')) {
            const productId = event.target.dataset.productId;
            const container = document.querySelector(`.js-cart-item-grid-${productId}`);

            removeFromCart(productId);
            updateHeadCount();
            if (container) container.remove();
            console.log('remove Item done');
            renderPaymentSummary();
        }
    });

    // 绑定配送选项的change事件
    bindDeliveryOptions();

    function renderDeliveryOptions(productId) {
        let optionHtml = `
    <div class="delivery-options-title">选择配送方式：</div>
    `;

        // 先找到当前商品的购物车项
        const cartItem = cartItems.find(item => item.productId === productId);

        deliveryOptions.forEach((deliveryOption,index) => {
            // 判断是否选中：使用 cartItem 的 deliveryId 与当前选项比较
            let isChecked = cartItem && deliveryOption.deliveryId === cartItem.deliveryId;
            if (index === 0) {
                isChecked = index === 0;
            }

            const deliveryDate = deliveryOption.deliveryDate;
            const deliveryPrice = deliveryOption.deliveryPrice;
            const deliveryDescription = deliveryOption.deliveryDescription;

            optionHtml += `
        <div class="delivery-option js-delivery-option"
            data-product-id="${productId}"
            data-delivery-option-id="${deliveryOption.deliveryId}">
            <input type="radio" 
                ${isChecked ? 'checked' : ''} 
                class="delivery-option-input"
                name="delivery-option-${productId}"
                data-delivery-id="${deliveryOption.deliveryId}"
                data-product-id="${productId}">
            <div>
                <div class="delivery-option-date">${deliveryDate}</div>
                <div class="delivery-option-price">${deliveryDescription} ${deliveryPrice}(元)</div>
            </div>
        </div>
        `;
        });

        return optionHtml;
    }

    function bindDeliveryOptions() {
        document.querySelectorAll('.js-delivery-option').forEach(option => {
            // 给整个 .js-delivery-option 添加点击事件
            option.addEventListener('click', function () {
                const radio = this.querySelector('.delivery-option-input');
                if (radio && !radio.checked) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change')); // 触发 change 事件
                }
            });
        });

        // 现有 change 事件监听器不变
        document.querySelectorAll('.delivery-option-input').forEach(input => {
            input.addEventListener('change', function () {
                if (this.checked) {
                    const productId = this.dataset.productId;
                    const deliveryId = this.dataset.deliveryId;

                    updateDeliveryOption(productId, deliveryId);
                    calculateDeliveryPrice();
                    renderPaymentSummary();
                }
            });
        });
    }

}


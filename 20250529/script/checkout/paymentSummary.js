import {calculateCartPriceTotal, fixNum, updateCartCount, updateHeadCount} from "../../data/cart.js";
import {calculateDeliveryPrice} from "../../data/delivery.js";

export function renderPaymentSummary(){
    updateHeadCount();
    //商品总价格在每次删除商品过后会更新,运费价格在每次选择后会更新
    //计算商品价格
    const cartTotalPrice = calculateCartPriceTotal();
    const deliveryTotalPrice = calculateDeliveryPrice();
    const priceBeforeTax = cartTotalPrice + deliveryTotalPrice;
    const taxPrice = calculateTaxPrice(priceBeforeTax);
    const finalTotalPrice = priceBeforeTax + taxPrice;

    //计算税费
    function calculateTaxPrice(priceBeforeTax){
        return fixNum(priceBeforeTax * 0.1);
    }



    let paymentHtml = `
        <div class="payment-summary-title">
            订单汇总
        </div>
    
        <div class="payment-summary-row">
            <div>商品(${updateCartCount()}件）：</div>
            <div class="payment-summary-money">￥${fixNum(cartTotalPrice)}</div>
        </div>
    
        <div class="payment-summary-row">
            <div>运费：</div>
            <div class="payment-summary-money">￥${fixNum(deliveryTotalPrice)}</div>
        </div>
    
        <div class="payment-summary-row subtotal-row">
            <div>税前总额：</div>
            <div class="payment-summary-money">￥${fixNum(priceBeforeTax)}</div>
        </div>
    
        <div class="payment-summary-row">
            <div>预估税费（10%）：</div>
            <div class="payment-summary-money">￥${fixNum(taxPrice)}</div>
        </div>
    
        <div class="payment-summary-row total-row">
            <div>订单总额：</div>
            <div class="payment-summary-money">￥${fixNum(finalTotalPrice)}</div>
        </div>
    
        <button id="place-order-btn" class="place-order-button button-primary">
        提交订单
    </button>
    `;
    document.querySelector('.payment-summary').innerHTML = paymentHtml;


    document.getElementById('place-order-btn').addEventListener('click', function(e) {
        e.preventDefault(); // 阻止默认表单提交行为

        // 创建一个新的img元素
        let img = document.createElement("img");
        img.src = "images/LiQiao.png"; // 设置图片路径

        // 创建一个div来包含图片，并设置一些样式
        let modal = document.createElement("div");
        modal.className = 'modal'; // 应用基本样式
        modal.appendChild(img);

        // 添加关闭按钮
        let closeButton = document.createElement("button");
        closeButton.innerText = "X";
        closeButton.onclick = function() {
            modal.classList.remove('show'); // 移除显示样式
            setTimeout(() => document.body.removeChild(modal), 300); // 在动画结束后移除元素
        };
        modal.appendChild(closeButton);

        // 将创建的模态框添加到文档中并显示
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 50); // 延迟应用显示样式以触发CSS动画
    });


}

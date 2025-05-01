//目的是把products的内容通过html模板映射到html
let totalHtml='';
products.forEach((item) => {
    const html = `
<article class="product-card">
    <img src="${item.image}" alt="商品图片">
    <div class="product-info">
        <h1>${item.productName}</h1>
        <p>${item.productDescription}</p>
        <p>${item.price}元</p>
        <button class="add-to-cart-button">加入购物车</button>
</div>
</article>
    `;
    totalHtml += html;
});
//获取到了全部的HTML数组
console.log(totalHtml);
//添加到HTML元素
//报错说元素不存在
document.querySelector('.product-grid').innerHTML = totalHtml;

//完善加入购物车功能,当点击按钮时,把商品加入到购物车数组,并且购物车数字加一

let totalCount = 0;
function addToCart() {
    totalCount++;
    // 将 totalCount 转换为字符串类型
    document.querySelector('.cart-badge').innerHTML = totalCount.toString();
    console.log('add to cart done');
}

//把on click事件改成dom形式
document.querySelectorAll('.add-to-cart-button').forEach((item) => {
    item.addEventListener('click', addToCart);
})
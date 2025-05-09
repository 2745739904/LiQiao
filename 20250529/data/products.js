export let products = [];

products.push(
    {
        productId: 1,
        productName: "芮娜朗迪",
        productDescription: "阴的莫法",
        price: 9.9,
        image: "images/product-1.JPG",
    },
    {
        productId: 2,
        productName: "搞完,李巧双拼",
        productDescription: "似乎是两种风格",
        price: 29.9,
        image: "images/product-2.JPG",
    },
    {
        productId: 3,
        productName: "高三版男同",
        productDescription: "0?1?,非也,是0=>1",
        price: 0.9,
        image: "images/product-3.JPG",
    },
    {
        productId: 4,
        productName: "银趴",
        productDescription: "在男神家开的银趴,有点不好意思进房间",
        price: 999,
        image: "images/product-4.JPG",
    },
    {
        productId: 5,
        productName: "JOJO(高中)",
        productDescription: "一种完全投入的行为艺术的存在",
        price: 9,
        image: "images/product-5.JPG",
    },
    {
        productId: 6,
        productName: "顶针",
        productDescription: "学历和能力哪个更重要?顶针给出了答案",
        price: 199,
        image: "images/product-6.JPG",
    },
    {
        productId: 7,
        productName: "搞完,阿轩,涛酱三拼",
        productDescription: "怀念啊我们的初中",
        price: 299,
        image: "images/product-7.JPG",
    },
    {
        productId: 8,
        productName: "京液",
        productDescription: "一念神魔",
        price: 10,
        image: "images/product-8.JPG",
    },
    {
        productId: 9,
        productName: "JOJO(大专)",
        productDescription: "贯彻一生的行为艺术",
        price: 10,
        image: "images/product-9.JPG",
    },
    {
        productId: 10,
        productName: "白色社会猴",
        productDescription: "或许&*街^头风",
        price: 29,
        image: "images/product-10.JPG",
    },
    {
        productId: 11,
        productName: "黄色传统猴",
        productDescription: "传统传承人",
        price: 39,
        image: "images/product-11.JPG",
    },
    {
        productId: 12,
        productName: "撒过酱",
        productDescription: "现代腰包与原始装扮的碰撞",
        price: 99,
        image: "images/product-12.JPG",
    },
    {
        productId: 13,
        productName: "高玩斐济杯",
        productDescription: "稚嫩外表与紧致的协调",
        price: 91,
        image: "images/product-13.JPG",
    },
    {
        productId: 14,
        productName: "涛酱",
        productDescription: "卡哇伊(*^ω^*)",
        price: 9.1,
        image: "images/product-14.JPG",
    },
    {
        productId: 15,
        productName: "lyb",
        productDescription: "谁偷了我的外卖",
        price: 25,
        image: "images/product-15.JPG",
    }
);

//判断是否在products[]里面
export function isProduct(cartProductId, products) {
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (product.productId == cartProductId) {
            return true;
        }
    }
    console.log("No match found.");
    return false;
}

//输入 x天 返回 x天之后的月日
import {cartItems} from "./cart.js";

function getFutureDate(days) {
    const currentDate = dayjs();
    const futureDate = currentDate.add(days, 'day');
    return futureDate.format('M月D日');
}

export const deliveryOptions = [{
    deliveryId: 1,
    deliveryDate: getFutureDate(4),
    deliveryPrice: 0,
    deliveryDescription: '普通配送',
},{
    deliveryId: 2,
    deliveryDate: getFutureDate(3),
    deliveryPrice: 10,
    deliveryDescription: '加急配送',
},{
    deliveryId: 3,
    deliveryDate: getFutureDate(1),
    deliveryPrice: 18,
    deliveryDescription: '特快配送',
}]

//根据id来选择对应的option
export function getDeliveryOptionById(deliveryId) {
    return  deliveryOptions.find(option=> option.deliveryId == deliveryId);
}


//计算运费,在orderSummary和paymentSummary用
export function calculateDeliveryPrice() {
    let totalDeliveryPrice = 0;
    cartItems.forEach(item => {
        const deliveryId = item.deliveryId;
        const deliveryOption = getDeliveryOptionById(deliveryId);
        if (!deliveryOption) {
            console.error(`找不到配送选项 ID: ${deliveryId}`);
            return; // 跳过当前项
        }
        const deliveryPrice = deliveryOption.deliveryPrice;
        totalDeliveryPrice += deliveryPrice;
    });
    return totalDeliveryPrice;

}

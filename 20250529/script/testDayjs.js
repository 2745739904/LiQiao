const dayjs = require('dayjs');

function getFutureDate(days) {
    const currentDate = dayjs();
    const futureDate = currentDate.add(days, 'day');
    return futureDate.format('M月D日');
}

const date = getFutureDate( 3);
console.log(date);
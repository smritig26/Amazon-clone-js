import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const deliveryOptions = [{
    id : '1',
    deliveryDays : 7,
    priceCents : 0
},
{
    id : '2',
    deliveryDays : 3,
    priceCents : 499
},
{
    id : '3',
    deliveryDays : 1,
    priceCents : 999
},
]

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;
    deliveryOptions.forEach((option) => {
        if(option.id === deliveryOptionId){
            deliveryOption = option;
        }
    });
    if(!deliveryOption) return ;
    return deliveryOption || deliveryOptions[0];
}


// function isWeekend(date){
//     const 
// }

// export function calculateDeliveryDate(deliveryOption){
    
//     const today = dayjs();
//     let deliveryDate = today.add(deliveryOption.deliveryDays , 'days');
//     const d = deliveryDate.format('dddd');
//     if (d === 'Saturday'){
//         deliveryDate = deliveryDate.add(2,'days');
//     }

//     else if(d === 'Sunday'){
//         deliveryDate = deliveryDate.add(1,'days')
//     }
//     const datestring = deliveryDate.format(
//         'dddd , MMMM D'
//     );

//     return datestring;
// }

function isWeekend(date){
    const d = date.format('dddd');
    if (d === 'Saturday' || d === 'Sunday'){
        return true;
    }
    else return false;
}

export function calculateDeliveryDate(deliveryOption){
    
    let remainingDays = deliveryOption.deliveryDays;
    let curr = dayjs();
    while(remainingDays > 0){
        curr = curr.add(1,'day');
        if(!isWeekend(curr)){
            remainingDays = remainingDays - 1;
        }
    }
    const datestring = curr.format(
        'dddd , MMMM D'
    );

    return datestring;
}
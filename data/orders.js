export const orders = JSON.parse(localStorage.getItem('orders')) || [];
export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders' , JSON.stringify(orders));
}

export class Order{
    id;
    image;
    name;
    rating;
    priceCents;
    constructor(productDetails){
      this.id = productDetails.id;
      this.image= productDetails.image;
      this.name = productDetails.name;
      this.rating = productDetails.rating;
      this.priceCents = productDetails.priceCents;
      
    }
  
    // getStarsUrl(){
    //    return `images/ratings/rating-${this.rating.stars * 10}.png`
    // }
    // getPrice(){
    //  return `${formatCurrency(this.priceCents)}`
    // }
    // extraInfoHTML(){
    //   return '';
    // }
  }
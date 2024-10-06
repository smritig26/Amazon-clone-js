
export let cart;
loadFromStorage();
export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart = [{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2,
    deliveryOptionId : '2'
  },{
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1,
    deliveryOptionId : '2'
  
  }];
}
}
function saveToStorage(){
  localStorage.setItem('cart' , JSON.stringify(cart));

}
export function addToCart(productId,val){
    let matchingitem;
  
      cart.forEach((item) => {
        if(productId === item.productId){
          matchingitem = item;
        }
      });
      if(matchingitem){
        matchingitem.quantity += val;
      }
      else{
        cart.push({
          productId,
          quantity : val,
          deliveryOptionId : '1'
        });
      }

      saveToStorage();
  }

 export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem) => {
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });

    cart = newCart;

    saveToStorage();
 }

 export function calculateCartQunatity(){
  let cartquantity = 0;
  cart.forEach((item) => {
      cartquantity += item.quantity;
    });

    // document.querySelector('.js-header-update').innerHTML = `${cartquantity}`;
    // if(cartquantity!=0){
    // document.querySelector('.js-cart-quantity').innerHTML = cartquantity;
    return cartquantity;
  }

 export function updateQuantity(productId , newQuant){
    // const productId = document.querySelector()
    let matchingItem;
    cart.forEach((item) => {
      if(productId === item.productId){
        matchingItem = item;
      }
    });

    matchingItem.quantity = newQuant;
    saveToStorage();
 }

 export function updateDeliveryOptions(productId , deliveryOptionId){
  let matchingitem;
  
  cart.forEach((item) => {
    if(productId === item.productId){
      matchingitem = item;
    }
  });
  if(!matchingitem){
    return ;
  }

  


  matchingitem.deliveryOptionId = deliveryOptionId;
  saveToStorage();

 }


 export function loadCart(fun){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load' , () => {
    // products = JSON.parse(xhr.response).map((productDetails) => {
    //     if(productDetails.type === 'clothing'){
    //       return new Clothing(productDetails);
    //     }
      
    //     else if(productDetails.type === 'appliance'){
    //       return new Appliance(productDetails);
    //     }
    //     return new Product(productDetails);
    //   });
    console.log(xhr.response);
     
      fun();
  });
  xhr.open('GET' , 'https://supersimplebackend.dev/cart');
  xhr.send();
}


export async function loadCartFetch() {
  const respnse = await fetch('https://supersimplebackend.dev/cart');
  const text = await respnse.text();
  console.log(text);
  return text;
}
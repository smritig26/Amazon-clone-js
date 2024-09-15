class Cart{
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    
    }
    #loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
      if(!this.cartItems){
        this.cartItems = [{
          productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity : 2,
          deliveryOptionId : '1'
        },{
          productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity : 1,
          deliveryOptionId : '2'
        
        }];
      }
      }

      saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
      
      }

      addToCart(productId,val){
        let matchingitem;
      
          this.cartItems.forEach((item) => {
            if(productId === item.productId){
              matchingitem = item;
            }
          });
          if(matchingitem){
            matchingitem.quantity += val;
          }
          else{
            this.cartItems.push({
              productId,
              quantity : val,
              deliveryOptionId : '1'
            });
          }
    
          this.saveToStorage();
      }

      removeFromCart(productId){
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
          if(cartItem.productId !== productId){
            newCart.push(cartItem);
          }
        });
    
        this.cartItems = newCart;
    
        this.saveToStorage();
     }

     updateDeliveryOptions(productId , deliveryOptionId){
        let matchingitem;
        
        this.cartItems.forEach((item) => {
          if(productId === item.productId){
            matchingitem = item;
          }
        });
        if(!matchingitem){
          return ;
        }
        matchingitem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
      
       }


       calculateCartQunatity(){
        let cartquantity = 0;
        this.cartItems.forEach((item) => {
            cartquantity += item.quantity;
          });
      
          // document.querySelector('.js-header-update').innerHTML = `${cartquantity}`;
          // if(cartquantity!=0){
          // document.querySelector('.js-cart-quantity').innerHTML = cartquantity;
          return cartquantity;
        }

        updateQuantity(productId , newQuant){
            // const productId = document.querySelector()
            let matchingItem;
            this.cartItems.forEach((item) => {
              if(productId === item.productId){
                matchingItem = item;
              }
            });
        
            matchingItem.quantity = newQuant;
            this.saveToStorage();
        }
    

};





const cart = new Cart('cart-oop');
const businesscart = new Cart('cart-business');


console.log(cart);
console.log(businesscart);

console.log(businesscart instanceof Cart);
 



 

 
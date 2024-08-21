
export const cart = [];
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
          quantity : val
        });
      }
  }
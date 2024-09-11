import { addToCart , cart , loadFromStorage , removeFromCart , updateDeliveryOptions} from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryoptions.js";
describe('test suite : addToCart' , ()=> {
    beforeEach(() => {
        spyOn(localStorage , 'setItem');
        
    })
    it('adds an existing product to thr cart' ,()=>{
        
        spyOn(localStorage , 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'}
            ]);
        });
        
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
         
         expect(cart.length).toEqual(1);
         
         expect(localStorage.setItem).toHaveBeenCalledTimes(1);
         
         expect(localStorage.setItem).toHaveBeenCalledWith('cart' , JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }
         ]) );
         expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
         expect(cart[0].quantity).toEqual(2);
    });

    it('adds a new product to the cart' , () =>{
        
        spyOn(localStorage , 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        
        loadFromStorage();
         addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
         
         expect(cart.length).toEqual(1);
         expect(localStorage.setItem).toHaveBeenCalledTimes(1);
         expect(localStorage.setItem).toHaveBeenCalledWith('cart' , JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }
         ]) );
         expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
         expect(cart[0].quantity).toEqual(1);
    });


})

describe('test suite : removeFromCart' , () => {
    beforeEach(() => {
        spyOn(localStorage , 'setItem');
        spyOn(localStorage , 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'}
            ]);
        });
        loadFromStorage();
    })

    it('removes product id from cart' , () => {
       

        
        removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(
            (cart.length)
        ).toEqual(0);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
         expect(localStorage.setItem).toHaveBeenCalledWith('cart' , JSON.stringify([]) );
    })


    it('removes product id not in the cart' , () => {
        

        
        removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
         expect(localStorage.setItem).toHaveBeenCalledWith('cart' , JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }
         ]) );

    })



})


describe('test suite : updateDeliveryOption' , () => {
    beforeEach(() => {
        spyOn(localStorage , 'setItem');
        spyOn(localStorage , 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'}
            ]);
        });
        loadFromStorage();
    })
    it('update the delivery option:' , () => {
        updateDeliveryOptions('e43638ce-6aa0-4b85-b27f-e1d07eb678c6' , '2');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).
        toHaveBeenCalledWith('cart' , JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '2'
            }
         ]));
    })

    it('edge case : update the delivery option not in cart : ', () => {
        updateDeliveryOptions('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        // expect(localStorage.setItem).
        // toHaveBeenCalledWith('cart' , JSON.stringify([
        //     {
        //         productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        //         quantity: 1,
        //         deliveryOptionId: '1'
        //     }
        //  ]));
        expect(cart.length).toEqual(1);

    })



    it('edge case 2 : update the delivery option' , () => {
        getDeliveryOption('4');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    } )
})


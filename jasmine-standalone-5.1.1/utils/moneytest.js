import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite : formatCurrency' , () => {
    it('converts cents to dollars' , () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with zeroes' , () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounds upto the nearest cent' , () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });

    it('rounds upto nearest cent' , () => {
        expect(formatCurrency(2000.4)).toEqual('20.00');
    })

    it('test with negative number' , () => {
        expect(formatCurrency(-2095)).toEqual('-20.95');
    })

    
});


import { fromJS } from 'immutable';
import makeSelectQrGenerator from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectQrGenerator', () => {
    it('Expect makeSelectQrGenerator to return state from reducer', () => {
        const selector = makeSelectQrGenerator();
        const mock = fromJS({ QrGenerator: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});

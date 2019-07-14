import { fromJS } from 'immutable';
import makeSelectAllWishesPage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectAllWishesPage', () => {
    it('Expect makeSelectAllWishesPage to return state from reducer', () => {
        const selector = makeSelectAllWishesPage();
        const mock = fromJS({ AllWishesPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});

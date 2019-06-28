import { fromJS } from 'immutable';
import makeSelectWishesPage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectWishesPage', () => {
    it('Expect makeSelectWishesPage to return state from reducer', () => {
        const selector = makeSelectWishesPage();
        const mock = fromJS({ WishesPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});

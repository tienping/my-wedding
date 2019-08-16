import { fromJS } from 'immutable';
import makeSelectGuestPage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectGuestPage', () => {
    it('Expect makeSelectGuestPage to return state from reducer', () => {
        const selector = makeSelectGuestPage();
        const mock = fromJS({ GuestPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});

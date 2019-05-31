import { fromJS } from 'immutable';
import makeSelectLandingPage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectLandingPage', () => {
    it('Expect makeSelectLandingPage to return state from reducer', () => {
        const selector = makeSelectLandingPage();
        const mock = fromJS({ LandingPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});

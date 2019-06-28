import { fromJS } from 'immutable';
import makeSelectDashboardPage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectDashboardPage', () => {
    it('Expect makeSelectDashboardPage to return state from reducer', () => {
        const selector = makeSelectDashboardPage();
        const mock = fromJS({ DashboardPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});

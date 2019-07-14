
import { fromJS } from 'immutable';
import wishesPageReducer from '../reducer';

describe('wishesPageReducer', () => {
    it('returns the initial state', () => {
        expect(wishesPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});


import { fromJS } from 'immutable';
import guestPageReducer from '../reducer';

describe('guestPageReducer', () => {
    it('returns the initial state', () => {
        expect(guestPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});

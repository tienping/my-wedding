
import { fromJS } from 'immutable';
import allWishesPageReducer from '../reducer';

describe('allWishesPageReducer', () => {
    it('returns the initial state', () => {
        expect(allWishesPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});

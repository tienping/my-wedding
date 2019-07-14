
import { fromJS } from 'immutable';
import galleryPageReducer from '../reducer';

describe('galleryPageReducer', () => {
    it('returns the initial state', () => {
        expect(galleryPageReducer(undefined, {})).toEqual(fromJS({}));
    });
});

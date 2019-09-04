
import { fromJS } from 'immutable';
import qrGeneratorReducer from '../reducer';

describe('qrGeneratorReducer', () => {
    it('returns the initial state', () => {
        expect(qrGeneratorReducer(undefined, {})).toEqual(fromJS({}));
    });
});

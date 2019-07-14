import { fromJS } from 'immutable';
import makeSelectGalleryPage from '../selectors';
import { initialState } from '../reducer';

describe('makeSelectGalleryPage', () => {
    it('Expect makeSelectGalleryPage to return state from reducer', () => {
        const selector = makeSelectGalleryPage();
        const mock = fromJS({ GalleryPage: initialState });
        expect(selector(mock)).toEqual(initialState.toJS());
    });
});

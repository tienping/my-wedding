import { createSelector } from 'reselect';

/**
 * Direct selector to the wishesPage state domain
 */
const selectWishesPageDomain = (state) => state.get('wishesPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by WishesPage
 */

const makeSelectWishesPage = () => createSelector(
    selectWishesPageDomain,
    (substate) => substate.toJS()
);

export default makeSelectWishesPage;
export {
    selectWishesPageDomain,
};

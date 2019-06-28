import { createSelector } from 'reselect';

/**
 * Direct selector to the allWishesPage state domain
 */
const selectAllWishesPageDomain = (state) => state.get('allWishesPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AllWishesPage
 */

const makeSelectAllWishesPage = () => createSelector(
    selectAllWishesPageDomain,
    (substate) => substate.toJS()
);

export default makeSelectAllWishesPage;
export {
    selectAllWishesPageDomain,
};

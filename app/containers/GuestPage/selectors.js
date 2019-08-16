import { createSelector } from 'reselect';

/**
 * Direct selector to the guestPage state domain
 */
const selectGuestPageDomain = (state) => state.get('guestPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by GuestPage
 */

const makeSelectGuestPage = () => createSelector(
    selectGuestPageDomain,
    (substate) => substate.toJS()
);

export default makeSelectGuestPage;
export {
    selectGuestPageDomain,
};

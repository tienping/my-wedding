import { createSelector } from 'reselect';

/**
 * Direct selector to the qrGenerator state domain
 */
const selectQrGeneratorDomain = (state) => state.get('qrGenerator');

/**
 * Other specific selectors
 */


/**
 * Default selector used by QrGenerator
 */

const makeSelectQrGenerator = () => createSelector(
    selectQrGeneratorDomain,
    (substate) => substate.toJS()
);

export default makeSelectQrGenerator;
export {
    selectQrGeneratorDomain,
};

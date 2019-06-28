/**
 *
 * Asynchronously loads the component for AllWishesPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});

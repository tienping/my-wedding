/**
 *
 * Asynchronously loads the component for GuestPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});

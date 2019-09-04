/**
 *
 * Asynchronously loads the component for QrGenerator
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});

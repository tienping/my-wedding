/**
 *
 * Asynchronously loads the component for CountdownTimer
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});

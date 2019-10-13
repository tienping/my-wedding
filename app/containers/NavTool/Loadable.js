/**
 *
 * Asynchronously loads the component for NavTool
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});

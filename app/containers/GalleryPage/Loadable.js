/**
 *
 * Asynchronously loads the component for GalleryPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null,
});

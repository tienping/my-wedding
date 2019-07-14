/**
 *
 * GalleryPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectGalleryPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './style.scss';

export class GalleryPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render = () => (
        <div>
            <Helmet>
                <title>GalleryPage</title>
                <meta name="description" content="Description of GalleryPage" />
            </Helmet>
            <FormattedMessage {...messages.header} />
        </div>
    );
}

GalleryPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    gallerypage: makeSelectGalleryPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'galleryPage', reducer });
const withSaga = injectSaga({ key: 'galleryPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter,
)(GalleryPage);

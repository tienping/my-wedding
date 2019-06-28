/**
 *
 * WishesPage
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

import makeSelectWishesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './style.scss';

export class WishesPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render = () => (
        <div>
            <Helmet>
                <title>WishesPage</title>
                <meta name="description" content="Description of WishesPage" />
            </Helmet>
            <FormattedMessage {...messages.header} />
        </div>
    );
}

WishesPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    wishespage: makeSelectWishesPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'wishesPage', reducer });
const withSaga = injectSaga({ key: 'wishesPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter,
)(WishesPage);

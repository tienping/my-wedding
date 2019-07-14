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

            <div className={`wishlist-content ${window.innerWidth > 600 ? 'is-desktop' : 'is-mobile'}`}>
                <div className="wishlist-form">
                    <div className="float-container">
                        <div>
                            <div>Image:</div>
                            <input type="file" />
                        </div>
                        <div>
                            <div>Message:</div>
                            <input type="textarea" />
                        </div>
                    </div>
                </div>
                <div className="wishlist-roll">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((wish, index) => {
                            const imageSource = require(`./images/gallery-${wish}.jpg`);

                            return (
                                <div className="wishlist-item" key={index}>
                                    <div className="background-opacity" style={{ backgroundImage: `url(${imageSource})` }}></div>
                                    <img className="wishlist-item-image" src={imageSource} alt="preview" />
                                    <div className="wishlist-msg">
                                        <div className="msg-container">
                                            <div className="msg-text">
                                                We wish you a merry Christmas.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
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

/**
 *
 * GuestPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import CountdownTimer from 'components/CountdownTimer';

import globalScope from 'globalScope';
import { guestRef } from 'firebaseUtil';
import { dataChecking } from 'globalUtils';

import makeSelectGuestPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import './style.scss';

export class GuestPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            guestData: null,
        };
    }

    componentDidMount = () => {
        if (dataChecking(this.props, 'match', 'params', 'guest') === 'guest' && dataChecking(this.props, 'match', 'params', 'id')) {
            this.setState({ guestNum: this.props.match.params.id });
            guestRef.child(`${globalScope.firebaseDbPrefix}${this.props.match.params.id}`).once('value', (snapshot) => {
                console.log(snapshot.val());
                this.setState({ guestData: snapshot.val() });
            });
        }
    }

    renderTeaser = () => (
        <div>
            <div className="countdown-timer">
                <CountdownTimer simple={false && !this.state.guestData} />
            </div>

            <div className="section-text animated fadeInDown">
                <div className="content container">
                    {
                        this.state.guestData ?
                            <div className="guest-info">
                                <div>宾客资料:</div>
                                <hr />
                                <div className="info-content">
                                    <div className="info-row">
                                        <div className="info-header">名字</div>
                                        <div className="info-column-symbol">:</div>
                                        <div className="info-text">{this.state.guestData.name}</div>
                                    </div>
                                    <div className="info-row">
                                        <div className="info-header">出席人数</div>
                                        <div className="info-column-symbol">:</div>
                                        <div className="info-text">{this.state.guestData.pax}人</div>
                                    </div>
                                    <div className="info-row">
                                        <div className="info-header">桌号</div>
                                        <div className="info-column-symbol">:</div>
                                        <div className="info-text">{this.state.guestData.table || '- 未定 -'}</div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div>Loading...</div>
                    }
                </div>
            </div>
        </div>
    )

    renderRegister = () => (
        <div>
            <div className="section-text animated fadeIn">
                <div className="content container">
                    Welcome
                </div>
            </div>
        </div>
    )

    render = () => (
        <div className="guest-page">
            <div className="page-overlay" />
            <Helmet>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>TienPing ZhiLing - Guest</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Guest of TienPing and ZhiLing" />
                <meta name="author" content="TienPing Lim" />

                {/* Facebook and Twitter integration */}
                <meta property="og:title" content="" />
                <meta property="og:image" content="" />
                <meta property="og:url" content="" />
                <meta property="og:site_name" content="" />
                <meta property="og:description" content="" />
                <meta name="twitter:title" content="" />
                <meta name="twitter:image" content="" />
                <meta name="twitter:url" content="" />
                <meta name="twitter:card" content="" />
            </Helmet>

            <div className="page-content">
                <div className={`couple-name p-0 mt-0 ${this.state.guestData ? 'info' : ''}`}>TienPing & ZhiLing</div>

                {
                    globalScope.activated === 'tpzl' ?
                        this.renderRegister()
                        :
                        this.renderTeaser()
                }

                <div
                    className="buttons animated slideInDown"
                    onClick={this.props.onClose}
                >
                    <NavLink className="button" to="/">
                        Back to Home Page
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

GuestPage.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    guestpage: makeSelectGuestPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'guestPage', reducer });
const withSaga = injectSaga({ key: 'guestPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter,
)(GuestPage);

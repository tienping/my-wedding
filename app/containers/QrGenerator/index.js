/**
 *
 * QrGenerator
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { dataChecking, getQueryParams, Events } from 'globalUtils';
import globalScope from 'globalScope';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectQrGenerator from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export class QrGenerator extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        path: null,
        quantity: 400,
        title: 'Count',
        size: 50,
    };
    componentDidMount = () => {
        globalScope.hideTopBar = true;
        Events.trigger('forceUpdateTopBar');
        // const path = dataChecking(this.props, 'location', 'query', 'path');
        const queryParams = getQueryParams(dataChecking(this.props, 'location', 'search'));
        this.setState({
            path: queryParams.path,
            title: queryParams.title || this.state.title,
            quantity: queryParams.quantity ? parseInt(queryParams.quantity, 10) : this.state.quantity,
            size: queryParams.size ? parseInt(queryParams.size, 10) : this.state.size,
        });
    }

    renderQrItem = () => [...Array(this.state.quantity)].map((value, index) => (
        <span
            className={`qr-item qr-item-${index + 1}`}
            key={index}
            style={{
                padding: `${this.state.size / 7.5}px`,
                paddingBottom: `${(this.state.size / 10) - 3}px`,
            }}
        >
            <div className="canvas-holder">
                <QRCode
                    className="item-qr-image"
                    value={`${this.state.path.replace(':id', index + 1)}`}
                    style={{
                        height: `${this.state.size}px`,
                        width: `${this.state.size}px`,
                    }}
                />
            </div>
            <div
                className="item-display"
                style={{ fontSize: `${this.state.size / 6}px` }}
            >
                <span className="item-title">{decodeURI(this.state.title)}</span>
                <span className="item-counter">
                    {
                        [...Array(String(this.state.quantity).length)].map((value2, index2) => {
                            if ((index2) < String(index + 1).length) {
                                return null;
                            }
                            return '0';
                        })
                    }
                    {index + 1}
                </span>
            </div>
        </span>
    ));

    render = () => (
        <div>
            {
                this.state.path ?
                    this.renderQrItem()
                    :
                    <div>
                        No data found...
                    </div>
            }
        </div>
    );
}

QrGenerator.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    qrgenerator: makeSelectQrGenerator(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'qrGenerator', reducer });
const withSaga = injectSaga({ key: 'qrGenerator', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter,
)(QrGenerator);

/**
 *
 * GalleryPage
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

// import globalScope from 'globalScope';
import { galleryRef } from 'firebaseUtil';
// import { dataChecking } from 'globalUtils';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectGalleryPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import './style.scss';

export class GalleryPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            galleryData: null,
            zoomed: null,
        };
    }

    componentDidMount = () => {
        galleryRef.on('value', (snapshot) => {
            console.log(snapshot.val());

            const dataArr = snapshot.val();
            let result = dataArr || [];

            if (typeof dataArr === 'object' && !(dataArr instanceof Array)) {
                result = [];
                Object.keys(dataArr).forEach((key) => {
                    result.push({
                        ...dataArr[key],
                        id: dataArr[key].id || key,
                    });
                });
            }

            // result = [...result, ...result, ...result, ...result];

            result = result.sort((item1, item2) => (item1.arrangement || 0) - (item2.arrangement || 0));

            this.setState({ galleryData: result });
        });
    }

    render = () => (
        <div>
            <Helmet>
                <title>GalleryPage</title>
                <meta name="description" content="Description of GalleryPage" />
            </Helmet>
            <div className="gallery-page">
                {
                    this.state.zoomed !== null ?
                        <div
                            className="gallery-modal-overlay"
                            onClick={() => {
                                this.setState({ zoomed: null });
                            }}
                        ><i className="close-button fas fa-times" /></div>
                        :
                        null
                }
                <div className="gallery-list">
                    {
                        this.state.galleryData ?
                            this.state.galleryData.map((item, index) => (
                                <div
                                    key={index}
                                    className={`gallery-item ${this.state.zoomed === index ? 'zoom' : ''}`}
                                    onClick={() => {
                                        this.setState({
                                            zoomed: this.state.zoomed !== null ? null : index,
                                        });
                                    }}
                                >
                                    <div className="gallery-content">
                                        <img className="animated zoomIn" src={item.image} alt={item.caption} />
                                    </div>
                                </div>
                            ))
                            :
                            null
                    }
                </div>
                <div className="buttons">
                    <div
                        className="home-button animated fadeInUp"
                        onClick={this.props.onClose}
                    >
                        <NavLink className="button" to="/">
                            Back to Home Page
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

GalleryPage.propTypes = {
    // dispatch: PropTypes.func.isRequired,
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

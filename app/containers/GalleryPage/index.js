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
import Masonry from 'react-masonry-component';

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

const masonryOptions = {
    transitionDuration: 0,
};
const imagesLoadedOptions = {
    // background: '.my-bg-image-el',
};

export class GalleryPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.state = {
            galleryData: null,
            toggleModal: null,
        };
    }

    componentDidMount = () => {
        galleryRef.on('value', (snapshot) => {
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
                <Masonry
                    className={'gallery-list'} // default ''
                    // elementType={'ul'} // default 'div'
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    imagesLoadedOptions={imagesLoadedOptions} // default {}
                >
                    {
                        this.state.galleryData ?
                            this.state.galleryData.map((item, index) => (
                                <div
                                    key={index}
                                    className="gallery-item animated fadeIn"
                                    onClick={() => {
                                        this.setState({
                                            toggleModal: item,
                                        });
                                    }}
                                >
                                    <div
                                        className="gallery-content"
                                        // style={item.extrastyle ? JSON.parse(item.extrastyle) : {}}
                                    >
                                        <img className="animated " src={item.thumbnail} alt={item.caption} />
                                    </div>
                                </div>
                            ))
                            :
                            null
                    }
                </Masonry>
                {
                    this.state.toggleModal ?
                        <div>
                            <div
                                className="gallery-content-modal"
                                onClick={() => {
                                    this.setState({ toggleModal: null });
                                }}
                            >
                                <div
                                    className="gallery-content-modal-inner animated zoomIn"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                >
                                    <i
                                        className="close-button fas fa-times"
                                        onClick={() => {
                                            this.setState({ toggleModal: null });
                                        }}
                                    />
                                    <img
                                        className=""
                                        src={this.state.toggleModal.image}
                                        alt={this.state.toggleModal.caption}
                                    />
                                </div>
                            </div>
                            <div
                                className="gallery-modal-overlay"
                                onClick={() => {
                                    this.setState({ toggleModal: null });
                                }}
                            />
                        </div>
                        :
                        null
                }

                <div className="buttons">
                    <div
                        className="home-button animated fadeInUp"
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

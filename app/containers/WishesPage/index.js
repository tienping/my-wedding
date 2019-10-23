/**
 *
 * WishesPage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';

import { dataChecking, getCookie } from 'globalUtils';
import {
    wishRef,
    firebaseStorage,
    firebaseStorageTaskState,
} from 'firebaseUtil';

import { FilePond, registerPlugin } from 'assets/react-filepond.js';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectWishesPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import './style.scss';

registerPlugin(FilePondPluginImagePreview);

const initialState = {
    nickname: '',
    image: {},
    message: '',
};

export class WishesPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = initialState;

    onSubmit = () => {
        const extractedData = {
            nickname: this.state.nickname || initialState.nickname,
            image: this.state.image.value || initialState.image,
            message: this.state.message || initialState.message,
            creation_date: Date.now(),
            status: true,
            creator: getCookie('tpzl_guest_info') ? getCookie('tpzl_guest_info').id : 'Anonymous',
        };

        const refId = wishRef.push().key;
        const result = wishRef.child(refId).set(extractedData);
        // TODO: success and failure handling
        result.then(() => {
            NotificationManager.success((
                <div>
                    {
                        Object.keys(initialState).map((key, index) => <div key={index}><span className="text-capitalize">{key}</span>{`: ${extractedData[key]}`}</div>)
                    }
                </div>
            ), 'Guest added.', 3000, () => {});
            this.initializedForm();
        }).catch(() => {
            NotificationManager.error((
                <div>Something wrong... Please contact system admin.</div>
            ), 'Fail to create wish... Please contact system admin', 3000, () => {});
        });
    };

    firebaseUploadImage = {};

    initializedForm = () => {
        this.setState(initialState);
    }

    handleTextChange = (event, key) => {
        this.setState({
            [key]: event.target.value,
        });
    }

    renderImageUploader = () => (
        <div className="input-container input-type-image">
            {
                dataChecking(this.state, 'image', 'current') &&
                    <div className="current-image-previewer">
                        <img
                            width="100px"
                            src={this.state.image.current}
                            alt="current-graphic-previewer"
                        />
                        <i className="fas fa-long-arrow-alt-left px-1"></i>
                        <span className="pr-1">current image</span>
                    </div>
            }
            <div className="gamicenter-imageUploader">
                <FilePond
                    id="gamicenter-imageUploader"
                    name="file"
                    files={dataChecking(this.state, 'image', 'uploadingFile')}
                    onupdatefiles={(fileItems) => {
                        if (firebaseStorage && dataChecking(fileItems, 0, 'file') && !this.firebaseUploadImage[fileItems[0].file.name]) {
                            this.firebaseUploadImage[fileItems[0].file.name] = true;

                            const obj = {};
                            obj.image = { uploadingFile: fileItems[0].file };
                            obj.uploadingImage = true;
                            this.setState(obj);

                            const firebaseStorageMetadata = {
                                cacheControl: 'public,max-age=300',
                            };
                            const uploadTask = firebaseStorage.child(`wish/${Date.now()}_${fileItems[0].file.name}`).put(fileItems[0].file, firebaseStorageMetadata);
                            uploadTask.on('state_changed', (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log(`Upload is ${progress}% done`);
                                switch (snapshot.state) {
                                    case firebaseStorageTaskState.PAUSED: // or 'paused'
                                        console.log('Upload is paused');
                                        break;
                                    case firebaseStorageTaskState.RUNNING: // or 'running'
                                        console.log('Upload is running');
                                        break;
                                    default:
                                        console.log('Default..');
                                }
                            }, (error) => {
                                console.log('Upload file failed!', error);
                            }, () => {
                                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                    const obj2 = { uploadingImage: false };
                                    obj2.image = { ...this.state.image };
                                    obj2.image.value = downloadURL;
                                    this.setState(obj2);
                                });
                            });
                        } else {
                            const obj = {};
                            obj.image = { uploadingFile: fileItems.map(
                                (fileItem) => fileItem.file
                            ) };
                            obj.uploadingImage = true;
                            this.setState(obj);
                        }
                    }}
                    allowMultiple={false}
                />
            </div>
        </div>
    )

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
                            <div>Nickname:</div>
                            <div className="input-container input-type-textbox">
                                <input
                                    type="textbox"
                                    className="default-input-textbox"
                                    placeholder="Your Nickname"
                                    value={dataChecking(this.state, 'nickname') || ''}
                                    onChange={(event) => this.handleTextChange(event, 'nickname')}
                                />
                            </div>
                        </div>
                        <div>
                            <div>Image:</div>
                            {this.renderImageUploader()}
                        </div>
                        <div>
                            <div>Message:</div>
                            <div className="input-container input-type-textarea">
                                <textarea
                                    className="default-input-textarea"
                                    placeholder="Your best wishes"
                                    value={dataChecking(this.state, 'message') || ''}
                                    onChange={(event) => this.handleTextChange(event, 'message')}
                                />
                            </div>
                        </div>
                        <div className="submit-button">
                            <hr />
                            <div
                                className={`my-custom-button smaller ${this.state.uploadingImage ? 'button-disabled' : ''}`}
                                onClick={() => {
                                    if (this.state.uploadingImage) {
                                        alert('Please be patient until the image upload process to complete.');
                                    } else {
                                        this.onSubmit();
                                    }
                                }}
                            >
                                {
                                    this.state.firing ?
                                        <span>loading...</span>
                                        :
                                        <span>{`${this.props.submitButtonText || 'Submit'}`}</span>
                                }
                            </div>
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
    // dispatch: PropTypes.func.isRequired,
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

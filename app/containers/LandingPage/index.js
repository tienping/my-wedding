/**
 *
 * LandingPage
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
// import topNavSetting from 'configs/topNavSetting';

import globalScope from 'globalScope';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import CountdownTimer from 'components/CountdownTimer';
import GuestPage from 'containers/GuestPage';
import { fireEmail } from 'emailUtil';
import { dataChecking } from 'globalUtils';

import makeSelectLandingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import './style.scss';
import './css/style.scss';

export class LandingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        modalTitle: null,
        modalMessageType: null,
        modalMessage: null,
        guestNum: null,
    };

    componentDidMount = () => {
        globalScope.initMainScript();

        if (dataChecking(this.props, 'match', 'params', 'guest') === 'guest' && dataChecking(this.props, 'match', 'params', 'id')) {
            this.setState({ guestNum: this.props.match.params.id });
        }
    }

    render = () => (
        <div className={`landing-whole ${this.state.guestNum ? 'show-guest' : ''}`}>
            <Helmet>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>Wedding &mdash; When Mr Lim meets Miss Ngu</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="TienPing and ZhiLing Wedding" />
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

            {
                this.state.guestNum !== null ?
                    <div className="guest-modal">
                        <GuestPage
                            guestId={this.state.guestNum}
                            onClose={() => this.setState({ guestNum: null })}
                        />
                    </div>
                    :
                    null
            }

            {/* <div style={{ height: '1px', backgroundColor: 'black' }} /> */}

            <div className={`landing-content ${this.state.guestNum ? 'show-guest' : ''}`}>
                <header
                    role="banner"
                    id="qbootstrap-header"
                    style={{
                        position: 'sticky',
                        // paddingTop: topNavSetting && topNavSetting.length ? '64px' : '35px',
                        // marginTop: topNavSetting && topNavSetting.length ? '-64px' : '-35px',
                    }}
                >
                    <div className="header-bg" />
                    <div className="container">
                        {/* <div className="row"> */}
                        <nav className={`navbar navbar-default ${this.state.showNavbar ? 'showNavbar active' : ''}`}>
                            <div className="navbar-header">
                                {/* Mobile Toggle Menu Button */}
                                <div
                                    className="js-qbootstrap-nav-toggle qbootstrap-nav-toggle"
                                    onClick={() => {
                                        this.setState({ showNavbar: !this.state.showNavbar });
                                    }}
                                ><i></i></div>
                                <a className="navbar-brand" href="/">TienPing & ZhiLing</a>
                            </div>
                            <div className={`mobile-menu animated fadeInLeft ${this.state.showNavbar ? 'showNavbar' : ''}`}>
                                <div id="navbar" className="navbar-collapse animated slideInLeft">
                                    <ul className="nav navbar-nav navbar-right">
                                        {
                                            [
                                                { section: 'home', label: 'Home' },
                                                { section: 'couple', label: 'Couple' },
                                                { section: 'countdown', label: 'Countdown' },
                                                { section: 'groom-bride', label: 'Groom & Bride' },
                                                { section: 'when-where', label: 'When & Where' },
                                                { section: 'rsvp', label: 'RSVP' },
                                            ].map((value, index) => (
                                                <li className={`${index === 0 ? 'active' : ''}`}>
                                                    <a
                                                        href=""
                                                        className="external"
                                                        data-nav-section={value.section}
                                                        onClick={(event) => {
                                                            this.setState({ showNavbar: false });
                                                            const navbar = window.$('#navbar');

                                                            if (window.$(`[data-section="${value.section}"]`).offset()) {
                                                                window.$('html, body').animate({
                                                                    scrollTop: window.$(`[data-section="${value.section}"]`).offset().top,
                                                                }, 500);
                                                            }

                                                            if (navbar.is(':visible')) {
                                                                navbar.removeClass('in');
                                                                navbar.attr('aria-expanded', 'false');
                                                                window.$('.js-qbootstrap-nav-toggle').removeClass('active');
                                                            }

                                                            event.preventDefault();
                                                        }}
                                                    >
                                                        <span>{value.label}</span>
                                                    </a>
                                                </li>
                                            ))
                                        }
                                        {/* <li><a href="" data-nav-section="story"><span>Love Story</span></a></li> */}
                                        {/* <li><a href="" data-nav-section="greetings"><span>Greetings</span></a></li> */}
                                        {/* <li><a href="" data-nav-section="people"><span>People</span></a></li> */}
                                        {/* <li><a href="" data-nav-section="gallery"><span>Gallery</span></a></li> */}
                                        {/* <li><a href="" data-nav-section="blog"><span>Blog</span></a></li> */}
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        {/* </div> */}
                    </div>
                </header>

                <div id="qbootstrap-slider-hero" data-section="home">
                    <div style={{ height: '1px', backgroundColor: 'black' }} />
                    <div className="flexslider">
                        <ul className="slides">
                            <li style={{ backgroundImage: `url(${require('./images/with-book.jpg')})` }}>
                                <div className="overlay"></div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2 text-center slider-text">
                                            <div className="slider-text-inner">
                                                <h2>
                                                    <div className="holder">
                                                        <span>The Wedding of</span>
                                                    </div>
                                                    <div>Tien Ping &amp; Zhi Ling</div>
                                                </h2>
                                                <h3>Welcome to our wedding website! Thank you so much for visiting! This is the place you&#39;ll find updates about our wedding celebration.</h3>
                                                <p className="date"><span>26.10.2019</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li style={{ backgroundImage: `url(${require('./images/doll-machine.jpg')})` }}>
                                <div className="overlay"></div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2 text-center slider-text">
                                            <div className="slider-text-inner">
                                                <h2>
                                                    <div className="holder">
                                                        <span>The Wedding of</span>
                                                    </div>
                                                    <div>Tien Ping &amp; Zhi Ling</div>
                                                </h2>
                                                <h3>Welcome to our wedding website! Thank you so much for visiting! This is the place you&#39;ll find updates about our wedding celebration.</h3>
                                                <p className="date"><span>26.10.2019</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li style={{ backgroundImage: `url(${require('./images/dark-light.jpg')})` }}>
                                <div className="overlay"></div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2 text-center slider-text">
                                            <div className="slider-text-inner">
                                                <h2>
                                                    <div className="holder">
                                                        <span>Welcome to</span>
                                                    </div>
                                                    <div>Tien Ping &amp; Zhi Ling</div>
                                                </h2>
                                                <h3>Welcome to our wedding website! Thank you so much for visiting! This is the place you&#39;ll find updates about our wedding celebration.</h3>
                                                <p className="date"><span>26.10.2019</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li
                                style={{
                                    backgroundImage: window.innerWidth > 600 ?
                                        `url(${require('./images/jump.jpg')})`
                                        :
                                        `url(${require('./images/jump-mobile.jpg')})`,
                                }}
                            >
                                <div className="overlay"></div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2 text-center slider-text">
                                            <div className="slider-text-inner">
                                                <h2>
                                                    <div className="holder">
                                                        <span>Welcome to</span>
                                                    </div>
                                                    <div>Tien Ping &amp; Zhi Ling</div>
                                                </h2>
                                                <h3>Welcome to our wedding website! Thank you so much for visiting! This is the place you&#39;ll find updates about our wedding celebration.</h3>
                                                <p className="date"><span>26.10.2019</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li
                                style={{
                                    backgroundImage: window.innerWidth > 600 ?
                                        `url(${require('./images/cover_bg_dejoyce-sprinkle.jpg')})`
                                        :
                                        `url(${require('./images/cover_bg_dejoyce-sprinkle-mobile2.jpg')})`,
                                }}
                            >
                                <div className="overlay"></div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-8 col-md-offset-2 text-center slider-text">
                                            <div className="slider-text-inner">
                                                <h2>No Longer Two But One</h2>
                                                <h3>Welcome to our wedding website! Thank you so much for visiting! This is the place you&#39;ll find updates about our wedding celebration.</h3>
                                                <p className="date"><span>26.10.2019</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div id="qbootstrap-couple" className="qbootstrap-section-gray" data-section="couple">
                    <div className="container">
                        <div className="row animate-box">
                            <div className="col-md-8 col-md-offset-2 animate-box">
                                <div className="col-md-12 text-center section-heading svg-sm colored">
                                    <img src={require('./images/flaticon/svg/005-two.svg')} className="svg" alt="preview" />
                                    <h2>Are Getting Married</h2>
                                    <p>We decided to accompany each others for the whole life</p>
                                    <p><strong>on October 26, 2019 &mdash; Sing Ang Tong Methodist Church, Sibu Sarawak</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="row animate-box">
                            <div className="col-md-8 col-md-offset-2 text-center">
                                <div className="col-md-5 col-sm-5 col-xs-5 nopadding">
                                    <img src={require('./images/man.jpg')} className="img-responsive" alt="preview" />
                                    <a href="https://web.facebook.com/PetWesley"><h3 className="px-1 mx-half">Lim Tien Ping</h3></a>
                                    <span>Groom</span>
                                </div>
                                <div className="col-md-2 col-sm-2 col-xs-2 nopadding">
                                    <h2 className="amp-center">
                                        <img src={require('./images/flaticon/svg/003-luxury.svg')} className="svg img-responsive" alt="preview" />
                                    </h2>
                                </div>
                                <div className="col-md-5 col-sm-5 col-xs-5 nopadding">
                                    <img src={require('./images/woman.jpg')} className="img-responsive" alt="preview" />
                                    <a href="https://www.facebook.com/2LiNg.U"><h3 className="px-1 mx-half">Ngu Zhi Ling</h3></a>
                                    <span>Bride</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="qbootstrap-countdown" data-section="countdown">
                    <CountdownTimer />
                </div>

                <div id="qbootstrap-groom-bride" data-section="groom-bride">
                    <div className="container">
                        <div className="row animate-box">
                            <div className="col-md-8 col-md-offset-2">
                                <div className="col-md-12 text-center section-heading svg-sm-2 colored">
                                    <img src={require('./images/couple.jpg')} className="svg" alt="preview" />
                                    <h2>Groom &amp; Bride</h2>
                                    <h3>Come and celebrate with us.</h3>
                                </div>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-md-6">
                                <div className="couple groom text-center animate-box">
                                    <img src={require('./images/groom.jpg')} className="img-responsive" alt="preview" />
                                    <div className="desc">
                                        <h2>Louie Jie L. Mahusay</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda vero totam eum, necessitatibus reprehenderit nisi, ratione neque aspernatur sapiente minus? Omnis neque labore distinctio aspernatur esse impedit laboriosam, veritatis dolorem!</p>
                                        <ul className="social social-circle">
                                            <li><a href=""><i className="fab fa-twitter"></i></a></li>
                                            <li><a href=""><i className="fab fa-facebook"></i></a></li>
                                            <li><a href=""><i className="fab fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="couple bride text-center animate-box">
                                    <img src={require('./images/bride.jpg')} className="img-responsive" alt="preview" />
                                    <div className="desc">
                                        <h2>Marializa R. Tabay</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda vero totam eum, necessitatibus reprehenderit nisi, ratione neque aspernatur sapiente minus? Omnis neque labore distinctio aspernatur esse impedit laboriosam, veritatis dolorem!</p>
                                        <ul className="social social-circle">
                                            <li><a href=""><i className="fab fa-twitter"></i></a></li>
                                            <li><a href=""><i className="fab fa-facebook"></i></a></li>
                                            <li><a href=""><i className="fab fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                <div id="qbootstrap-when-where" data-section="when-where">
                    <div className="container">
                        <div className="row animate-box">
                            <div className="col-md-8 col-md-offset-2">
                                <div className="col-md-12 text-center section-heading svg-sm colored">
                                    <img src={require('./images/flaticon/svg/005-two.svg')} className="svg" alt="preview" />
                                    <h2>Ceremony &amp; Party</h2>
                                    <div className="row">
                                        <div className="col-md-10 col-md-offset-1 subtext">
                                            <h3>We will have a wedding ceremony in the morning and the wedding dinner will start after the sun set.</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row row-bottom-padded-md">
                            <div className="col-md-6 text-center animate-box">
                                <div className="wedding-events">
                                    <div className="ceremony-bg" style={{ backgroundImage: `url(${require('./images/wedding_ceremony2.jpg')})` }}></div>
                                    <div className="desc">
                                        <h3>Wedding Ceremony</h3>
                                        <div className="row">
                                            <div className="col-md-2 col-md-push-5">
                                                <div className="icon-tip">
                                                    <span className="icon"><i className="far fa-heart"></i></span>
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-md-pull-1">
                                                <div className="date">
                                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                                    <span>Saturday</span>
                                                    <span>26 Oct. 2019</span>
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-md-pull-1">
                                                <div className="date">
                                                    <i className="far fa-clock"></i>
                                                    <span>09:00 AM</span>
                                                    <span>11:30 AM</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p>Sing Ang Tong Methodist Church, Sibu</p>
                                        <p><a href="https://goo.gl/maps/njGQJk2QkTx1WnKF8" className="btn btn-primary btn-sm">Google Map</a></p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 text-center animate-box">
                                <div className="wedding-events">
                                    <div className="ceremony-bg" style={{ backgroundImage: `url(${require('./images/wedding_dinner.jpg')})` }}></div>
                                    <div className="desc">
                                        <h3>Wedding Party</h3>
                                        <div className="row">
                                            <div className="col-md-2 col-md-push-5">
                                                <div className="icon-tip">
                                                    <span className="icon"><i className="far fa-heart"></i></span>
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-md-pull-1">
                                                <div className="date">
                                                    <i className="fa fa-calendar"></i>
                                                    <span>Saturday</span>
                                                    <span>26 Oct. 2019</span>
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-md-pull-1">
                                                <div className="date">
                                                    <i className="far fa-clock"></i>
                                                    <span>07:00 PM</span>
                                                    <span>11:00 PM</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p>The Paramount Hotel, Sibu</p>
                                        <p><a href="https://goo.gl/maps/CyCYwaHbhZiRkzcm7" className="btn btn-primary btn-sm">Google Map</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div id="map" className="qbootstrap-map"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="qbootstrap-started" className="qbootstrap-bg" data-section="rsvp" data-stellar-background-ratio="0.5" style={{ backgroundImage: `url(${require('./images/owl-eye.jpg')})` }}>
                    <div className="overlay"></div>
                    <div className="container">
                        <div className="row animate-box">
                            <div className="col-md-8 col-md-offset-2">
                                <div className="col-md-12 text-center section-heading svg-sm colored">
                                    <img src={require('./images/flaticon/svg/005-two.svg')} className="svg" alt="preview" />
                                    <h2>You Are Invited</h2>
                                    <div className="row">
                                        <div className="col-md-10 col-md-offset-1 subtext">
                                            <h3>You are welcome to join our wedding ceremony at Sing Ang Tong Methodist Church on 26 October 2019, 9AM sharp. Please do leave us a message so we can arrange accordingly.</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row animate-box">
                            <div className="col-md-10 col-md-offset-1">
                                <div className="form-inline">
                                    <div className="col-md-4 col-sm-4">
                                        <div className="form-group">
                                            <label htmlFor="name" className="sr-only">Name</label>
                                            <input
                                                type="name"
                                                className="form-control"
                                                id="name"
                                                placeholder="Name"
                                                onChange={(event) => {
                                                    this.setState({
                                                        name: dataChecking(event, 'target', 'value'),
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                        <div className="form-group">
                                            <label htmlFor="contact" className="sr-only">Phone Number</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                id="contact"
                                                placeholder="Phone Number"
                                                onChange={(event) => {
                                                    this.setState({
                                                        contact: dataChecking(event, 'target', 'value'),
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4">
                                        <button
                                            className="btn btn-default btn-block"
                                            onClick={() => {
                                                if (!this.state.name || !this.state.contact) {
                                                    return null;
                                                }

                                                fireEmail({
                                                    templateParams: {
                                                        name: this.state.name,
                                                        contact: this.state.contact,
                                                    },
                                                    successCallback: () => this.setState({
                                                        name: '',
                                                        contact: '',
                                                        modalTitle: 'Success',
                                                        modalMessageType: 'success',
                                                        modalMessage: 'RSVP send successfully',
                                                    }),
                                                    failureCallback: () => this.setState({
                                                        modalTitle: 'Failed',
                                                        modalMessageType: 'error',
                                                        modalMessage: 'RSVP send failed... Please contact 0168556201 or petwesley@gmail.com.',
                                                    }),
                                                });

                                                return true;
                                            }}
                                        >I am Attending</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <script src={require('../../utils/main')}></script>
                </div>

                {
                    this.state.modalMessage ?
                        <div className="email-message-modal">
                            <div className="modal-overlay" />
                            <div className="modal-container animated bounce">
                                <div className="modal-inner">
                                    <div className="modal-header">
                                        <div className={`modal-title type-${this.state.modalMessageType}`}>
                                            {this.state.modalTitle || 'Email'}
                                        </div>
                                        <i
                                            onClick={() => {
                                                this.setState({
                                                    modalTitle: '',
                                                    modalMessageType: '',
                                                    modalMessage: '',
                                                });
                                            }}
                                            className="close-btn far fa-window-close"
                                        />
                                    </div>
                                    <div className="modal-content">
                                        {this.state.modalMessage}
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }

                <footer id="footer" role="contentinfo">
                    <div className="container">
                        <div className="row row-bottom-padded-sm">
                            <div className="col-md-12">
                                <p className="copyright text-center">&copy; 2019 <a href="index.html">WhenImeetU</a>. All Rights Reserved.</p>
                            </div>
                        </div>
                        {/* <div className="row">
                            <div className="col-md-12 text-center">
                                <ul className="social social-circle">
                                    <li><a href=""><i className="fab fa-twitter"></i></a></li>
                                    <li><a href=""><i className="fab fa-facebook"></i></a></li>
                                    <li><a href=""><i className="fab fa-youtube"></i></a></li>
                                    <li><a href=""><i className="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </footer>
            </div>
        </div>
    );
}

LandingPage.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
    landingpage: makeSelectLandingPage(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'landingPage', reducer });
const withSaga = injectSaga({ key: 'landingPage', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
    withRouter,
)(LandingPage);

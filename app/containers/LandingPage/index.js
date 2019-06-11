/**
 *
 * LandingPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import topNavSetting from 'configs/topNavSetting';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectLandingPage from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import './style.scss';
import './css/style.scss';

export class LandingPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    state = {
        loaded: false,
    }

    componentWillMount = () => {
        this.setState({
            loaded: true,
        });
    }

    render = () => (
        <div>
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

            <div style={{ height: '1px', backgroundColor: 'black' }} />

            <header
                role="banner"
                id="qbootstrap-header"
                style={{
                    position: 'sticky',
                    paddingTop: topNavSetting && topNavSetting.length ? '64px' : '35px',
                    marginTop: topNavSetting && topNavSetting.length ? '-64px' : '-35px',
                }}
            >
                <div className="top-navigation-bar-bg" />
                <div className="container">
                    {/* <div className="row"> */}
                    <nav className="navbar navbar-default">
                        <div className="navbar-header">
                            {/* Mobile Toggle Menu Button */}
                            <a href="" className="js-qbootstrap-nav-toggle qbootstrap-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>
                            <a className="navbar-brand" href="/">TienPing & ZhiLing</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li className="active"><a href="" data-nav-section="home"><span>Home</span></a></li>
                                <li><a href="" data-nav-section="groom-bride"><span>Groom &amp; Bride</span></a></li>
                                {/* <li><a href="" data-nav-section="story"><span>Love Story</span></a></li> */}
                                {/* <li><a href="" data-nav-section="greetings"><span>Greetings</span></a></li> */}
                                {/* <li><a href="" data-nav-section="people"><span>People</span></a></li> */}
                                <li><a href="" data-nav-section="when-where"><span>When &amp; Where</span></a></li>
                                <li><a href="" data-nav-section="rsvp"><span>RSVP</span></a></li>
                                {/* <li><a href="" data-nav-section="gallery"><span>Gallery</span></a></li> */}
                                {/* <li><a href="" data-nav-section="blog"><span>Blog</span></a></li> */}
                            </ul>
                        </div>
                    </nav>
                    {/* </div> */}
                </div>
            </header>

            <aside id="qbootstrap-slider-hero" data-section="home" style={{ marginTop: '-50px' }}>
                <div className="flexslider">
                    <ul className="slides">
                        <li style={{ backgroundImage: `url(${require('./images/cover_bg_3.jpg')})` }}>
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
                                            <h3>Welcome to our wedding website! Thank you so much for visiting! This is the place you&#39;ll find every piece of information you will need regarding our wedding celebration.</h3>
                                            <p className="date"><span>26.10.2019</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li style={{ backgroundImage: `url(${require('./images/cover_bg_2.jpg')})` }}>
                            <div className="overlay"></div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 col-md-offset-2 text-center slider-text">
                                        <div className="slider-text-inner">
                                            <h2>
                                                <div className="holder">
                                                    <span>Welcome to</span>
                                                </div>
                                                <div>Our Wedding</div>
                                            </h2>
                                            <h3>Welcome to our wedding website! Thank you so much for visiting! This is the place you&#39;ll find every piece of information you will need regarding our wedding celebration.</h3>
                                            <p className="date"><span>26.10.2019</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li style={{ backgroundImage: `url(${require('./images/cover_bg_1.jpg')})` }}>
                            <div className="overlay"></div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 col-md-offset-2 text-center slider-text">
                                        <div className="slider-text-inner">
                                            <h2>I Have The Most Romantic Man</h2>
                                            <h3>Welcome to our wedding website! Thank you so much for visiting! This is the place you&#39;ll find every piece of information you will need regarding our wedding celebration.</h3>
                                            <p className="date"><span>26.10.2019</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>

            <div id="qbootstrap-couple" className="qbootstrap-section-gray">
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
                                <a href="https://web.facebook.com/PetWesley"><h3>Lim Tien Ping</h3></a>
                                <span>Groom</span>
                            </div>
                            <div className="col-md-2 col-sm-2 col-xs-2 nopadding">
                                <h2 className="amp-center">
                                    <img src={require('./images/flaticon/svg/003-luxury.svg')} className="svg img-responsive" alt="preview" />
                                </h2>
                            </div>
                            <div className="col-md-5 col-sm-5 col-xs-5 nopadding">
                                <img src={require('./images/woman.jpg')} className="img-responsive" alt="preview" />
                                <a href="https://www.facebook.com/2LiNg.U"><h3>Ngu Zhi Ling</h3></a>
                                <span>Bride</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                id="qbootstrap-countdown"
                data-stellar-background-ratio="0.5"
                style={{ backgroundImage: `url(${require('./images/cover_bg_2.jpg')})` }}
                data-section="wedding-day"
            >
                <div className="overlay"></div>
                <div className="display-over">
                    <div className="container">
                        <div className="row animate-box">
                            <div className="col-md-12 section-heading text-center svg-sm colored">
                                <img src={require('./images/flaticon/svg/006-flower-bell-outline-design-variant-with-vines-and-leaves.svg')} className="svg" alt="preview" />
                                <h2 className="">The Wedding Day</h2>
                                <span className="datewed">Saturday, Oct. 26, 2019</span>
                            </div>
                        </div>
                        <div className="row animate-box">
                            <div className="col-md-8 col-md-offset-2 text-center">
                                <p className="countdown">
                                    <span id="days"></span>
                                    <span id="hours"></span>
                                    <span id="minutes"></span>
                                    <span id="seconds"></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="qbootstrap-groom-bride" data-section="groom-bride">
                <div className="container">
                    <div className="row animate-box">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="col-md-12 text-center section-heading svg-sm-2 colored">
                                <img src={require('./images/couple.jpg')} className="svg" alt="preview" />
                                <h2>Groom &amp; Bride</h2>
                                <p>Come and celebrate with us.</p>
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
                                <div className="ceremony-bg" style={{ backgroundImage: `url(${require('./images/wedding_ceremony.jpg')})` }}></div>
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
                                                <span>09:30 AM</span>
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

            <div id="qbootstrap-started" className="qbootstrap-bg" data-section="rsvp" data-stellar-background-ratio="0.5" style={{ backgroundImage: `url(${require('./images/cover_bg_1.jpg')})` }}>
                <div className="overlay"></div>
                <div className="container">
                    <div className="row animate-box">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="col-md-12 text-center section-heading svg-sm colored">
                                <img src={require('./images/flaticon/svg/005-two.svg')} className="svg" alt="preview" />
                                <h2>You Are Invited</h2>
                                <div className="row">
                                <div className="col-md-10 col-md-offset-1 subtext">
                                    <h3>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</h3>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="row animate-box">
                        <div className="col-md-10 col-md-offset-1">
                            <form className="form-inline">
                                <div className="col-md-4 col-sm-4">
                                    <div className="form-group">
                                        <label htmlFor="name" className="sr-only">Name</label>
                                        <input type="name" className="form-control" id="name" placeholder="Name" />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <div className="form-group">
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input type="email" className="form-control" id="email" placeholder="Email" />
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-4">
                                    <button type="submit" className="btn btn-default btn-block">I am Attending</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

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
            {
                this.state.loaded ?
                    <script src={require('./js/main')}></script>
                    :
                    null
            }
        </div>
    );
}

LandingPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
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

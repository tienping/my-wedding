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

            <header
                role="banner"
                id="qbootstrap-header"
                style={{
                    position: 'sticky',
                    paddingTop: topNavSetting && topNavSetting.length ? '64px' : '35px',
                    marginTop: topNavSetting && topNavSetting.length ? '-64px' : '-35px',
                }}
            >
                <div
                    className="top-navigation-bar-bg"
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: 'black',
                        opacity: 0.25,
                    }}
                />
                <div className="container">
                    {/* <div className="row"> */}
                    <nav className="navbar navbar-default">
                    <div className="navbar-header">
                        {/* Mobile Toggle Menu Button */}
                        <a href="" className="js-qbootstrap-nav-toggle qbootstrap-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i></i></a>
                        <a className="navbar-brand" href="index.html">Wedding</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="active"><a href="" data-nav-section="home"><span>Home</span></a></li>
                        <li><a href="" data-nav-section="groom-bride"><span>Groom &amp; Bride</span></a></li>
                        <li><a href="" data-nav-section="story"><span>Love Story</span></a></li>
                        <li><a href="" data-nav-section="greetings"><span>Greetings</span></a></li>
                        <li><a href="" data-nav-section="people"><span>People</span></a></li>
                        <li><a href="" data-nav-section="when-where"><span>When &amp; Where</span></a></li>
                        <li><a href="" data-nav-section="rsvp"><span>RSVP</span></a></li>
                        <li><a href="" data-nav-section="gallery"><span>Gallery</span></a></li>
                        <li><a href="" data-nav-section="blog"><span>Blog</span></a></li>
                    </ul>
                    </div>
                    </nav>
                {/* </div> */}
            </div>
            </header>

            <aside id="qbootstrap-slider-hero" data-section="home" style={{ marginTop: '-45px' }}>
                <div className="flexslider">
                    <ul className="slides">
                        <li style={{ backgroundImage: `url(${require('./images/cover_bg_3.jpg')})` }}>
                            <div className="overlay"></div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-8 col-md-offset-2 text-center slider-text">
                                        <div className="slider-text-inner">
                                            <h1 className="holder"><span>The Wedding of</span></h1>
                                            <h1>Tien Ping &amp; Zhi Ling</h1>
                                                <h2>Welcome to our wedding website! Thank you so much for visiting! This is the place you&#39;ll find every piece of information you will need regarding our wedding celebration.</h2>
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
                                            <h1 className="holder"><span>Welcome to</span></h1>
                                            <h1>Our Wedding</h1>
                                                <h2>Welcome to our wedding website! Thank you so much for visiting! This is the place you&#39;ll find every piece of information you will need regarding our wedding celebration.</h2>
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
                                            <h1>I Have The Most Romantic Man</h1>
                                                <h2>Welcome to our wedding website! Thank you so much for visiting! This is the place you&#39;ll find every piece of information you will need regarding our wedding celebration.</h2>
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
                                <img src={require('./images/2.jpg')} className="img-responsive" alt="preview" />
                                <a href="https://web.facebook.com/PetWesley">https://web.facebook.com/PetWesley</a>
                                <h3>Lim Tien Ping</h3>
                                <span>Groom</span>
                            </div>
                            <div className="col-md-2 col-sm-2 col-xs-2 nopadding">
                                <h2 className="amp-center">
                                    <img src={require('./images/flaticon/svg/003-luxury.svg')} className="svg img-responsive" alt="preview" />
                                </h2>
                            </div>
                            <div className="col-md-5 col-sm-5 col-xs-5 nopadding">
                                <img src={require('./images/3.jpg')} className="img-responsive" alt="preview" />
                                <h3>Ngu Zhi Ling</h3>
                                <span>Bride</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="qbootstrap-countdown" data-stellar-background-ratio="0.5" style={{ backgroundImage: `url(${require('./images/cover_bg_2.jpg')})` }} data-section="wedding-day">
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
                                <img src={require('./images/1.jpg')} className="svg" alt="preview" />
                                <h2>Groom &amp; Bride</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam accusamus, sequi, minima repellendus explicabo magni aperiam, ducimus perferendis ad quidem suscipit omnis unde veritatis pariatur. Commodi, nisi. Iusto, accusantium a.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="couple groom text-center animate-box">
                                <img src={require('./images/groom.jpg')} className="img-responsive" alt="preview" />
                                <div className="desc">
                                    <h2>Louie Jie L. Mahusay</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda vero totam eum, necessitatibus reprehenderit nisi, ratione neque aspernatur sapiente minus? Omnis neque labore distinctio aspernatur esse impedit laboriosam, veritatis dolorem!</p>
                                    <ul className="social social-circle">
                                        <li><a href=""><i className="icon-twitter"></i></a></li>
                                        <li><a href=""><i className="icon-facebook"></i></a></li>
                                        <li><a href=""><i className="icon-instagram"></i></a></li>
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
                                        <li><a href=""><i className="icon-twitter"></i></a></li>
                                        <li><a href=""><i className="icon-facebook"></i></a></li>
                                        <li><a href=""><i className="icon-instagram"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="qbootstrap-story" data-section="story">
                <div className="container">
                    <div className="row animate-box">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="col-md-12 text-center section-heading svg-sm-2">
                                <img src={require('./images/flaticon/svg/003-luxury.svg')} className="svg" alt="preview" />
                                <h2>Our Love Story</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="timeline animate-box">
                                <li className="animate-box">
                                    <div className="timeline-badge" style={{ backgroundImage: `url(${require('./images/couple-1.jpg')})` }}></div>
                                    <div className="timeline-panel">
                                        <div className="overlay"></div>
                                        <div className="timeline-heading">
                                            <h3 className="timeline-title">First We Meet</h3>
                                            <span className="date">June 10, 2017</span>
                                        </div>
                                        <div className="timeline-body">
                                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in .</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="timeline-inverted animate-box">
                                    <div className="timeline-badge" style={{ backgroundImage: `url(${require('./images/couple-2.jpg')})` }}></div>
                                    <div className="timeline-panel">
                                        <div className="overlay overlay-2"></div>
                                        <div className="timeline-heading">
                                            <h3 className="timeline-title">First Date</h3>
                                            <span className="date">June 10, 2017</span>
                                        </div>
                                        <div className="timeline-body">
                                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in .</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="animate-box">
                                    <div className="timeline-badge" style={{ backgroundImage: `url(${require('./images/couple-3.jpg')})` }}></div>
                                    <div className="timeline-panel">
                                        <div className="overlay"></div>
                                        <div className="timeline-heading">
                                            <h3 className="timeline-title">In A Relationship</h3>
                                            <span className="date">June 14, 2017</span>
                                        </div>
                                        <div className="timeline-body">
                                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in .</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="timeline-inverted animate-box">
                                    <div className="timeline-badge" style={{ backgroundImage: `url(${require('./images/couple-4.jpg')})` }}></div>
                                    <div className="timeline-panel">
                                        <div className="overlay overlay-2"></div>
                                        <div className="timeline-heading">
                                            <h3 className="timeline-title">We&#39;re Engaged</h3>
                                            <span className="date">Sept. 01, 2017</span>
                                        </div>
                                        <div className="timeline-body">
                                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in.</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div id="qbootstrap-testimonials" className="qbootstrap-greetings" data-section="greetings" data-stellar-background-ratio="0.5" style={{ backgroundImage: `url(${require('./images/cover_bg_1.jpg')})` }}>
            <div className="overlay"></div>
                <div className="container">
                    <div className="row animate-box">
                        <div className="col-md-12 section-heading text-center svg-sm colored">
                            <img src={require('./images/flaticon/svg/006-flower-bell-outline-design-variant-with-vines-and-leaves.svg')} className="svg" alt="preview" />
                            <h2 className="">Sweet Messages</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 animate-box">
                            <div className="box-testimony ">
                                <blockquote>
                                    <span className="quote"><span><i className="icon-quote-left"></i></span></span>
                                    <p>&ldquo;Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.&rdquo;</p>
                                </blockquote>
                                <p className="author">John Doe</p>
                            </div>

                        </div>
                        <div className="col-md-4 animate-box">
                            <div className="box-testimony ">
                                <blockquote>
                                    <span className="quote"><span><i className="icon-quote-left"></i></span></span>
                                    <p>&ldquo;Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.&rdquo;</p>
                                </blockquote>
                                <p className="author">John Doe</p>
                            </div>


                        </div>
                        <div className="col-md-4 animate-box">
                            <div className="box-testimony ">
                                <blockquote>
                                    <span className="quote"><span><i className="icon-quote-left"></i></span></span>
                                    <p>&ldquo;Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.&rdquo;</p>
                                </blockquote>
                                <p className="author">John Doe</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div id="qbootstrap-people" data-section="people">
                <div className="container">
                    <div className="row animate-box">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="col-md-12 text-center section-heading svg-sm colored">
                                <img src={require('./images/flaticon/svg/005-two.svg')} className="svg" alt="preview" />
                                <h2>The Groomsmen</h2>
                                <div className="row">
                                <div className="col-md-10 col-md-offset-1 subtext  ">
                                    <h3>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</h3>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="row row-bottom-padded-lg">
                        <div className="col-md-3 text-center animate-box">
                            <div className="groom-men">
                                <img src={require('./images/groom-men-1.jpg')} className="img-responsive" alt="preview" />
                                <h3>Ian Bill</h3>
                            </div>
                        </div>
                        <div className="col-md-3 text-center animate-box">
                            <div className="groom-men">
                                <img src={require('./images/groom-men-2.jpg')} className="img-responsive" alt="preview" />
                                <h3>George Smith</h3>
                            </div>
                        </div>
                        <div className="col-md-3 text-center animate-box">
                            <div className="groom-men">
                                <img src={require('./images/groom-men-3.jpg')} className="img-responsive" alt="preview" />
                                <h3>Brian Thompson</h3>
                            </div>
                        </div>
                        <div className="col-md-3 text-center animate-box">
                            <div className="groom-men">
                                <img src={require('./images/groom-men-4.jpg')} className="img-responsive" alt="preview" />
                                <h3>David Howard</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row animate-box">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="col-md-12 text-center section-heading svg-sm colored">
                                <img src={require('./images/flaticon/svg/005-two.svg')} className="svg" alt="preview" />
                                <h2>The Bridesmaid</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 text-center animate-box">
                            <div className="groom-men">
                                <img src={require('./images/bridesmaid-1.jpg')} className="img-responsive" alt="preview" />
                                <h3>Angel Thomas</h3>
                            </div>
                        </div>
                        <div className="col-md-3 text-center animate-box">
                            <div className="groom-men">
                                <img src={require('./images/bridesmaid-2.jpg')} className="img-responsive" alt="preview" />
                                <h3>Kathy Shol</h3>
                            </div>
                        </div>
                        <div className="col-md-3 text-center animate-box">
                            <div className="groom-men">
                                <img src={require('./images/bridesmaid-3.jpg')} className="img-responsive" alt="preview" />
                                <h3>Rose Mel</h3>
                            </div>
                        </div>
                        <div className="col-md-3 text-center animate-box">
                            <div className="groom-men">
                                <img src={require('./images/bridesmaid-4.jpg')} className="img-responsive" alt="preview" />
                                <h3>Ann Hathway</h3>
                            </div>
                        </div>
                    </div>
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
                                    <h3>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</h3>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="row row-bottom-padded-md">
                        <div className="col-md-6 text-center animate-box">
                            <div className="wedding-events">
                                <div className="ceremony-bg" style={{ backgroundImage: `url(${require('./images/wed-ceremony.jpg')})` }}></div>
                                <div className="desc">
                                    <h3>Wedding Ceremony</h3>
                                    <div className="row">
                                        <div className="col-md-2 col-md-push-5">
                                            <div className="icon-tip">
                                                <span className="icon"><i className="icon-heart-o"></i></span>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-md-pull-1">
                                            <div className="date">
                                                <i className="icon-calendar"></i>
                                                <span>Saturday</span>
                                                <span>02 Dec. 2017</span>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-md-pull-1">
                                            <div className="date">
                                                <i className="icon-clock2"></i>
                                                <span>10:00 AM</span>
                                                <span>11:00 AM</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                                    <p><a href="" className="btn btn-primary btn-sm">Learn more</a></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 text-center animate-box">
                            <div className="wedding-events">
                                <div className="ceremony-bg" style={{ backgroundImage: `url(${require('./images/wed-party.jpg')})` }}></div>
                                <div className="desc">
                                    <h3>Wedding Party</h3>
                                    <div className="row">
                                        <div className="col-md-2 col-md-push-5">
                                            <div className="icon-tip">
                                                <span className="icon"><i className="icon-heart-o"></i></span>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-md-pull-1">
                                            <div className="date">
                                                <i className="icon-calendar"></i>
                                                <span>Saturday</span>
                                                <span>02 Dec. 2017</span>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-md-pull-1">
                                            <div className="date">
                                                <i className="icon-clock2"></i>
                                                <span>10:00 AM</span>
                                                <span>11:00 AM</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                                    <p><a href="" className="btn btn-primary btn-sm">Learn more</a></p>
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

            <div id="qbootstrap-gallery" data-section="gallery">
                <div className="container">
                    <div className="row animate-box">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="col-md-12 text-center section-heading svg-sm colored">
                                <img src={require('./images/flaticon/svg/005-two.svg')} className="svg" alt="preview" />
                                <h2>Our Selfie Photos</h2>
                                <div className="row">
                                <div className="col-md-10 col-md-offset-1 subtext">
                                    <h3>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</h3>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery animate-box">
                                <a className="gallery-img image-popup image-popup" href="images/gallery-1.jpg"><img src={require('./images/gallery-1.jpg')} className="img-responsive" alt="preview" /></a>
                            </div>
                            <div className="gallery animate-box">
                                <a className="gallery-img image-popup" href="images/gallery-10.jpg"><img src={require('./images/gallery-10.jpg')} className="img-responsive" alt="preview" /></a>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery animate-box">
                                <a className="gallery-img image-popup" href="images/gallery-6.jpg"><img src={require('./images/gallery-6.jpg')} className="img-responsive" alt="preview" /></a>
                            </div>
                            <div className="gallery animate-box">
                                <a className="gallery-img image-popup" href="images/gallery-2.jpg"><img src={require('./images/gallery-2.jpg')} className="img-responsive" alt="preview" /></a>
                            </div>
                            <div className="gallery animate-box">
                                <a className="gallery-img image-popup" href="images/gallery-5.jpg"><img src={require('./images/gallery-5.jpg')} className="img-responsive" alt="preview" /></a>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery animate-box">
                                <a className="gallery-img image-popup" href="images/gallery-7.jpg"><img src={require('./images/gallery-7.jpg')} className="img-responsive" alt="preview" /></a>
                            </div>
                            <div className="gallery animate-box">
                                <a className="gallery-img image-popup" href="images/gallery-3.jpg"><img src={require('./images/gallery-3.jpg')} className="img-responsive" alt="preview" /></a>
                            </div>
                            <div className="gallery animate-box">
                                <a className="gallery-img image-popup" href="images/gallery-4.jpg"><img src={require('./images/gallery-4.jpg')} className="img-responsive" alt="preview" /></a>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <div className="gallery animate-box">
                                <a className="gallery-img image-popup" href="images/gallery-8.jpg"><img src={require('./images/gallery-8.jpg')} className="img-responsive" alt="preview" /></a>
                            </div>
                            <div className="gallery animate-box">
                                <a className="gallery-img image-popup" href="images/gallery-9.jpg"><img src={require('./images/gallery-9.jpg')} className="img-responsive" alt="preview" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="qbootstrap-press" data-section="blog">
                <div className="container">
                    <div className="row animate-box">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="col-md-12 text-center section-heading svg-sm colored">
                                <img src={require('./images/flaticon/svg/005-two.svg')} className="svg" alt="preview" />
                                <h2>Our Blog</h2>
                                <div className="row">
                                <div className="col-md-10 col-md-offset-1 subtext">
                                    <h3>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</h3>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="qbootstrap-press-item animate-box">
                                <div className="qbootstrap-press-img" style={{ backgroundImage: `url(${require('./images/blog-1.jpg')})` }}>
                                </div>
                                <div className="qbootstrap-press-text">
                                    <h3 className="h2 qbootstrap-press-title">The Wedding Party <span className="qbootstrap-border"></span></h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis eius quos similique suscipit dolorem cumque vitae qui molestias illo accusantium...</p>
                                    <p><a href="" className="btn btn-primary btn-sm">Learn more</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="qbootstrap-press-item animate-box">
                                <div className="qbootstrap-press-img" style={{ backgroundImage: `url(${require('./images/blog-2.jpg')})` }}>
                                </div>
                                <div className="qbootstrap-press-text">
                                    <h3 className="h2 qbootstrap-press-title">Wedding Party <span className="qbootstrap-border"></span></h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis eius quos similique suscipit dolorem cumque vitae qui molestias illo accusantium...</p>
                                    <p><a href="" className="btn btn-primary btn-sm">Learn more</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="qbootstrap-press-item animate-box">
                                <div className="qbootstrap-press-img" style={{ backgroundImage: `url(${require('./images/blog-3.jpg')})` }}>
                                </div>
                                <div className="qbootstrap-press-text">
                                    <h3 className="h2 qbootstrap-press-title">Venue Wedding <span className="qbootstrap-border"></span></h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis eius quos similique suscipit dolorem cumque vitae qui molestias illo accusantium...</p>
                                    <p><a href="" className="btn btn-primary btn-sm">Learn more</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="qbootstrap-press-item animate-box">
                                <div className="qbootstrap-press-img" style={{ backgroundImage: `url(${require('./images/blog-4.jpg')})` }}>
                                </div>
                                <div className="qbootstrap-press-text">
                                    <h3 className="h2 qbootstrap-press-title">About The Couple <span className="qbootstrap-border"></span></h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis eius quos similique suscipit dolorem cumque vitae qui molestias illo accusantium...</p>
                                    <p><a href="" className="btn btn-primary btn-sm">Learn more</a></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <footer id="footer" role="contentinfo">
                <div className="container">
                    <div className="row row-bottom-padded-sm">
                        <div className="col-md-12">
                            <p className="copyright text-center">&copy; 2017 <a href="index.html">Wedding</a>. All Rights Reserved. Images by <a href="http://unsplash.com/" target="_blank">Unsplash</a></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <ul className="social social-circle">
                                <li><a href=""><i className="icon-twitter"></i></a></li>
                                <li><a href=""><i className="icon-facebook"></i></a></li>
                                <li><a href=""><i className="icon-youtube"></i></a></li>
                                <li><a href=""><i className="icon-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
            <script src={require('./js/main')}></script>
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

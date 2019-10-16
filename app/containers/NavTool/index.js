/**
 *
 * NavTool
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';

import globalScope from 'globalScope';
import { dataChecking } from 'globalUtils';

import './style.scss';

const pageNavBtn = [{
    key: 'home',
    name: 'Home',
    path: '/',
}, {
    key: 'wishes',
    name: 'Wishes',
    path: '/wishes',
}, {
    key: 'galleries',
    name: 'Galleries',
    path: '/galleries',
}, {
    key: 'info',
    name: 'Info',
    path: '/info',
}];

export class NavTool extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);

        this.state = {
            currentPath: dataChecking(this.props.match.path),
        };
    }

    render = () => {
        if (globalScope.activated === 'tpzl') {
            return (
                <div className="nav-tool-main">
                    <div className="page-nav-header">
                        {/* Mobile Toggle Menu Button */}
                        {/* <a href="" className="js-qbootstrap-nav-toggle qbootstrap-nav-toggle" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar"><i></i></a> */}
                        <a className="page-nav-title" href="/">TienPing & ZhiLing</a>
                    </div>
                    <div className="page-navigation-buttons">
                        {
                            pageNavBtn.map((value, index) => (
                                <div className="pageNavBtn-cover" key={index}>
                                    <NavLink
                                        className="pageNavBtn"
                                        to={value.path}
                                        isActive={() => this.state.currentPath === value.path}
                                        onClick={() => {
                                            this.setState({ currentPath: value.path });
                                        }}
                                    >
                                        <span>{value.name}</span>
                                    </NavLink>
                                </div>
                            ))
                        }
                    </div>
                </div>
            );
        }

        return null;
    };
}

NavTool.propTypes = {
    // dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
    withConnect,
    withRouter,
)(NavTool);

import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import globalScope from 'globalScope';

import LoginForm from 'containers/LoginForm';

const PrivateRoute = ({ component: Component, render: propsRender, ...remainingProps }) => {
    const renderContent = (props) => {
        if (!globalScope.token) {
            return <LoginForm />;
        }

        if (propsRender) {
            return propsRender(props);
        }

        return <Component {...props}></Component>;
    };

    return (
        <Route
            // path=""
            render={renderContent}
            {...remainingProps}
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.any,
};

export default PrivateRoute;

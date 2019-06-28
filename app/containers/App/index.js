/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import Notify from 'containers/Notify';
import LandingPage from 'containers/LandingPage';
import LogoutForm from 'containers/LogoutForm';
import LoginForm from 'containers/LoginForm';
// import NotFoundPage from 'containers/NotFoundPage';
import GlobalDataProcessor from 'containers/GlobalDataProcessor';

import globalScope from 'globalScope';

import PrivateRoute from './PrivateRoute';

export default function App() {
    const pathArray = [
        {
            key: 'login',
            exact: true,
            path: '/login',
            requireAuth: false,
            component: globalScope.token ? LogoutForm : LoginForm,
        },
        {
            key: 'login',
            exact: true,
            path: '/logout',
            component: LogoutForm,
        },
        // {
        //     key: 'any key',
        //     exact: 'boolean',
        //     path: 'path_to',
        //     component: 'imported_reeact_component',
        //     render: (props) => <TableListingPage {...props} pageType={'type'} />,
        // },
    ];

    // const pageNotFound = NotFoundPage;
    const pageNotFound = LandingPage;
    return (
        <div>
            <Helmet
                titleTemplate="When I meet U"
                defaultTitle="When I meet U"
            >
                <meta name="description" content="When I meet U" />
            </Helmet>
            <section>
                <Notify></Notify>
                <GlobalDataProcessor />

                <div
                    id="content-container"
                >
                    <Switch>
                        {
                            pathArray.map((item, index) => {
                                if (item.requireAuth) {
                                    return (
                                        <PrivateRoute
                                            key={index}
                                            exact={item.exact}
                                            path={item.path}
                                            component={item.component}
                                            render={item.render || null}
                                            token={globalScope.token || ''}
                                        />
                                    );
                                }

                                return (
                                    <Route
                                        key={index}
                                        exact={item.exact}
                                        path={item.path}
                                        component={item.component}
                                        render={item.render || null}
                                    />
                                );
                            })
                        }
                        <Route exact={true} path="/login" component={globalScope.token ? LogoutForm : LoginForm} />
                        <Route exact={true} path="/logout" component={LogoutForm} />
                        {/* {
                            Object.keys(tableSetting).map((key, index) => (
                                <PrivateRoute
                                    key={index}
                                    exact={true}
                                    token={globalScope.token || ''}
                                    path={dataChecking(tableSetting, key, 'link')}
                                    render={(props) => <TableListingPage {...props} pageType={key} />}
                                />
                            ))
                        } */}
                        <Route path="" component={pageNotFound} />
                    </Switch>
                </div>
            </section>
        </div>
    );
}

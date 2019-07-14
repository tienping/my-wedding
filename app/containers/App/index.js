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
import WishesPage from 'containers/WishesPage';
import AllWishesPage from 'containers/AllWishesPage';
import GalleryPage from 'containers/GalleryPage';
import DashboardPage from 'containers/DashboardPage';
import SecretTunnel from 'components/SecretTunnel';

import globalScope from 'globalScope';

import PrivateRoute from './PrivateRoute';

export default function App() {
    const pathArray = [
        {
            key: 'login',
            exact: true,
            path: '/login',
            component: globalScope.token ? LogoutForm : LoginForm,
        },
        {
            key: 'logout',
            exact: true,
            path: '/logout',
            component: LogoutForm,
        },
        {
            key: 'secret_cxy',
            exact: true,
            path: '/secret_tunnel_cxy92',
            component: SecretTunnel,
        },
        // {
        //     key: 'any key',
        //     exact: 'boolean',
        //     path: 'path_to',
        //     requireAuth: true,
        //     component: 'imported_reeact_component',
        //     render: (props) => <TableListingPage {...props} pageType={'type'} />,
        // },
    ];

    if (globalScope.activated) {
        pathArray.push(...[
            {
                key: 'wishes',
                exact: true,
                path: '/wishes',
                component: WishesPage,
            },
            {
                key: 'wishes_all',
                exact: true,
                path: '/wishes/all',
                component: AllWishesPage,
            },
            {
                key: 'gallery',
                exact: true,
                path: '/galler',
                component: GalleryPage,
            },
            {
                key: 'dashboard',
                exact: true,
                path: '/dashboard',
                requireAuth: true,
                component: DashboardPage,
            },
        ]);
    }

    const pageNotFound = LandingPage; // = NotFoundPage;

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

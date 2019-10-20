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
import QrGenerator from 'containers/QrGenerator';
import SecretTunnel from 'components/SecretTunnel';
import GuestPage from 'containers/GuestPage';

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
            key: 'secret_tunnel',
            exact: true,
            path: '/secret_tunnel',
            component: SecretTunnel,
        },
        {
            key: 'qr_generator',
            exact: true,
            path: '/qr_generator',
            component: QrGenerator,
        },
        {
            key: 'gallery',
            exact: true,
            path: '/gallery',
            component: GalleryPage,
        },
    ];

    if (globalScope.activated) {
        pathArray.push(...[
            {
                key: 'add_wish',
                exact: true,
                path: '/add_wish',
                component: WishesPage,
            },
            {
                key: 'wishes',
                exact: true,
                path: '/wishes',
                component: AllWishesPage,
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

                        <Route exact={true} path="/:guest(guest|guests)/:id" component={GuestPage} />
                        <Route exact={true} path="/info" component={GuestPage} />
                        <Route path="/" component={LandingPage} />
                        <Route path="" component={pageNotFound} />
                    </Switch>
                </div>
            </section>
        </div>
    );
}

/**
*
* SecretTunnel
*
*/

import React from 'react';

import globalScope from 'globalScope';
import { setCookie } from 'globalUtils';

import './style.scss';

class SecretTunnel extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    render = () => (
        <div
            className="secret-button"
            onClick={() => {
                if (globalScope.activated) {
                    setCookie('tpzl_activate', '');
                } else {
                    globalScope.activated = 'tpzl';
                    setCookie('tpzl_activate', 'tpzl');
                }
                location.reload();
            }}
        >
            {globalScope.activated ? 'this' : ''}
        </div>
    );
}

SecretTunnel.propTypes = {

};

export default SecretTunnel;

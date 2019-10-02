/**
*
* CountdownTimer
*
*/

import React from 'react';

import globalScope from 'globalScope';
// import { FormattedMessage } from 'react-intl';

// import messages from './messages';
import './style.scss';

class CountdownTimer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount = () => {
        globalScope.initMainScript();

        // modified version of random-normal
        const NUM_PARTICLES = 600;
        const PARTICLE_SIZE = 0.5; // View heights
        const SPEED = 20000; // Milliseconds

        const particles = [];

        function rand(low, high) {
            return (Math.random() * (high - low)) + low;
        }

        function createParticle() {
            const colour = {
                r: 255,
                g: window.randomNormal({ mean: 125, dev: 20 }),
                b: 50,
                a: rand(0, 1),
            };
            return {
                x: -2,
                y: -2,
                diameter: Math.max(0, window.randomNormal({ mean: PARTICLE_SIZE, dev: PARTICLE_SIZE / 2 })),
                duration: window.randomNormal({ mean: SPEED, dev: SPEED * 0.1 }),
                amplitude: window.randomNormal({ mean: 16, dev: 2 }),
                offsetY: window.randomNormal({ mean: 0, dev: 10 }),
                arc: Math.PI * 2,
                startTime: performance.now() - rand(0, SPEED),
                colour: `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`,
            };
        }

        function moveParticle(particle, canvas, time) {
            const progress = ((time - particle.startTime) % particle.duration) / particle.duration;
            return {
                ...particle,
                x: progress,
                y: ((Math.sin(progress * particle.arc) * particle.amplitude) + particle.offsetY),
            };
        }

        function drawParticle(particle, canvas, ctx) {
            const canvas2 = document.getElementById('particle-canvas') || canvas;
            const vh = canvas2.height / 100;

            ctx.fillStyle = particle.colour;
            ctx.beginPath();
            ctx.ellipse(
                particle.x * canvas2.width,
                (particle.y * vh) + (canvas2.height / 2),
                particle.diameter * vh,
                particle.diameter * vh,
                0,
                0,
                2 * Math.PI
            );
            ctx.fill();
        }

        function draw(time, canvas, ctx) {
            // Move particles
            particles.forEach((particle, index) => {
                particles[index] = moveParticle(particle, canvas, time);
            });

            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw the particles
            particles.forEach((particle) => {
                drawParticle(particle, canvas, ctx);
            });

            // Schedule next frame
            requestAnimationFrame((time2) => draw(time2, canvas, ctx));
        }

        function initializeCanvas() {
            const canvas = document.getElementById('particle-canvas');
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            let ctx = canvas.getContext('2d');

            window.addEventListener('resize', () => {
                canvas.width = canvas.offsetWidth * window.devicePixelRatio;
                canvas.height = canvas.offsetHeight * window.devicePixelRatio;
                ctx = canvas.getContext('2d');
            });

            return [canvas, ctx];
        }

        function startAnimation() {
            const [canvas, ctx] = initializeCanvas();

            // Create a bunch of particles
            for (let i = 0; i < NUM_PARTICLES; i++) {
                particles.push(createParticle(canvas));
            }

            requestAnimationFrame((time) => draw(time, canvas, ctx));
        }

        // Start animation when document is loaded
        (function startAnimationAfterKiad() {
            if (document.readystate !== 'loading') {
                startAnimation();
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    startAnimation();
                });
            }
        }());
    }

    render = () => (
        <div
            data-stellar-background-ratio="0.5"
            // style={{ backgroundImage: `url(${require('./images/cover_bg_2.jpg')})` }}
        >
            <canvas className="overlay" id="particle-canvas"></canvas>
            <div className="display-over">
                <div className="container">
                    <div className="row animate-box">
                        <div className="col-md-12 section-heading text-center svg-sm colored pb-2">
                            <h3 className="p-0 mt-0">Wedding Day</h3>
                            <span className="datewed">Saturday, Oct. 26, 2019</span>
                        </div>
                    </div>
                    <div className="row animate-box">
                        <div className="text-center">
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
            <script src={require('../../utils/main')}></script>
        </div>
    );
}

CountdownTimer.propTypes = {

};

export default CountdownTimer;

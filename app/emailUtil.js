import * as emailjs from 'emailjs-com';

const userId = 'user_XFYIirZDTcdFYTC1xPQ9r';
// const accessToken = '5163edb18c14cef74c13c74f57891d75';
const serviceId = 'gmail_petweley';
const templateId = 'template_Fr6khfKp';

export const fireEmail = ({ templateParams, successCallback, failureCallback }) => {
    if (process.env.DONT_FIRE_EMAIL) {
        alert('MOCK: Email fire success');
        if (successCallback) {
            successCallback();
        }
        return;
    }

    emailjs.send(serviceId, templateId, templateParams, userId)
        .then((response) => {
            if (successCallback) {
                successCallback();
            }
            console.log('FIRE EMAIL SUCCESS!', response.status, response.text);
        }, (err) => {
            if (failureCallback) {
                failureCallback();
            }
            console.log('FIRE EMAIL FAILED...', err);
        });
};

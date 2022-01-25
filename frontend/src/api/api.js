const baseUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000' : 'https://domain.com'

export const api = {
    auth: {
        login: `${baseUrl}/dj-rest-auth/login/`,
        logout: `${baseUrl}/dj-rest-auth/logout/`,
        register: `${baseUrl}/dj-rest-auth/registration/`,
        emailVerification: `${baseUrl}/dj-rest-auth/registration/verify-email/`,
        resendemailVerification: `${baseUrl}/dj-rest-auth/registration/resend-email/`,
        // resetPassword: `${baseUrl}/api/password/reset/`,
        resetPassword: `${baseUrl}/dj-rest-auth/password/reset/`,
        resetPasswordConfirm: `${baseUrl}/dj-rest-auth/password/reset/confirm/`,
    },
    payment: {
        createPayment: `${baseUrl}/create-payment-intent/`
    },

    jobs: {
        retrieve: id => `${baseUrl}/jobs-api/detail/${id}`
    }
}
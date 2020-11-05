import {Login, ForgotPassword, ResetPassword, ChangePassword} from './components'

const routes = [
    // {
    //     path: '/',
    //     exact: true,
    //     component: Login,
    //     layout: 'public',
    //     className: 'removeMinWidth',
    //     title: 'Login',
    //     layoutProps: {
    //         hideLoginLink: true,
    //         hideRegisterLink: false,
    //         containerClass: 'layout--flexCenter11'
    //     }
    // },

    {
        path: '/login',
        exact: true,
        component: Login,
        layout: 'LayoutDefault',
        className: 'removeMinWidth',
        title: 'Login',
        layoutProps: {
            hideLoginLink: true,
            hideRegisterLink: false,
            containerClass: 'layout--flexCenter11'
        }
    },
    {
        path: '/forgot_password',
        exact: true,
        component: ForgotPassword,
        layout: 'LayoutPublic',
        className: 'removeMinWidth',
        title: 'Forgot Password',
        name: 'forgotPassword',
        layoutProps: {
            hideLoginLink: false,
            containerClass: 'layout--flexCenter11'
        }
    },
    {
        path: '/reset_password',
        exact: true,
        component: ResetPassword,
        layout: 'LayoutPublic',
        title: 'Reset Password',
        layoutProps: {
            hideLoginLink: false,
            containerClass: 'layout--flexCenter11'
        }
    },

    {
        path: '/change_password',
        exact: true,
        component: ChangePassword,
        className: 'removeMinWidth',
        layout: 'LayoutPrivate',
        title: 'Chnage Password'
    },

    // {
    //     path: '/me',
    //     exact: true,
    //     component: ProfileEdit,
    //     layout: 'admin',
    //     title: 'Profile'
    // }

]


export default routes
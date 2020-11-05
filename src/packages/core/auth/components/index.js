import React from "react";
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading,
});

const ForgotPassword = Loadable({
    loader: () => import('./ForgotPassword'),
    loading: Loading,
});
const ResetPassword = Loadable({
    loader: () => import('./ResetPassword'),
    loading: Loading,
});

const ChangePassword = Loadable({
    loader: () => import('./ChangePassword'),
    loading: Loading,
});


export {
    Login,
    ForgotPassword,
    ResetPassword,
    ChangePassword
}
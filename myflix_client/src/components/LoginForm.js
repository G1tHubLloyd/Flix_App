import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './LoginForm.css';

const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .required('Username is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
});

const LoginForm = ({ onSubmit, onSwitchToSignup }) => {
    return (
        <div className="login-form-container">
            <h2>Login to MyFlix</h2>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    onSubmit(values);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="login-form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username"
                            />
                            <ErrorMessage name="username" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                            />
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>

                        <button type="submit" disabled={isSubmitting} className="submit-btn">
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </Form>
                )}
            </Formik>
            <p className="switch-form">
                Don't have an account?{' '}
                <button onClick={onSwitchToSignup} className="link-btn">
                    Sign up
                </button>
            </p>
        </div>
    );
};

export default LoginForm;

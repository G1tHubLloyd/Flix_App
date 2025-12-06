import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './SignupForm.css';

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required')
});

const SignupForm = ({ onSubmit, onSwitchToLogin }) => {
    return (
        <div className="signup-form-container">
            <h2>Sign Up for MyFlix</h2>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const { confirmPassword, ...userData } = values;
                    onSubmit(userData);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="signup-form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Choose a username"
                            />
                            <ErrorMessage name="username" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                            />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Create a password"
                            />
                            <ErrorMessage name="password" component="div" className="error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm your password"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="error" />
                        </div>

                        <button type="submit" disabled={isSubmitting} className="submit-btn">
                            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </Form>
                )}
            </Formik>
            <p className="switch-form">
                Already have an account?{' '}
                <button onClick={onSwitchToLogin} className="link-btn">
                    Login
                </button>
            </p>
        </div>
    );
};

export default SignupForm;

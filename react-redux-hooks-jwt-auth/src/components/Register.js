import React, {useState, useRef} from "react";
import {useDispatch, useSelector } from "react-redux";

import Form from "react-validation";
import Input from "react-validation";
import CheckButton from "react-validation";
import { isEmail } from "validator";

import { register } from "../actions/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not valid email.!
            </div>
        );
    }
};

const vUsername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username should be between 3 and 20 characters.
            </div>
        );
    }
};

const vPassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password should be between 6 and 20 characters.
            </div>
        );
    }
};

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(register(username, email, password))
                .then(() => {
                    setSuccessful(true);
                })
                .catch(() =>{
                    setSuccessful(false);
                });
        }
    };

    return (
        <div className= "col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={username}
                                        onChange={onChangeUsername}
                                        validations={[required, vUsername]}
                                    />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                    <Input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, vEmail]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, vPassword]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    )}


                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{display: "none"}} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};

export default Register;




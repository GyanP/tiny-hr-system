import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { loginApi } from "../../apis";
import { useDispatch } from "react-redux"
import { setLoginStateAction } from "../../redux/action/loginAction";
import { useNavigate } from "react-router-dom";

interface IError {
    userName: string;
    password: string;
}

const Login = () => {
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<IError>({
        userName: "",
        password: ""
    });

    const dispatch: any = useDispatch();
    const navigate = useNavigate();

    const handleChange = (target: any) => {
        const { name, value } = target;
        let _errors = JSON.parse(JSON.stringify(errors));
        _errors[name] = "";
        setErrors(_errors);
        switch (name) {
            case "userName":
                setUserName(value);
                return;
            case "password":
                setPassword(value);
                return;
            default:
                break;
        }
    }

    const validate = () => {
        let hasError = false;
        let _errors: IError = {
            userName: "",
            password: "",
        };
        if (userName.trim() === "") {
            hasError = true;
            _errors = { ..._errors, userName: "Field cannot be empty" };
        }
        if (password.trim() === "") {
            hasError = true;
            _errors = { ..._errors, password: "Field cannot be empty" };
        }

        setErrors(_errors);
        return hasError;
    };

    const handleSubmit = async () => {
        if (!validate()) {
            loginApi({ username: userName, password: password }, () => {
                localStorage.setItem("isLoggedIn", "true");
                dispatch(setLoginStateAction(true));
                navigate("/list");
            })
        }
    }

    return (
        <>
            <Form.Group
                as={Col}
                md="4"
                className="mx-auto text-start mb-3"
                controlId="validationFormik06"
            >
                <Form.Label className="pb-1">User Name *</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="User Name"
                    name="userName"
                    onChange={(e: any) => handleChange(e.target)}
                    value={userName}
                    isInvalid={errors.userName !== ""}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.userName}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
                as={Col}
                sm="4"
                className="mx-auto text-start mb-3"
                controlId="validationFormik01"
            >
                <Form.Label className="pb-1">Password *</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    onChange={(e: any) => handleChange(e.target)}
                    isInvalid={errors.password !== ""}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>


            <Button
                type="button"
                onClick={handleSubmit}
                className="btn-signup btn btn-dark my-3"
            >
                Login
            </Button>
        </>
    )
}

export { Login };
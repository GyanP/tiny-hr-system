import React, { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { registerCandidateApi } from "../../apis";
import { toast } from "react-toastify";

interface IError {
    fullName: string;
    email: string;
    dob: string;
    experience: string;
    department: string;
    resume: string;
}

const ApplyForm = () => {
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const [experience, setExperience] = useState<string>("");
    const [department, setDepartment] = useState<string>("-1");
    const [resume, setResume] = useState<any>(undefined);
    const [errors, setErrors] = useState<IError>({
        fullName: "",
        email: "",
        dob: "",
        experience: "",
        department: "",
        resume: ""
    });

    const resetForm = () => {
        setFullName("");
        setEmail("");
        setDob("");
        setDepartment("");
        setExperience("");
        setResume("");
        let fileUpload: any = document.getElementById("fileUpload");
        if (fileUpload) {
            fileUpload.value = ""
        }
    }


    const handleChange = (target: any) => {
        const { name, value } = target;
        let _errors = JSON.parse(JSON.stringify(errors));
        _errors[name] = "";
        setErrors(_errors);
        switch (name) {
            case "fullName":
                setFullName(value);
                return;
            case "email":
                setEmail(value);
                return;
            case "dob":
                setDob(value);
                return;
            case "experience":
                setExperience(value);
                return;
            case "department":
                setDepartment(value);
                return;
            default:
                break;
        }
    }

    const validate = () => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        let hasError = false;
        let _errors: IError = {
            fullName: "",
            email: "",
            department: "",
            dob: "",
            experience: "",
            resume: "",
        };
        if (fullName.trim() === "") {
            hasError = true;
            _errors = { ..._errors, fullName: "Field cannot be empty" };
        } else if (fullName?.length < 2) {
            hasError = true;
            _errors = { ..._errors, fullName: "Please enter a valid name" };
        }
        if (email.trim() === "") {
            hasError = true;
            _errors = { ..._errors, email: "Field cannot be empty" };
        } else if (!emailRegex.test(email)) {
            hasError = true;
            _errors = { ..._errors, email: "Please enter a valid Email" };
        }
        if (department === "-1") {
            hasError = true;
            _errors = { ..._errors, department: "Field cannot be empty" };
        }
        if (dob === "") {
            hasError = true;
            _errors = { ..._errors, dob: "Field cannot be empty" };
        }
        if (experience.trim() === "") {
            hasError = true;
            _errors = { ..._errors, experience: "Field cannot be empty" };
        }

        if (resume === null || resume === undefined) {
            hasError = true;
            _errors = { ..._errors, resume: "Field cannot be empty" };
        }
        setErrors(_errors);
        return hasError;
    };

    const handleSubmit = () => {
        if (!validate()) {
            const formData = new FormData();
            formData.append("full_name", fullName);
            formData.append("date_of_birth", dob);
            formData.append("department_type", department);
            formData.append("experience", experience);
            formData.append("resume", resume);

            registerCandidateApi(formData, () => {
                resetForm();
                toast.success("Registered successfully!")
            }, () => {
                toast.error("Something went wrong. Please try again!")
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
                <Form.Label className="pb-1">Full name *</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="First and last name"
                    name="fullName"
                    onChange={(e: any) => handleChange(e.target)}
                    value={fullName}
                    isInvalid={errors.fullName !== ""}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
                as={Col}
                sm="4"
                className="mx-auto text-start mb-3"
                controlId="validationFormik01"
            >
                <Form.Label className="pb-1">Email *</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="example@example.com"
                    name="email"
                    value={email}
                    onChange={(e: any) => handleChange(e.target)}
                    isInvalid={errors.email !== ""}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
                as={Col}
                sm="4"
                className="mx-auto text-start mb-3"
                controlId="validationFormik02"
            >
                <Form.Label className="pb-1">Date Of Birth *</Form.Label>
                <Form.Control
                    type="date"
                    placeholder="DOB"
                    name="dob"
                    value={dob}
                    onChange={(e: any) => handleChange(e.target)}
                    isInvalid={errors.dob !== ""}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.dob}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
                as={Col}
                md="4"
                className="mx-auto text-start mb-3"
                controlId="validationFormik03"
            >
                <Form.Label className="pb-1">Experience (years) *</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Experience"
                    name="experience"
                    onChange={(e: any) => handleChange(e.target)}
                    value={experience}
                    isInvalid={errors.experience !== ""}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.experience}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
                as={Col}
                md="4"

                className="mx-auto text-start mb-3"
                controlId="validationFormik03"
            >
                <Form.Label className="pb-1">Department *</Form.Label>
                <Form.Select isInvalid={errors.department !== ""} name="department" onChange={(e: any) => handleChange(e.target)} value={department}>
                    <option value={"-1"} disabled>Please select Department</option>
                    <option value="IT" >IT</option>
                    <option value="HR" >HR</option>
                    <option value="FINANCE" >Finance</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {errors.department}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}
                md="4" controlId="formFile" className="mx-auto text-start mb-3">
                <Form.Label>Resume *</Form.Label>
                <Form.Control id="fileUpload" isInvalid={errors.resume !== ""} onChange={(event: any) => {
                    setResume(event.target.files[0]);
                    setErrors({ ...errors, resume: "" })
                }}
                    type="file"
                    accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
                <Form.Control.Feedback type="invalid">
                    {errors.resume}
                </Form.Control.Feedback>
            </Form.Group>

            <Button
                type="button"
                onClick={handleSubmit}
                className="btn-signup btn btn-dark my-3"
            >
                Apply
            </Button>
        </>
    )
}

export { ApplyForm };
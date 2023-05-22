import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { downloadFileApi, getCandidatesApi } from "../../apis";
import { useSelector } from "react-redux";
import { Icandidate } from "../../models";
import { BASE_URL } from "../../axiosInstance";

const ApplicationList = () => {

    const { isLoggedIn } = useSelector((state: any) => state.login);
    const [applicationList, setApplicationList] = useState<Icandidate[]>([]);
    useEffect(() => {
        if (isLoggedIn) {
            getCandidatesApi((data: Icandidate[]) => {
                setApplicationList(data);
            });
        }
    }, [isLoggedIn])

    const onDownload = (id: number) => {
        window.open(`${BASE_URL}/candidates/${id}`)
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Department</th>
                        <th>Experience</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applicationList.map((application: Icandidate, idx: number) => {
                        return <tr key={application.id}>
                            <td>{idx + 1}</td>
                            <td>{application.full_name}</td>
                            <td>{application.department_type}</td>
                            <td>{`${application.experience} ${+application.experience > 1 ? "Years" : "Year"}`}</td>
                            <td> <Button onClick={() => onDownload(application.id)} >Download</Button> </td>
                        </tr>
                    })}

                </tbody>
            </Table>
        </>
    )
}

export { ApplicationList };
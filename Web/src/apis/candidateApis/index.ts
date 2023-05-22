import { axiosInstance } from "../../axiosInstance";
import { toast } from "react-toastify";
import { Icandidate } from "../../models";

interface ILoginModal {
  username: string;
  password: string;
}

const loginApi = async (
  body: ILoginModal,
  successCallback?: (data: { message: string }) => void,
  errorCallback?: (error: any) => void
) => {
  try {
    let response: any = await axiosInstance.post("/login/", body);
    const { data } = response;
    successCallback && successCallback(data);
    return data;
  } catch (error: any) {
    const { response } = error;
    const { data } = response;
    toast.error(data.message);
    errorCallback && errorCallback(data);
    return data;
  }
};

const getCandidatesApi = async (
  successCallback?: (data: Icandidate[]) => void,
  errorCallback?: (error: any) => void
) => {
  try {
    let response: any = await axiosInstance.get("/candidates/");
    const { data } = response;
    successCallback && successCallback(data);
    return data;
  } catch (error: any) {
    const { response } = error;
    const { data } = response;
    toast.error("Something went wrong !");
    errorCallback && errorCallback(data);
    return [];
  }
};

const registerCandidateApi = async (
  body: FormData,
  successCallback?: (data: { message: string }) => void,
  errorCallback?: (error: any) => void
) => {
  try {
    let response: any = await axiosInstance.post("/register/", body);
    const { data } = response;
    successCallback && successCallback(data);
    return data;
  } catch (error: any) {
    const { response } = error;
    const { data } = response;
    errorCallback && errorCallback(data);
    return [];
  }
};

const downloadFileApi = async (
  id: number,
  successCallback?: (data: any) => void,
  errorCallback?: (error: any) => void
) => {
  axiosInstance
    .get(`/candidates/${id}`, { responseType: "blob" })
    .then((response: any) => {
      const FileDownload = require("js-file-download");
      FileDownload(response.data, "");
      successCallback && successCallback(response);
    })
    .catch((error: any) => {
      errorCallback && errorCallback(error);
      toast.error("Something went wrong !");
      return [];
    });
};

export { loginApi, getCandidatesApi, registerCandidateApi, downloadFileApi };

const HOST_ADDRESS = "http://localhost:3001";
const Area = "/area";
const Form = "/form";
const FormsApi = "/api/forms/";
const FormIdApi = "/api/form/:id";
const FormDataApi = "/api/formsdata/";
const FormIdDataApi = "/api/formdata/:formid/:id?";
const FormApiData = "/api/formdata";

const postArea = HOST_ADDRESS + Area;
const postForm = HOST_ADDRESS + Form;
const getFormsApi = HOST_ADDRESS + FormsApi;
const getFormIdApi = HOST_ADDRESS + FormIdApi;

const postFormDataApi = HOST_ADDRESS + FormDataApi;
const getFormsData = HOST_ADDRESS + FormDataApi;
const getFormIdData = HOST_ADDRESS + FormIdDataApi;
const postFormIdData = HOST_ADDRESS + FormIdDataApi;
const postFormData = HOST_ADDRESS + FormApiData;

export {
    postArea, postForm, getFormsApi, getFormIdApi,
    getFormIdData, postFormDataApi, getFormsData, postFormIdData, postFormData
        }






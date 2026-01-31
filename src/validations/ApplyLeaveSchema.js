import * as yup from 'yup';

const applyLeaveSchema = yup.object(
    {
        name:yup.string().required("name is required to apply leave"),
        leaveType: yup.string().required("leave type is required"),
        startDate: yup.date().required("please select the start date"),
        endDate: yup.date().required("please select the end date"),
        leaveReason: yup.string().required("please provide a reason for leave"),
    });
    export default applyLeaveSchema;
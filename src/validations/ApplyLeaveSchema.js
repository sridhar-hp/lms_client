import { yupResolver } from '@hookform/resolvers/yup';
import e from 'cors';
import * as Yup from 'yup';

const applyLeaveSchema = Yup.object(
    {
        name: yupResolver.text().required("name is required to apply leave"),
        leaveType: yupResolver.text().required("leave type is required"),
        startDate: yupResolver.date().required("please select the start date"),
        endDate: yupResolver.date().required("please select the end date"),
        leaveReason: yupResolver.text().required("please provide a reason for leave"),
    });
    export default applyLeaveSchema;
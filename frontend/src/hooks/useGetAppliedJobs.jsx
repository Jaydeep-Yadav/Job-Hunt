import { setAllAppliedJobs } from "../redux/jobSlice.js";
import { APPLICATION_API_END_POINT } from "../utils/constant.js";
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toast } from 'sonner'

const useGetAppliedJobs = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials:true});
                if(res?.data?.success){
                    dispatch(setAllAppliedJobs(res.data.data));
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }
        fetchAppliedJobs();
    },[])
};
export default useGetAppliedJobs;
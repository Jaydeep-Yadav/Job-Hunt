import { setAllAdminJobs } from '../redux/jobSlice'
import { JOB_API_END_POINT } from '../utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true });

                if (res?.data?.success) {
                    dispatch(setAllAdminJobs(res.data.data));
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }
        fetchAllAdminJobs();
    }, [])
}

export default useGetAllAdminJobs;
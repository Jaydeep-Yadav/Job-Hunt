import { setCompanies } from '../redux/companySlice.js'
import { COMPANY_API_END_POINT } from '../utils/constant.js'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (res?.data?.success) {
                    dispatch(setCompanies(res.data.data));
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }
        fetchCompanies();
    }, [])
}

export default useGetAllCompanies;
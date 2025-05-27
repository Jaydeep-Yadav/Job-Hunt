import { setSingleCompany } from '../redux/companySlice.js'
import { COMPANY_API_END_POINT } from '../utils/constant.js'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
                
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.data));
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }
        fetchSingleCompany();
    },[companyId, dispatch])
}

export default useGetCompanyById
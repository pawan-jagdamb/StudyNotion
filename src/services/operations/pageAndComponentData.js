import toast from "react-hot-toast";
import { catalogData } from "../apis";
import { apiConnector } from "../apiConnector";


export const getCatalogPageData= async(categoryId)=>{
    const toastId= toast.loading("Loading...")
    let result= [];

    try {
        const response= await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,
            { categoryId:categoryId })

            console.log("Printing response page and component data",response);
        
        if(!response?.data?.success){
            throw new Error("Could not fetch category page data")

        }

         result= response?.data;
        


    } catch (error) {
        console.log("catalog page data api error...".error);
        toast.error(error.message);
        result= error.response?.data;

        
    }
    toast.dismiss(toastId);
    return result;

}
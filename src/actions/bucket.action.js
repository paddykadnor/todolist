import axios from 'axios';
import packageJson from "../../package.json"
import * as actionTypes from "./bucket.types"


const apiBase = packageJson.apiBase

/**
 * get bucket api call from apilist
 */
export const getBucket = () => (dispatch) => {
    const api = `${apiBase}/bucket`;
    dispatch({ type: actionTypes.API_GET_BUCKET_INITIATED });
    return axios.get(api).then((response) => {
        dispatch({ type: actionTypes.API_GET_BUCKET_SUCCESS, bucket: response.data });
        return response
    }).catch((error) => {
        dispatch({ type: actionTypes.API_GET_BUCKET_FAILED });
        return error
    })
}

export const saveBucket = (bucketName)=>(dispatch,getState)=>{
    const {bucketList} =  getState().bucket
    const api = `${apiBase}/bucket`;
    dispatch({ type: actionTypes.API_POST_BUCKET_INITIATED });
    return axios.post(api,{
        name:bucketName
    }).then((response) => {
      const  bucket = [...bucketList,response.data]
        dispatch({ type: actionTypes.API_POST_BUCKET_SUCCESS, bucket: bucket });
        return response
    }).catch((error) => {
        dispatch({ type: actionTypes.API_POST_BUCKET_FAILED });
        return error
    })
}

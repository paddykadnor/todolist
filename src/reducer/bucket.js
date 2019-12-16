import * as actionTypes from "../actions/bucket.types"


const INITIAL_STATE = {
    bucketList: []
}
export default function bucket(state = INITIAL_STATE, action) {
    switch (action.type) {
        case actionTypes.API_GET_BUCKET_INITIATED:
            return state;
        case actionTypes.API_GET_BUCKET_SUCCESS:
            return {
                ...state,
                bucketList: action.bucket
            };
        case actionTypes.API_GET_BUCKET_FAILED:
            return state;
        case actionTypes.API_POST_BUCKET_INITIATED:
            return state;
        case actionTypes.API_POST_BUCKET_SUCCESS:
            return {
                ...state,
                bucketList: action.bucket
            };
        case actionTypes.API_POST_BUCKET_FAILED:
            return state;
        default: return state;
    }
}
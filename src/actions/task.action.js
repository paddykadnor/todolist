import axios from 'axios';
import packageJson from "../../package.json"
import * as actionTypes from "./task.types"
import register from '../registerServiceWorker.js';


const apiBase = packageJson.apiBase

/**
 * get TASK api call from apilist
 */
export const getTask = () => (dispatch) => {
    const api = `${apiBase}/task`;
    dispatch({ type: actionTypes.API_GET_TASK_INITIATED });
    return axios.get(api).then((response) => {
        dispatch({ type: actionTypes.API_GET_TASK_SUCCESS, task: response.data });
        return response
    }).catch((error) => {
        dispatch({ type: actionTypes.API_GET_TASK_FAILED });
        return error
    })
}


export const saveTask = (taskName, bId, taskCheck = false) => (dispatch, getState) => {
    const { taskList } = getState().task
    const api = `${apiBase}/task`;
    dispatch({ type: actionTypes.API_POST_TASK_INITIATED });
    return axios.post(api, {
        name: taskName,
        bId: bId,
        taskCheck: taskCheck
    }).then((response) => {
        const task = [...taskList, response.data]
        dispatch({ type: actionTypes.API_POST_TASK_SUCCESS, task: task });
        return response
    }).catch((error) => {
        dispatch({ type: actionTypes.API_POST_TASK_FAILED });
        return error
    })
}

export const removeTask = (taskId) => (dispatch, getState) => {
    const { taskList } = getState().task
    const api = `${apiBase}/task/${taskId}`;
    dispatch({ type: actionTypes.API_POST_TASK_INITIATED });
    return axios.delete(api, {
        taskId: taskId
    }).then((response) => {
        const task = taskList.filter(task => {
            return task._id !== taskId
        })
        dispatch({ type: actionTypes.API_POST_TASK_SUCCESS, task: task });
        return response
    }).catch((error) => {
        dispatch({ type: actionTypes.API_POST_TASK_FAILED });
        return error
    })
}

export const completeTask = (taskId, taskCheck,taskName) => (dispatch, getState) => {
    const { taskList } = getState().task
    const api = `${apiBase}/task/${taskId}`;
    dispatch({ type: actionTypes.API_POST_TASK_INITIATED });
    return axios.put(api, {
        taskId: taskId,
        taskCheck: taskCheck,
        name:taskName
    }).then((response) => {
        const newTask = taskList.map(task => {
            if (task._id === taskId)
                task.taskCheck = taskCheck
            return task
        })
        dispatch({ type: actionTypes.API_POST_TASK_SUCCESS, task: newTask });
        return response
    }).catch((error) => {
        dispatch({ type: actionTypes.API_POST_TASK_FAILED });
        return error
    })
}

export const updateTaskName = (taskId, taskName,taskCheck) => (dispatch, getState) => {
    const { taskList } = getState().task
    const api = `${apiBase}/task/${taskId}`;
    dispatch({ type: actionTypes.API_POST_TASK_INITIATED });
    return axios.put(api, {
        taskId: taskId,
        name: taskName,
        taskCheck:taskCheck
    }).then((response) => {
        const newTask = taskList.map(task => {
            if (task._id === taskId)
                task.name = taskName
            return task
        })
        dispatch({ type: actionTypes.API_POST_TASK_SUCCESS, task: newTask });
        return response
    }).catch((error) => {
        dispatch({ type: actionTypes.API_POST_TASK_FAILED });
        return error
    })
}







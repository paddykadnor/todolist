import React, { Component } from 'react';
import propTypes from "prop-types"
import './style.css';
import { Grid, Button, TextField, Container, Box, Divider } from '@material-ui/core'
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { getBucket, saveBucket } from "./actions/bucket.action"
import { getTask, saveTask, removeTask, completeTask, editTask, updateTaskName } from "./actions/task.action"
import { findIndex, filter, cloneDeep } from 'lodash'


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            groupName: "",
            groups: []
        }

    }

    componentDidMount() {

        // var W3CWebSocket = require('websocket').w3cwebsocket;

        // var client = new W3CWebSocket('ws://localhost:8080/', 'echo-protocol');

        // client.onerror = function () {
        //     console.log('Connection Error');
        // };

        // client.onopen = function () {
        //     console.log('WebSocket Client Connected');

        //     function sendNumber() {
        //         if (client.readyState === client.OPEN) {
        //             var number = Math.round(Math.random() * 0xFFFFFF);
        //             client.send(number.toString());
        //             setTimeout(sendNumber, 1000);
        //         }
        //     }
        //     sendNumber();
        // };

        // client.onclose = function () {
        //     console.log('echo-protocol Client Closed');
        // };

        // client.onmessage = function (e) {
        //     if (typeof e.data === 'string') {
        //         console.log("Received: '" + e.data + "'");
        //     }
        // };
        this.fetchGroup()
    }

    createGroup = async (action) => {
        const { groupName } = this.state
        // const action = e.currentTarget.name
        //  e.stopPropagation()
        await fetch("http://localhost:4200/group/create", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            body: JSON.stringify({ "groupName": groupName, action })

        }).then(response => {
            if (response.status === 200) {
                this.setState({
                    groupName: ""
                })
            }
            // console.log(response)
        })

        this.fetchGroup()
    }

    fetchGroup = () => {
        fetch("http://localhost:4200/group", {
            method: "post",
            data: { exportFormat: "XML" }
        }).then((response) => {
            return response.json()
        }).then(data => {
            const groups = []
            data.elements[0].elements[1].elements[1].elements.map((ele, index) => {
                // console.log(ele.elements[0].attributes.NAME)
                groups.push({ Id: index, group: ele.elements[0].attributes.NAME })
            })
            this.setState({
                groups
            })
        })
    }

    setgroupName = (e) => {
        this.setState({
            groupName: e.target.value
        })
    }

    delete = async (e) => {
        const { groups } = this.state
        e.persist();
        const arr = [...groups]
        const Id = e.currentTarget.id
        // e.stopPropagation()
        const index = findIndex(groups, { 'Id': parseInt(Id) })
        // console.log(groups.splice(index, 1))

        this.setState({
            groupName: groups[index].group,
            //  groups: index >= 0 ? groups.splice(index, 1) : groups
        }, () => {
            this.createGroup("Delete")
        })



    }
    render() {
        const { groupName, groups } = this.state
        return (
            <Container maxWidth="md" >
                <Box spacing={2} paddingTop={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField id="standard-basic" label="Group Name" variant="outlined" onChange={this.setgroupName} value={groupName} size="small" />
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>
                            <Button color="primary" variant="contained" size="small" disabled={groupName.length > 0 ? false : true} name="Create" onClick={() => this.createGroup("Create")}>
                                Create Group
                        </Button>
                        </Grid>

                    </Grid>
                    <br />
                    <Divider />
                    <br />
                    <Grid container spacing={2}>
                        {
                            groups.map(name => {
                                return (
                                    <React.Fragment>
                                        <Grid item xs={8}>
                                            {name.group}
                                        </Grid>
                                        <Grid item xs={4} style={{ textAlign: "right" }}>
                                            <Button variant="contained" size="small" name="Delete" id={name.Id} onClick={this.delete} color="secondary">Delete</Button>
                                        </Grid>
                                    </React.Fragment>
                                )
                            })
                        }


                    </Grid>
                    <br />
                    <Divider />
                    <br />
                </Box>
            </Container >
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getBucket: () => dispatch(getBucket()),
    saveBucket: (bucketName) => dispatch(saveBucket(bucketName)),
    getTask: () => dispatch(getTask()),
    saveTask: (taskName, bId, taskCheck) => dispatch(saveTask(taskName, bId, taskCheck)),
    removeTask: (taskId) => dispatch(removeTask(taskId)),
    completeTask: (taskId, taskCheck, taskName) => dispatch(completeTask(taskId, taskCheck, taskName)),
    editTask: (taskId) => dispatch(editTask(taskId)),
    updateTaskName: (taskId, taskName, taskCheck) => dispatch(updateTaskName(taskId, taskName, taskCheck))
})

const mapStateToProps = (state) => ({
    bucketList: state.bucket.bucketList,
    taskList: state.task.taskList
})


App.propTypes = {
    bucketName: propTypes.string,
    bucketList: propTypes.array,
    taskList: propTypes.array,
    complete: propTypes.bool
}

App.defaultProps = {
    bucketName: "",
    bucketList: [],
    taskList: [],
    complete: false
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

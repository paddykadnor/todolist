import React, { Component } from 'react';
import propTypes from "prop-types"
import './style.css';
import Header from "./components/Header/Header"
import Category from "./components/Category/Category"
import { Grid, Button, TextField, Container, Box, Divider } from '@material-ui/core'
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { getBucket, saveBucket } from "./actions/bucket.action"
import { getTask, saveTask, removeTask, completeTask, editTask, updateTaskName } from "./actions/task.action"


class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            groupName: "",
            groups: []
        }

    }

    componentDidMount() {
         fetch("http://localhost:4200/group", {
            method: "post",
            data: { exportFormat: "XML" }
        }).then((response) => {
            console.log(response)
        })
    }

    createGroup = async () => {
        const { groupName } = this.state
        await fetch("http://localhost:4200/group/create", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            body: JSON.stringify({ "groupName": groupName })

        }).then(response => {
            if (response.status === 200) {
                this.setState({
                    groupName: ""
                })
            }
            console.log(response)
        })

        await fetch("http://localhost:4200/group", {
            method: "post",
            data: { exportFormat: "XML" }
        }).then((response) => {
            console.log(response)
        })
    }

    setgroupName = (e) => {
        this.setState({
            groupName: e.target.value
        })
    }
    render() {
        const { groupName } = this.state
        return (
            <Container maxWidth="md" >
                <Box spacing={2} paddingTop={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField id="standard-basic" label="Group Name" variant="outlined" onChange={this.setgroupName} value={groupName} size="small" />
                        </Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>
                            <Button color="primary" variant="contained" size="small" disabled={groupName.length > 0 ? false : true} onClick={this.createGroup}>
                                Create Group
                        </Button>
                        </Grid>

                    </Grid>
                    <br />
                    <Divider />
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            Hello
                    </Grid>
                        <Grid item xs={6} style={{ textAlign: "right" }}>
                            Hello
                    </Grid>
                    </Grid>
                </Box>
            </Container>
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

import React, { Component } from 'react';
import propTypes from "prop-types"
import './style.css';
import Header from "./components/Header/Header"
import Category from "./components/Category/Category"
import { Button } from "reactstrap"
import { Card, CardText, CardBody, Form, FormGroup, Input } from 'reactstrap';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { getBucket, saveBucket } from "./actions/bucket.action"
import { getTask, saveTask,removeTask,completeTask,editTask,updateTaskName } from "./actions/task.action"


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bucketName: "",
      edit:""
    }

  }

  componentDidMount() {
    this.props.getBucket()
    this.props.getTask()
  }


  createBucket = (e) => {
    this.setState({
      bucketName: e.target.value
    })
  }

  saveBucketName = () => {
    this.props.saveBucket(this.state.bucketName).then(response => {
      this.setState({
        bucketName: ""
      })
    }).catch(err => {
      console.log(err)
    })
    //api call 
  }

  saveTaskName = (taskName, bId,taskCheck) => {
    return this.props.saveTask(taskName, bId,taskCheck)
  }

  updateTaskName=(taskId,taskName,taskcheck)=>{
    return  this.props.updateTaskName(taskId,taskName,taskcheck).then(response=>{
        this.setState({
          edit:""
        })
      })
  }

  remove=(taskId)=>{
this.props.removeTask(taskId)
  }

  onEdit=(taskId)=>{
    this.setState({
      edit:taskId
    })
  }

  editTask=(taskId)=>{
   this.props.editTask(taskId)
  }

  onComplete=(taskId,taskCheck,taskName)=>{
      this.props.completeTask(taskId,!taskCheck,taskName)
  }
  


  render() {
    const { bucketList, taskList } = this.props
    const {edit} = this.state
    if (bucketList.length === 0) {
      return <div className="error">
        Create bucket name
    </div>
    }
    return (
      <div className="app">
        <Header></Header>
        <div className="todolist">
          <Form>
            <FormGroup>
              <Input type="text" name="text" id="bucketName" value={this.state.bucketName} placeholder="Enter bucket name" onChange={this.createBucket} />
              <Button className="btn" disabled={this.state.bucketName.length===0?"disabled":""} onClick={this.saveBucketName} >Create Bucket</Button>
            </FormGroup>
          </Form>
          <Category bucketList={bucketList} saveTask={this.saveTaskName} updateTaskName={this.updateTaskName}>
            {
              taskList.map((taskz, index) => {
                return (<Card key={index} bid={taskz.bId} taskid={taskz._id} taskname={taskz.name} editid={edit} taskcheck={taskz.taskCheck}>
                  <CardBody>
                    <div >
                      <input id={taskz._id} type="checkbox" checked={taskz.taskCheck}  onChange={()=>this.onComplete(taskz._id,taskz.taskCheck,taskz.name)}></input>
                    </div>
                    <div>
                      <CardText className={taskz.taskCheck?"strike":""}>{taskz.name}</CardText>
                    </div>
                    <div >
                      <FontAwesomeIcon icon={faEdit} id={taskz._id} onClick={()=>this.onEdit(taskz._id)} />
                    </div>
                    <div >
                      <FontAwesomeIcon icon={faTrash}  onClick={()=>this.remove(taskz._id)} />
                    </div>
                  </CardBody>
                </Card>
                )
              })

            }

          </Category>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getBucket: () => dispatch(getBucket()),
  saveBucket: (bucketName) => dispatch(saveBucket(bucketName)),
  getTask: () => dispatch(getTask()),
  saveTask: (taskName, bId,taskCheck) => dispatch(saveTask(taskName, bId,taskCheck)),
  removeTask:(taskId)=>dispatch(removeTask(taskId)),
  completeTask:(taskId,taskCheck,taskName)=>dispatch(completeTask(taskId,taskCheck,taskName)),
  editTask:(taskId)=>dispatch(editTask(taskId)),
  updateTaskName:(taskId,taskName,taskCheck)=>dispatch(updateTaskName(taskId,taskName,taskCheck))
})

const mapStateToProps = (state) => ({
  bucketList: state.bucket.bucketList,
  taskList: state.task.taskList
})


App.propTypes = {
  bucketName: propTypes.string,
  bucketList: propTypes.array,
  taskList: propTypes.array,
  complete:propTypes.bool
}

App.defaultProps = {
  bucketName: "",
  bucketList: [],
  taskList: [],
  complete:false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

import React from "react"
import propTypes from "prop-types"
import {
    Button, Form, FormGroup, Input
} from 'reactstrap';
import "./Category.css"


class Category extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            toggle: false,
            list: "",
            taskName: ""
        }
    }

    /**
     * save addCard name 
     * @param {taskId}
     * @returns response
     */
    addCard = (e) => {
        this.setState({
            list: e.target.value
        })
    }

    /**
 * save cancelCard name 
 * @param {taskId}
 * @returns response
 */
    cancelCard = () => {
        this.setState({
            list: ""
        })
    }

    /**
 * save onChange name 
 * @param {taskId}
 * @returns response
 */
    onChange = (e) => {

        this.setState({
            taskName: e.target.value
        })
    }
    /**
     * save task name 
     * @param {taskId}
     * @returns response
     */
    saveTaskName = (e) => {
        this.props.saveTask(this.state.taskName, e.target.name).then(task => {
            this.setState({
                taskName: "",
                list: ""
            })
        }).catch(error => {
            console.log(error)
        })
    }

    /**
 * save task name 
 * @param {taskId}
 * @returns response
 */
    updateTask = (taskid, taskCheck) => {
        this.props.updateTaskName(taskid, this.state.taskName, taskCheck).then(task => {
            this.setState({
                taskName: "",
                list: ""
            })
        }).catch(error => {
            console.log(error)
        })
    }

    render() {
        const { bucketList, children } = this.props
        if (bucketList !== undefined && bucketList.length > 0) {
            return (
                <div className="category">
                    {
                        bucketList.map((categ, index) => {
                            return (
                                <div className="category-name" key={index}>
                                    <div className="category-list" key={`category ${categ._id}`}>
                                        {categ.name}
                                    </div>
                                    {
                                        children.map(task => {
                                            if (task.props.editid === task.props.taskid && task.props.bid === categ._id) {
                                                return (<Form key={task.props.taskid}>
                                                    <FormGroup>
                                                        <Input type="textarea" name="text" onChange={this.onChange} id="bucketName" placeholder="Enter task....." value={this.state.taskName || task.props.taskname} />
                                                        <Button className="btn" name={task.props.taskid} onClick={() => this.updateTask(task.props.taskid, task.props.taskcheck)}>Update</Button>
                                                        <Button className="btn remove">Cancel</Button>
                                                    </FormGroup>
                                                </Form>)
                                            }

                                            if (task.props.bid === categ._id)
                                                return task

                                            return null
                                        })
                                    }
                                    <Form className={`${this.state.list === categ._id ? 'd-block' : 'd-none'}`}>
                                        <FormGroup>
                                            <Input type="textarea" name="text" onChange={this.onChange} id="bucketName" placeholder="Enter task....." value={this.state.taskName} />
                                            <Button className="btn" name={categ._id} onClick={this.saveTaskName}>Save</Button>
                                            <Button className="btn remove">Cancel</Button>
                                        </FormGroup>
                                    </Form>
                                    <Button className="new-card" value={categ._id} onClick={this.addCard}>Add Card...</Button>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        else
            return null

    }
}



Category.propTypes
{
    toggle: propTypes.bool
    list: propTypes.string
    taskName: propTypes.string

}

Category.defaultProps = {
    toggle: false,
    list: "",
    taskName: ""
};
export default Category
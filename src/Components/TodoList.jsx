import React, { Component } from "react";
import { TableCell, Checkbox, TableRow, TextField } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { connect } from "react-redux";
import { deleteTodo, toggleTodo, updateTodo } from "../Redux/action";

class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isText: false,
            value: this.props.data.title
        }
    }
    handleChange = (e, payload) => {
        let checked = e.target.checked
        if (checked)
            this.props.toggleTodo(payload)
    }
    handleClick = () => {
        this.setState({
            isText: true
        })
    }
    handleBlur = (text, id, date) => {
        this.setState({
            isText: false
        })
        let object = {
            title: text,
            status: false,
            id: id,
            date:date
        }
        this.props.updateTodo(object)
    }

    render() {
        const { title, id, status, date } = this.props.data
        const { deleteTodo } = this.props
        return (
            <> {!status ?
                <TableRow
                    key={id}
                    hover={true}
                >{!this.state.isText ?
                    <>
                        <TableCell
                            padding="none"
                            align="left"
                            style={{ fontSize:20 ,padding:6}}
                        >
                            <Checkbox
                                onChange={e => this.handleChange(e, {title:title, id:id, status:status, date : date})}
                            />{title}
                        </TableCell>
                        <TableCell
                            padding="none"
                            align="right" >
                                <EditIcon onClick={this.handleClick} style={{marginRight:30, cursor: "pointer", color:"blue"}}/>
                            <DeleteIcon onClick={() => deleteTodo(id)} style={{ marginRight: 30, cursor: "pointer", color:"red" }} />
                        </TableCell>
                    </>
                    :
                    <>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            defaultValue={title}
                            fullWidth={true}
                            autoFocus
                            onChange={(e) => this.setState({ value: e.target.value })}
                            onBlur={() => this.handleBlur(this.state.value, id, date)} />
                    </>

                    }
                </TableRow>
                : null}
            </>
        )
    }
}

const mapStateToProps = state => ({
    todo: state.todo
})

const mapDispatchToProps = dispatch => ({
    deleteTodo: payload => dispatch(deleteTodo(payload)),
    toggleTodo: payload => dispatch(toggleTodo(payload)),
    updateTodo: payload => dispatch(updateTodo(payload))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)
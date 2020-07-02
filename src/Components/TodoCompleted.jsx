import React, { Component } from 'react';
import { connect } from "react-redux";
import { Container, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteTodo } from "../Redux/action";
import Pagination from '@material-ui/lab/Pagination';


class TodoCompleted extends Component {
    constructor(props){
        super(props)
        this.state ={
            done:[],
            pageNo:1
        }
    }

    UNSAFE_componentWillReceiveProps(props){
        if(this.state.done.length <= 5){
            this.setState({ done : props.completed },()=>{})
        }
        else{
            this.setState({ done : props.completed },()=>{})
            this.handleDone()
        }
    }
    handleDone = (page) => {
        this.setState({ pageNo : page },()=>{})

      }

    render() {
        const { deleteTodo, completed } = this.props
        var count = completed.length ;

        let offset = ((this.state.pageNo || 1) - 1) * 5
        var done = completed.filter((item, index) => index >= offset && index < offset + 5);

        var donePages = Math.ceil(count / 5);
        return (
            <>
                <Container style={{marginTop:50, minHeight:275}}>
                        {count > 0 ? <h2 style={{margin:"auto"}}>Completed</h2> : null}
                    <Table>
                        <TableBody  >
                            {done.map(item =>
                                <TableRow
                                    key={item.id}
                                    hover={true}
                                    >
                                    <TableCell
                                        padding="none"
                                        align="left"
                                        style={{ textDecoration: "line-through",fontSize:20 ,padding:6}}
                                    >
                                        {item.title}
                                    </TableCell>
                                    <TableCell
                                        padding="none"
                                        align="right"
                                    >
                                        <DeleteIcon onClick={() => deleteTodo(item.id)} style={{ marginRight:"auto", cursor: "pointer", color:"red" }} />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {count > 5 ?
            <Pagination
              count={donePages}
              color="secondary"
              style={{ marginTop: 10 }}
              onChange={(event: null, page: number) => this.handleDone(page)} /> : null}
                </Container>
            </>
        );
    }
}

const mapStateToProps = state => ({
    completed: state.completed
})

const mapDispatchToProps = dispatch => ({
    deleteTodo: payload => dispatch(deleteTodo(payload))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoCompleted);
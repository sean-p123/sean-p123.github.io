import React from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import axios from "axios";
export class BookItem extends React.Component {
    
    constructor(){
        super();
        this.DeleteBook = this.DeleteBook.bind(this);
    }
    DeleteBook(e){
        e.preventDefault();

        axios.delete('http://localhost:4000/api/books/'+this.probs.book._id)
        .then((res)=>{
            this.props.reloadData();
        })
        .catch();
    }
    render() {
        return (
            <div>
                {/* <h4>{this.props.book.title}</h4>
        <img src={this.props.book.thumbnailUrl}></img>
                <h6>{this.props.book.authors[0]}</h6> */}

                <Card>
            <Card.Header>{this.props.book.title}</Card.Header>
                    <Card.Body>
       <blockquote className="blockquote mb-0">
            <img src={this.props.book.cover}></img>
            <footer >
                {this.props.book.author}
                    </footer>
                        </blockquote>
                    </Card.Body> 
                    <Link to={'/edit/'+ this.props.book._id} className = "btn btn-primary">Edit</Link>
                    <Button variant="danger" onClick={this.DeleteBook}>Delete</Button>
                </Card>
            </div>
        );
    }
}
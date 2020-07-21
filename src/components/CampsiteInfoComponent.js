import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    state={
        isModalOpen: false
        
    }
    
    handleSubmit = (values) => {
        this.props.addCommentd(this.props.campsiteIdd, values.rating, values.author, values.text);
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    
    render() {
        return(
            <React.Fragment>
                <Button onClick={this.toggleModal} outline type="submit" color="danger">
                    <i className="fa fa-pencil" />SUBMIT COMMENT!
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>SUBMIT COMMENT</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={10}>
                                <Label>Rating</Label>
                                <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>5</option>
                                        <option>4</option>
                                        <option>3</option>
                                        <option>2</option>
                                        <option>1</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                <Label>Your Name?</Label>
                                <Control.text model=".author" name="author"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, 
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                />
                                <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                <Label>Comment?</Label>
                                <Control.textarea row="6" model=".text" name="text"
                                        className="form-control">
                                </Control.textarea>
                                </Col>
                            </Row>
                            <Button outline type="submit" color="primary">SUBMIT!</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

function RenderCampsite({campsitec}) {
        return (
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsitec.image} alt={campsitec.name} />
                    <CardBody>
                        <CardText>{campsitec.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    
function RenderComments({commentsc, addCommentc, campositeId}) {
        if (commentsc) {
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {commentsc.map(comment => {
                        return (
                            <div key={comment.id}>
                                <p>"{comment.text}"<br></br>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </div>
                        )
                    })}
                    <CommentForm campsiteIdd={campositeId} addCommentd={addCommentc}/>
                </div>
            )
        }
            return <div></div>
    }

function CampsiteInfo(props) {
        if (props.campsiteo) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsiteo.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsiteo.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsitec={props.campsiteo} />
                        <RenderComments 
                            commentsc={props.commentso}
                            addCommentc={props.addCommentThatWasPropped}
                            campositeId={props.campsiteo.id} />
                    </div>
                </div>
            )
        }
            return <div />;
    };


export default CampsiteInfo;
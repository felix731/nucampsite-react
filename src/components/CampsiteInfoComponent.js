import React from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


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
    
function RenderComments({commentsc}) {
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
                        <RenderComments commentsc={props.commentso} />
                    </div>
                </div>
            )
        }
            return <div />;
    };


export default CampsiteInfo;
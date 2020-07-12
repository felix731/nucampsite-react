import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

function RenderCard({iteme}) {
    return (
        <Card>
            <CardImg src={iteme.image} alt={iteme.name} />
            <CardBody>
                <CardTitle>{iteme.name}</CardTitle>
                <CardText>{iteme.description}</CardText>
            </CardBody>
        </Card>
    );
}

function Home(props) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md m-1">
                    <RenderCard iteme={props.campsitee} />
                </div>
                <div className="col-md m-1">
                    <RenderCard iteme={props.promotione} />
                </div>
                <div className="col-md m-1">
                    <RenderCard iteme={props.partnere} />
                </div>
            </div>
        </div>
    );
}

export default Home;
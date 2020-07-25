import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


function RenderCard({iteme, isLoading, errMess}) {
    if (isLoading) {
        return (
             <Loading />
        );
    }
    if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    }

    return (
        <Card>
            <CardImg src={baseUrl + iteme.image} alt={iteme.name} />
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
                    <RenderCard iteme={props.campsitee} 
                                isLoading={props.campsitesLoading}
                                errMess={props.campsitesErrMess}
                    />
                </div>
                <div className="col-md m-1">
                    <RenderCard iteme={props.promotione}
                                isLoading={props.promotionLoading}
                                errMess={props.promotionErrMess} />
                </div>
                <div className="col-md m-1">
                    <RenderCard iteme={props.partnere} />
                </div>
            </div>
        </div>
    );
}

export default Home;
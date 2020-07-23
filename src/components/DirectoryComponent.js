import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import {Loading} from './LoadingComponent';



function RenderDirectoryItem({campsite4}) {
    // console.log({campsite4, onClick})
    return (
        <Card>
            <Link to={`/directory/${campsite4.id}`}>
                <CardImg width="100%" src={campsite4.image} alt={campsite4.name} />
                <CardImgOverlay>
                    <CardTitle>{campsite4.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

function Directory(props) {
    
console.log(props)
    const directory = props.campsitez.campsites.map(campsiter => {
        return (
            <div key={campsiter.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite4={campsiter} />
            </div>
        );
    });

    if (props.campsitez.isLoading) {
        return (
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.campsitez.errMess) {
        return (
            <div className="container">
                <div className="row"> 
                    <div className="col">
                        <h4>{props.campsites.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    } 

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Directory</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>Directory</h2>
                    <hr />
                </div>
            </div>
            <div className="row">
                {directory}
            </div>
        </div>
    );
}

export default Directory;
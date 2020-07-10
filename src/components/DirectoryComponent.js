import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

function RenderDirectoryItem({campsite4, onClicka}) {
    // console.log({campsite4, onClick})
    return (
        <Card onClick={() => onClicka(campsite4.id)}>
            <CardImg width="100%" src={campsite4.image} alt={campsite4.name} />
            <CardImgOverlay>
                <CardTitle>{campsite4.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

function Directory(props) {
    
// console.log(props)
    const directory = props.campsitez.map(campsiter => {
        return (
            <div key={campsiter.id} className="col-md-5 m-1">
                <RenderDirectoryItem campsite4={campsiter} onClicka={props.onClickz} />
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                {directory}
            </div>
        </div>
    );
}

export default Directory;
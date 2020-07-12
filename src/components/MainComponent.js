import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Contact from './ContactComponent';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';
import About from './AboutComponent';
import CampsiteInfo from './CampsiteInfoComponent';


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS
        };
    }


    render() {

        const HomePage = () => {
            return (
            <Home 
                campsitee={this.state.campsites.filter(campsite => campsite.featured)[0]}
                promotione={this.state.promotions.filter(promotion => promotion.featured)[0]}
                partnere={this.state.partners.filter(partner => partner.featured)[0]}
            />
            );
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsiteo={this.state.campsites.filter(campsitew => campsitew.id === +match.params.campsiteId)[0]}
                    commentso={this.state.comments.filter(commentw => commentw.campsiteId === +match.params.campsiteId)}
                />
            );
    };    

        return (
                <div>
                    <Header />
                    <Switch>
                        <Route path='/home' component={HomePage} />
                        <Route exact path='/directory' render={() => <Directory campsitez={this.state.campsites} />} />
                        <Route path='/contactus' component={Contact}/>
                        <Route exact path='/about' render={() => <About partnerz={this.state.partners} />} />
                        <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                        <Redirect to='/home' />
                    </Switch>
                    <Footer />
            </div>
        );
    }
}



export default Main;

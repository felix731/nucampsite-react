import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Contact from './ContactComponent';
import About from './AboutComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { addComment, fetchCampsites } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

const mapDispatchToProps = {
    addCommentr: (campsiteId, rating, author, text) => (addComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites())
};

class Main extends Component {
    componentDidMount() {
        this.props.fetchCampsites();
    }

    render() {
        console.log(this.props);
        const HomePage = () => {
            return (
            <Home 
                campsitee={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                campsitesLoading={this.props.campsites.isLoading}
                campsitesErrMess={this.props.campsites.errMess}
                promotione={this.props.promotions.filter(promotion => promotion.featured)[0]}
                partnere={this.props.partners.filter(partner => partner.featured)[0]}
            />
            );
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsiteo={this.props.campsites.campsites.filter(campsitew => campsitew.id === +match.params.campsiteId)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    commentso={this.props.comments.filter(commentw => commentw.campsiteId === +match.params.campsiteId)}
                    addCommentThatWasPropped={this.props.addCommentr}
                />
            );
    };    

        return (
                <div>
                    <Header />
                    <Switch>
                        <Route path='/home' component={HomePage} />
                        <Route exact path='/directory' render={() => <Directory campsitez={this.props.campsites} />} />
                        <Route path='/contactus' component={Contact}/>
                        <Route exact path='/about' render={() => <About partnerz={this.props.partners} />} />
                        <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                        <Redirect to='/home' />
                    </Switch>
                    <Footer />
            </div>
        );
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
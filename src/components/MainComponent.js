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
import { postComment, fetchCampsites, fetchComments, fetchPromotions, fetchPartners, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
};

const mapDispatchToProps = {
    postCommentr: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
    fetchCampsites: () => (fetchCampsites()),
    resetFeedbackForm: () => (actions.reset('feedbackForm')),
    fetchComments: () => (fetchComments()),
    fetchPromotions: () => (fetchPromotions()),
    fetchPartners: () => (fetchPartners()),
    postFeedback: (feedback) => (postFeedback(feedback))
};

class Main extends Component {
    componentDidMount() {
        this.props.fetchCampsites();
        this.props.fetchComments();
        this.props.fetchPromotions();
        this.props.fetchPartners();
    }

    render() {
        console.log(this.props);
        const HomePage = () => {
            return (
            <Home 
                campsitee={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
                campsitesLoading={this.props.campsites.isLoading}
                campsitesErrMess={this.props.campsites.errMess}
                promotione={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
                promotionLoading={this.props.promotions.isLoading}
                promotionErrMess={this.props.promotions.errMess}
                partnere={this.props.partners.partners.filter(partner => partner.featured)[0]}
                partnersLoading={this.props.partners.isLoading}
                partnersErrMess={this.props.partners.errMess}
            />
            );
        }

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsiteo={this.props.campsites.campsites.filter(campsitew => campsitew.id === +match.params.campsiteId)[0]}
                    campsitesLoading={this.props.campsites.isLoading}
                    campsitesErrMess={this.props.campsites.errMess}
                    commentso={this.props.comments.comments.filter(commentw => commentw.campsiteId === +match.params.campsiteId)}
                    addCommentThatWasPropped={this.props.postCommentr}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            );
    };    

        return (
                <div>
                    <Header />
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                            <Switch>
                                <Route path='/home' component={HomePage} />
                                <Route exact path='/directory' render={() => <Directory campsitez={this.props.campsites} />} />
                                <Route path='/contactus' render={()=> <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                                <Route exact path='/about' render={() => <About partnerz={this.props.partners} />} />
                                <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                                <Redirect to='/home' />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                    <Footer />
            </div>
        );
    }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
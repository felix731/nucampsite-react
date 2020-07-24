import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { CampsitesReducer } from './campsitesReducer';
import { CommentsReducer } from './commentsReducer';
import { PartnersReducer } from './partnersReducer';
import { PromotionsReducer } from './promotionsReducer';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {
    const store = createStore( 
        combineReducers({
            campsites: CampsitesReducer,
            comments: CommentsReducer,
            partners: PartnersReducer,
            promotions: PromotionsReducer,
            ...createForms({
                feedbackForm: InitialFeedback
            })
            
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};
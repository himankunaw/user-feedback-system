import { Router } from 'express';
import { validate } from 'express-validation';
import { submitFeedback, getAllFeedback } from './controller/feedback.controller';
import { Route } from './types/route.validation';
import { submitFeedBack, getallFeedback } from './validations/feedback.validations';

const router = Router();

router.post('/', submitFeedback);
router.get('/', getAllFeedback);


class FeedbackRouter implements Route {
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router
        .all(`/*`)
        .post('/submit-feedback', 
            validate(submitFeedBack, {}, {}),
            submitFeedback
        )
        .get('/view-feedback', 
            validate(getallFeedback, {}, {}),
            getAllFeedback
        );
    }
}

export default new FeedbackRouter();
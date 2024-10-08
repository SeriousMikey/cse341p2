const validator = require('../validate');
const validate = async (req, res, next) => {
    const validationRule = {
        "donor_firstname": "required|string",
        "donor_middlename": "required|string",
        "donor_lastname": "required|string",
        "donor_age": "required|integer",
        "donor_gender": "required|string",
        "donor_donations_made": "required|integer",
        "donor_amount_donated": "required|integer",
        "donor_email": "required|string|email"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}
module.exports = {
    validate
};
/* eslint-disable camelcase */
/* eslint-disable indent */
const { validationResult } = require('express-validator');


class Check {
    static error(req, res, next) {
        const errorsAnimatorValidation = validationResult(req);

        if (!errorsAnimatorValidation.isEmpty()) {
            // console.log(errorsAnimatorValidation);
            if (errorsAnimatorValidation.errors.find((error) => error.msg === 'value undefined')) {
                return res.status(500).json({ error: 'value undefined' });
            }
            if (
                errorsAnimatorValidation.errors.find((error) => error.msg === 'empty or blank caracteres')
            ) {
                return res.status(500).json({ error: 'empty or blank caracteres' });
            }
            if (errorsAnimatorValidation.errors.find((error) => error.msg === 'is integer')) {
                return res.status(500).json({ error: 'is integer' });
            }
            if (errorsAnimatorValidation.errors.find((error) => error.msg === 'is not email')) {
                return res.status(500).json({ error: 'is not email' });
            }
        }
        return next();
    }
}

module.exports = { Check };

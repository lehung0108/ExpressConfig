import Validator from 'validator';
import ValidationError from '../../../errors-handle/validation.errors';
import {
    CreateAccountErrors, AccountLoginErrors, MeAccountErrors
} from '../error-codes/account.error-codes';

const createAccountInput = (req, res, next) => {
    const { email } = req.body;
    try {
        if (!req.body) throw CreateAccountErrors.NO_DATA;
        if (!email) throw CreateAccountErrors.NO_EMAIL;
        if (!Validator.isEmail(email)) throw CreateAccountErrors.INVALID_EMAIL;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const logInAccountInput = (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!req.body) throw AccountLoginErrors.NO_DATA;
        if (!email) throw AccountLoginErrors.NO_EMAIL;
        if (!password) throw AccountLoginErrors.NO_PASSWORD;
        if (!Validator.isEmail(email)) throw AccountLoginErrors.INVALID_EMAIL;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

const meInput = (req, res, next) => {
    const { jwt } = req.headers;
    try {
        if (!jwt) throw MeAccountErrors.NO_DATA;
        return next();
    } catch (error) {
        return res.onError(new ValidationError(error));
    }
};

export default {
    createAccountInput,
    logInAccountInput,
    meInput,
};
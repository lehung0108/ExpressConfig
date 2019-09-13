// Errors
import AlreadyExistError from '../../../errors-handle/already-exist.errors';
import NotFoundError from '../../../errors-handle/not-found.errors';
import ValidationError from '../../../errors-handle/validation.errors';
import AccountRepository from '../repositories/account.repository';
// Util
import { GenerateToken, VerifyToken } from '../../../utils/jwt.util';
// Commom - Code
import {
    CreateAccountErrors,
    AccountLoginErrors,
    MeAccountErrors,
} from '../error-codes/account.error-codes';
import { PasswordDefault, } from '../commons/account-status.common';


const create = async (req, res) => {
    const { email } = req.body;
    try {
        const existed = await AccountRepository.isExistedEmail(email);
        if (existed) throw new AlreadyExistError(CreateAccountErrors.EMAIL_ALREADY_EXIST);
        const password = PasswordDefault;
        const account = await AccountRepository.create({ email, password });
        return res.onSuccess(account);
    } catch (error) {
        return res.onError(error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const account = await AccountRepository.getAccountByEmail(email);
        if (!account) throw new NotFoundError(AccountLoginErrors.EMAIL_NEVER_EXIST);
        // compare password
        const isMatchPassword = await account.comparePassword(password);
        if (!isMatchPassword) throw new ValidationError(AccountLoginErrors.WRONG_PASSWORD);
        const jwt = GenerateToken(AccountRepository.getPayloadJwtSchema(account));
        return res.onSuccess({ jwt });
    } catch (error) {
        return res.onError(error);
    }
};

const me = async (req, res) => {
    const { jwt } = req.headers;
    try {
        const authenData = VerifyToken(jwt);
        const account = await AccountRepository.getAccountById(authenData.accountId);
        if (!account) throw new NotFoundError(MeAccountErrors.INVALID_ACCOUNT);
        return res.onSuccess(account);
    } catch (error) {
        return res.onError(error);
    }
};

export default {
    create,
    login,
    me,
};
import AccountSchema from '../models/account.model';
import { AccountStatus } from '../commons/account-status.common';

const isExistedEmail = async (email) => {
    const result = await AccountSchema.findOne({ email });
    return result;
};

const create = async (data) => {
    const result = await AccountSchema.create(data);
    return result;
};

const getAccountByEmail = async (email) => {
    const result = await AccountSchema.findOne({ email, status: AccountStatus.ACTIVE });
    return result;
};

const getPayloadJwtSchema = (account) => {
    return {
        accountId: account._id,
        role: account.role,
    };
};

const getAccountById = async (accountId) => {
    const result = await AccountSchema.findOne({ _id: accountId, status: AccountStatus.ACTIVE });
    return result;
};

export default {
    create,
    isExistedEmail,
    getAccountByEmail,
    getPayloadJwtSchema,
    getAccountById,
};
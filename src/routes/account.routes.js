import express from 'express';
import AccountController from '../modules/account-module/controllers/account.controller';
import AccountValidate from '../modules/account-module/middleware/account.middleware';

const router = express.Router();

// Create use routers
// POST
router.post('/account/', AccountValidate.createAccountInput, AccountController.create);
router.post('/account/login', AccountValidate.logInAccountInput, AccountController.login);

// GET
router.get('/account/me', AccountValidate.meInput, AccountController.me);

export default router;

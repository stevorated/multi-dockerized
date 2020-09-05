import { Router } from 'express';

import { validators } from '../../middleware';
import { AuthHelper } from '../../helpers';
import { AuthController } from '../../controllers';

const {
  confirmEmail,
  signUp,
  signIn,
  signOut,
  handShake,
  updateUser,
  forgotPassword,
} = AuthController.getInstance();

const router = Router();

//  ================================ public routes ===============================================
//                                 no auth middleware

router.get('/confirmemail', validators.confirmEmail, confirmEmail);
router.post('/confirmemail', confirmEmail);

//  ================================ loggedOut routes ============================================
//                               make sure is logged out!
router.post('/signup', validators.signUp, AuthHelper.isLoggedOut, signUp);
router.post('/signin', validators.signIn, AuthHelper.isLoggedOut, signIn);
router.post('/forgot/:id/:token', AuthHelper.isLoggedOut, forgotPassword); // TODO add validator

//  ================================ private routes ==============================================
//                                make sure is logged in!

router.post('/handshake', AuthHelper.isLoggedIn(true), handShake); // TODO add validator
router.post('/update', AuthHelper.isLoggedIn(), updateUser); // TODO add validator
router.post('/logout', AuthHelper.isLoggedIn(), signOut); // TODO add validator

// ================================= end routes ==================================================

export { router };

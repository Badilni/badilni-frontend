import * as registerModule from './register'
import * as verificationModule from './verificationCode'
import * as loginModule from './login'


export const register = registerModule.register
export const resendCode = verificationModule.resendCode
export const verifyCode = verificationModule.verifyCode
export const login = loginModule.login


// default export for compatibility
export default { register, resendCode, verifyCode, login }

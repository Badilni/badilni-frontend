import * as registerModule from './register'
import * as verificationModule from './verificationCode'

export const register = registerModule.register
export const resendCode = verificationModule.resendCode
export const verifyCode = verificationModule.verifyCode

// default export for compatibility
export default { register, resendCode, verifyCode }

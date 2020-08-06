import passportJWT from 'passport-jwt';
import { getUserById } from '../resources/users/user.controller';

export default new passportJWT.Strategy({
    secretOrKey: 'secretTemp',
    jwtFromRequest: passportJWT.ExtractJwt.fromHeader('authorization')
}, ( jwtPayload, next) => {
    getUserById( jwtPayload.user._id )
        .then( user => {
            if ( !user ) {
                return next(null, false); 
            }
            
            delete user.password;

            next(null, {
                ...user
            })
        })
        .catch( err => {
            console.log(err)
        })
})
import User, { IUser } from './user.model';

export function getAllUsers() {
    return User.find({});
}

export function createUser( user: IUser, hashedPassword: string ) {
    return new User({
        ...user,
        password: hashedPassword
    }).save();
}

export function duplicatedUser( email: string ) {
    return new Promise(( resolve, reject ) => {
        User.find().or([{'email': email}])
            .then( users => {
                resolve(users.length > 0)
            })
            .catch( error => {
                reject(error)
            })
    })
}

export function getUserById( id: string ) {
    return User.findById( id );
}

export function getUserByEmail( email: string ) {
    return User.findOne().where( {'email': email } );
}
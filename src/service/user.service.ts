import { AppUtils } from "../core/app.utils";
import { UserRequest } from "../model/request/user.request";
import { User } from "../persistence/entity/user";


export async function createUser(request: UserRequest): Promise<User> {
    try {
        // Check if user already exists
        const user = await User.findOne({ where: { username: request.username } });
        console.log('Checked for existing user:', user);
        if (user) {
            console.log('User already exists');
            throw new Error('User already exists');
        }

        // Log the incoming request
        console.log('Incoming request:', request);

        //Hash Password
        const hashedPassword = await AppUtils.generateHashPassword(request.password);
        console.log('Hashed Password:', hashedPassword);
        if(!hashedPassword) {
            console.error('Error hashing password');
            throw new Error('Error hashing password');
        }

        // Create a new user
        const newUser = User.build({
            username: request.username,
            password: hashedPassword,
            role: request.role
        })

        //Save User
        const savedUser = await newUser.save();
        console.log('User created successfully');
        return savedUser;
    } catch (error) {
        if(error instanceof Error) {
            if(error.message === 'User already exists') {
                console.error('Error creating user:', error.message);
                throw new Error('User already exists');
            } else if ( error.message === 'Error hashing password') {
                console.error('Error creating user:', error.message);
                throw new Error('Error hashing password');
            } else {
                console.error('Error creating user:', error);
                throw new Error('Internal server error');
            }
        } else {
            console.error('Unknown error:', error);
            throw new Error('Internal server error');
        }
    } 
}

export async function getUserByUsername(username: string): Promise<User | null> {
    try {
        const user = await User.findOne({ where: { username } });
        return user;
    } catch (error) {
        console.error('Error fetching user by username:', error);
        throw new Error('user not found');
    }
}
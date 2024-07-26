import bcrypt  from 'bcryptjs';
import { User } from '../persistence/entity/user';
import { Request, Response } from 'express';
import services from '../service/services';
import { Session } from 'express-session';

declare module 'express-session' {
    interface Session {
        user?: any;
    }
}
interface CustomSession extends Session {
    isLoggedIn?: boolean;
    username?: string;
}

export async function getSignup(req: Request, res: Response) {
    res.send('Signup');
}


export const signup = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;

    // try {

    //     // Check if the user already exists
    //     const existingUser = await services.userService.getUserByUsername(username);
    //     if (existingUser) {
    //         return res.status(400).json({ message: 'User already exists' });
    //     }

    //     // Log the plain text password
    //     console.log('Plain text password:', password);

    //     // Hash the password
    //     const hashedPassword = await bcrypt.hash(password, 10);

    //     // Log the hashed password
    //     console.log('Hashed password:', hashedPassword);

    //     // Create a new user
    //     const newUser = await services.userService.createUser({
    //         username,
    //         password: hashedPassword,
    //         role
    //     });

    //     res.status(201).json({ message: 'User created successfully', user: newUser });
    // } catch (error) {
    //     console.error('Error during signup:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    // }

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword,
            role
        });

        console.log('User created successfully');
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error during user creation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export async function getLogin(req: Request, res: Response) {
    res.send('Login');
}

export async function postLogin(req: Request, res:Response) {
    
    const { username, password } = req.body;
    console.log('Login attempt:', username);

    try {
        // Fetch user from the database
        const user = await User.findOne({ where: { username } });

        if (user) {
            // Compare the provided password with the hashed password
            const passwordValid = await bcrypt.compare(password, user.password);
            console.log('User found:', user);
            console.log('Plain text password:', password);
            console.log('Hashed password:', user.password);
            console.log('Password valid:', passwordValid);

            if (passwordValid) {
                const customSession = req.session as CustomSession;
                customSession.isLoggedIn = true;
                customSession.username = username;
                res.status(200).json({ message: 'Login successful', username });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } else {
            res.status(401).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
// try {
    //     if (!username || !password) {
    //         return res.status(400).json({  message: 'Username and password required'});
    //     }

    //     //Find user by Username
    //     const user = await services.userService.getUserByUsername(username);
    //     console.log('User found:', user);
    //     if(!user) {
    //         return res.status(401).json({ message: 'Invalid username' });
    //     }

    //     // Log the plain text password and hashed password
    //     console.log('Plain text password:', password);
    //     console.log('Hashed password:', user.password);

    //     // Compare password
    //     const isPasswordValid = await bcrypt.compare(password, user.password);
    //     console.log('Password valid:', isPasswordValid); 
    //     if (!isPasswordValid) {
    //         return res.status(401).json({ message: 'Invalid password' });
    //     }

    //     //After successful login, generate token and set session
    //     const token = await services.authService.generateToken(username, password);
    //     req.session.user = user.username;
    //     res.json({ data: {
    //         access_token: token.access_token,
    //         expires_in: token.expires_in
    //     }, 
    //     message: 'Login successfully', 
    //     status: 200 
    //     });
    // } catch (error) {
    //     console.error('Error:', error);
    //     res.status(500).json({ message: 'Internal server error' });
    // }


};




export async function logout(req: Request, res:Response) {
    // req.session.destroy((err) => {
    //     if (err) {
    //         console.log('Error logging out:', err);
    //         res.status(500).json({ message: 'Internal server Error-5' })
    //     } else {
    //         res.json({ message: 'Logout Successfully' });
    //     }
    // })
    const customSession = req.session as CustomSession;
    customSession.isLoggedIn = false;
    res.status(200).json({ message: 'Logout successful' });
}


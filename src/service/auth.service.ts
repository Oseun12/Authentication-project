import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "../persistence/entity/user";
import service from '../service/services';
import { SECRET_KEY, TOKEN_EXPIRATION } from "../middleware/auth";


export async function generateToken(username: string, password: string): Promise<{
    expires_in: any;
    access_token: any; 
    token: string 
}> {
    const user: User | null = await service.userService.getUserByUsername(username);

    if(!user) {
        throw new Error('User not found')
    }

    if (user.password !== password) {
        throw new Error('Invalid password');
    }
    
    const payload = { 
        username: user.username, 
        authorities: [user.role], 
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION});
    // Calculate the expiration time in seconds
    const expires_in = Math.floor(Date.now() / 1000) + (typeof TOKEN_EXPIRATION === 'number' ? TOKEN_EXPIRATION : 0);

    return { expires_in, access_token: token, token }
    
}

export const login = async (username: any, password: string) => {
    const user = await User.findOne({ where: { username } });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    return user;
};


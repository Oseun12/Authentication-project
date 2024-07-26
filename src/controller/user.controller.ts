import { Request, Response } from "express";
import { UserRequest } from "../model/request/user.request";
import services from "../service/services";
import { Session } from "express-session";
import { User } from "../persistence/entity/user";

interface CustomSession extends Session {
    user?: any;
}

const authenticateUser = (req: Request, res: Response, next: Function) => {
    const customSession = req.session as CustomSession;
    if (customSession.user) {
        next()
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export async function createUser(req: Request, res: Response) {
    try {
        authenticateUser(req, res, async() => {
            console.log('Request object', req.body);
            const request: UserRequest = req.body;
            const user = await services.userService.createUser(request);
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(400).json({ message: 'Error creating user' });
            }
        })
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error-2' });
    }
}

// export async function getUserByUsername(req: Request, res: Response) {
//     const { username } = req.params;
//     try {
//         authenticateUser(req, res, async () => {
//             const user = await services.userService.getUserByUsername(username);
//             if (user) {
//                 res.status(200).json(user)
//             } else {
//                 res.status(404).json({ message: 'User not found' });
//             }
//         })
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: 'Internal server error-34' });
//     }
// }

export const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const decodedUsername = decodeURIComponent(username);
        const user = await User.findOne({ where: { username: decodedUsername } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by username:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

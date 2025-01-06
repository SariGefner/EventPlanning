import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (user: { userName: any; email: any; }) => {
    const payload = { userName: user.userName, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
    return token;
};

export const setAuthCookies = (response: { cookies: { set: (arg0: string, arg1: any, arg2: { httpOnly: boolean; secure: boolean; maxAge: number; path: string; }) => void; }; }, userName: any, token: any) => {
    response.cookies.set('userName', userName, { 
        httpOnly: false, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 86400, 
        path: '/' 
    });
    response.cookies.set('token', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 86400, 
        path: '/' 
    });
};

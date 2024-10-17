import { jwt } from "../lib/jwt.js";

export const authMiddleware = async (req, res, next) => {
    const token = res.cookies[AUTH_COOKIE_NAME];

    if (!token) {
        next();
    }

    try {
        const decodedToken = await jwt.verify(token);

        req.user = decodedToken;
        req.isAuthenticated = true;

        res.locals.user = decodedToken;
        res.locals.isAuthenticated = true;

        next();
    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);

        res.redirect('/auth/login');
    }
};

export const isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/404');
    };

    next();
}

export const isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/404');
    };

    next();
}
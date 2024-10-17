import cookieParser from 'cookie-parser';
import express from 'express';

export default function expressInit(app) {
    app.use('/css', express.static('src/css'));
    app.use('/image', express.static('src/image'));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
}
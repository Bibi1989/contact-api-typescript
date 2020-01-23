import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { Mongo } from './controllers/interfaces'

dotenv.config()

import indexRouter from './routes/index';
import contactRouter from './routes/contactRoute';

const app = express();

const DB_URL = process.env.DB_URL!
const mongoOption: Mongo = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect(DB_URL, mongoOption, (err: Error) => {
  if(!err) {
    console.log("DB is connected")
  }
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../', 'public')));

app.use('/', indexRouter);
app.use('/api/contacts', contactRouter);

// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: HttpError, req: Request, res: Response, _next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status((<any>err).status || 500);
  res.render('error');
});

export default app

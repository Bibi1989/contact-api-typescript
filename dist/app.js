"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_1 = __importDefault(require("./routes/index"));
const contactRoute_1 = __importDefault(require("./routes/contactRoute"));
const postRoute_1 = __importDefault(require("./routes/postRoute"));
const deleteRoute_1 = __importDefault(require("./routes/deleteRoute"));
const app = express_1.default();
const DB_URL = process.env.DB_URL;
const mongoOption = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default.connect(DB_URL, mongoOption, (err) => {
    if (!err) {
        console.log("DB is connected");
    }
});
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_parser_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, '../', 'public')));
app.use('/', index_1.default);
app.use('/api/contacts', contactRoute_1.default);
app.use('/api/post', postRoute_1.default);
app.use('/api/delete', deleteRoute_1.default);
// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res, _next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
//# sourceMappingURL=app.js.map
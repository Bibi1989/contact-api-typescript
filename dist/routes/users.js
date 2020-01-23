"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
/* GET users listing. */
router.get('/', function (_req, res) {
    res.send('respond with a resource');
});
exports.default = router;
//# sourceMappingURL=users.js.map
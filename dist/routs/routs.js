"use strict";
const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const files_middleware = require("../middlewares/middleware");
router.post("/api/", 
//   files_middleware.uplaodValidator,
controller.func);
module.exports = router;

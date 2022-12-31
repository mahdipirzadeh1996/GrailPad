const router = require("express").Router();
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const CryptoJs = require("crypto-js");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const verify = require("../verifyToken");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "grail",
});

const encrypt = (input) => {
    const encrypt = CryptoJs.AES.encrypt(input, process.env.SECRET_KEY).toString()
    return encrypt;
};

const decrypt = (input) => {
    const bytes = CryptoJs.AES.decrypt(input, process.env.SECRET_KEY);
    const decrypt = bytes.toString(CryptoJs.enc.Utf8);
    return decrypt;
};

//Get ido admin
router.get('/ido/:email', verify, async (req, res) => {
    const email = req.params.email;

    if (email === 'support@grailpad.io') {
        const sqlSelect = "SELECT * FROM `tbl_ido` ORDER BY `date` DESC";

        try {
            await db.query(sqlSelect, (err, result) => {
                if (err) {
                    res.status(500).send('Try again!');
                } else {
                    if (result.length === 0) {
                        res.status(403).send('Please connect your first account address!');
                    } else {
                        res.status(200).json(result);
                    }
                }
            });
        } catch (e) {
            res.status(403).send('Server error!');
        }
    } else {
        res.status(403).send('You are not admin!');
    }
});

module.exports = router;
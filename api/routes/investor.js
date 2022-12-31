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

const paperStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public");
    },
    filename: function (req, file, cb) {
        const {
            body: { paperName }
        } = req;
        const fileType = path.extname(file.originalname);
        cb(null, paperName + '-' + Date.now() + fileType);
    }
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

function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
};

//Send email
router.post("/sendEmail", async (req, res) => {
    const email = req.body.emailReg;
    const password = req.body.passwordReg;
    const code = String(between(100000, 999999));

    const sqlFind = "SELECT * FROM `tbl_users` WHERE `email`=?"

    const sqlInsert = "INSERT INTO `tbl_email`(`email`, `password`, `code`) VALUES (?,?,?)";
    let cryptedCode = CryptoJs.AES.encrypt(code, process.env.SECRET_KEY).toString();
    let cryptedPass = CryptoJs.AES.encrypt(password, process.env.SECRET_KEY).toString();

    deleteEmail(email);

    try {
        await db.query(sqlFind, [email], (err, result) => {
            //res.send(result);
            if (err) {
                return res.status(500).send('Try again!');
            } else {
                if (result.length === 0) {
                    db.query(sqlInsert, [email, cryptedPass, cryptedCode], (err, result) => {
                        if (err) {
                            return res.status(500).send('Try again!');
                        } else {
                            sendEmail(email, code, res);
                        }
                    });
                } else {
                    res.status(500).send('Try another email!');
                }
            }
        });
    } catch (e) {
        res.status(400).send('Server error!')
    }
});
const sendEmail = (email, code, res) => {
    const output = `
    <div style="
      background-color: #002a4c;
      padding: 20px;
      color: #fff;
    ">
      <h1>Your activation code</h1>
      <h2>${code}</h2>
    </div>
  `;

    // <h3>Contact Details</h3>
    // <ul>
    //   <li>Name: ${req.body.name}</li>
    //   <li>Company: ${req.body.company}</li>
    //   <li>Email: ${req.body.email}</li>
    //   <li>Phone: ${req.body.phone}</li>
    // </ul>
    // <h3>Message</h3>
    // <p>${req.body.message}</p>

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        name: 'www.grailpad.io',
        host: "mail.grailpad.io",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'support@grailpad.io', // generated ethereal user
            pass: '13741222@Mahdi', // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: '"GrailPad" <support@grailpad.io>', // sender address
        to: String(email), // list of receivers
        subject: "Activation Email ✔", // Subject line
        html: output, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            deleteEmail(email);
            return (
                res.status(400).send('Wrong email address')
            );
        }
        setTimeout(function () {
            deleteEmail(email);
        }, 150000);
        res.status(200).send('Email has been sent successfully!');
    });
};

const deleteEmail = async (email) => {
    const sqlDelete = "DELETE FROM `tbl_email` WHERE `email`=?";

    await db.query(sqlDelete, [email]);
};

//Validation
router.post("/validation", async (req, res) => {
    const email = req.body.email;
    const code = req.body.code;

    const sqlSelect = 'SELECT * FROM `tbl_email` WHERE `email`=?';

    try {
        await db.query(sqlSelect, [email], (err, result) => {
            if (err) {
                return res.status(500).send('Try again!');
            } else {
                if (result === undefined) {
                    res.status(403).send('Code has been expired!!!');
                } else {
                    const originalCode = decrypt(result[0]["code"]);

                    if (originalCode !== code) {
                        res.status(400).json('Wrong code!');
                    } else if (originalCode === code) {
                        insertUser(result[0].email, result[0].password, res);
                    }
                }
            }
        });
    } catch (e) {
        res.status(400).send(e);
    }
});
const insertUser = async (email, password, res) => {
    const sqlInsert = "INSERT INTO `tbl_users`(`email`, `password`) VALUES (?,?)";

    try {
        await db.query(sqlInsert, [email, password], (err) => {
            if (err) {
                return res.status(500).send('Try again!');
            } else {
                const accessToken = jwt.sign(
                    { email: email },
                    process.env.SECRET_KEY,
                    { expiresIn: "1d" }
                );
                res.status(200).json({ email, accessToken });
            }
        });
    } catch (e) {
        res.status(403).send('Server error!');
    }
};

router.post("/test", async (req, res) => {
    sendEmail('pirzadeh_mahdi@yahoo.com', '123456', res)
})

//Send edit email
router.post("/sendEditEmail", verify, async (req, res) => {
    const newEmail = req.body.newEmail;
    const code = String(between(100000, 999999));

    const sqlFind = "SELECT * FROM `tbl_users` WHERE `email`=?"

    const sqlInsert = "INSERT INTO `tbl_email`(`email`, `password`, `code`) VALUES (?,?,?)";
    let cryptedCode = CryptoJs.AES.encrypt(code, process.env.SECRET_KEY).toString();

    deleteEmail(newEmail);

    try {
        await db.query(sqlFind, [newEmail], (err, result) => {
            //res.send(result);
            if (err) {
                return res.status(500).send('Try again!');
            } else {
                if (result.length === 0) {
                    db.query(sqlInsert, [newEmail, '', cryptedCode], (err, result) => {
                        if (err) {
                            return res.status(500).send('Try again!');
                        } else {
                            sendEmail(newEmail, code, res);
                        }
                    });
                } else {
                    res.status(500).send('Try another email!');
                }
            }
        });
    } catch (e) {
        res.status(400).send('Server error!')
    }
});

//Update email
router.post('/updateValidation', verify, async (req, res) => {
    const email = req.body.email;
    const newEmail = req.body.newEmail;
    const code = req.body.code;

    const sqlSelect = 'SELECT * FROM `tbl_email` WHERE `email`=?';

    try {
        await db.query(sqlSelect, [newEmail], (err, result) => {
            if (err) {
                return res.status(500).send('Try again!');
            } else {
                if (result === undefined) {
                    res.status(403).send('Code has been expired!!!');
                } else {
                    const originalCode = decrypt(result[0].code)

                    if (originalCode !== code) {
                        res.status(400).json('Wrong code!');
                    } else if (originalCode === code) {
                        updateEmail(email, newEmail, res);
                    }
                }
            }
        });
    } catch (e) {
        res.status(400).send(e);
    }
});
const updateEmail = async (lastEmail, email, res) => {
    const sqlUpdate = "UPDATE `tbl_users` SET `email`=? WHERE `email`=?";

    try {
        await db.query(sqlUpdate, [email, lastEmail], (err) => {
            if (err) {
                res.status(500).send('Try again!');
            } else {
                const accessToken = jwt.sign(
                    { email: email },
                    process.env.SECRET_KEY,
                    { expiresIn: "1d" }
                );
                res.status(200).json({ email, accessToken });
            }
        });
    } catch (e) {
        res.status(403).send('Server error!');
    }
};

//Register
router.post("/register", async (req, res) => {
    const email = req.body.emailReg;
    const password = req.body.passwordReg;

    const sqlInsert = "INSERT INTO `tbl_users`(`email`, `password`) VALUES (?,?)";

    try {
        await db.query(sqlInsert, [email, encrypt(password)], (err) => {
            if (err) {
                if (err.errno === 1062) {
                    res.status(500).send('This email exists!');
                } else {
                    res.status(500).send('Try again!');
                }
            } else {
                const accessToken = jwt.sign(
                    { email: email },
                    process.env.SECRET_KEY,
                    { expiresIn: "1d" }
                );
                res.status(200).json({ email, accessToken });
            }
        });
    } catch (e) {
        res.status(403).send('Server error!');
    }
});
//login 
router.get("/login/:user", async (req, res) => {
    const user = JSON.parse(req.params.user);

    const sqlSelect = "SELECT * FROM `tbl_users` WHERE `email`=?";

    try {
        await db.query(sqlSelect, [user.email], (err, result) => {
            if (err) {
                res.status(500).send('Try again!');
            } else {
                if (result.length === 0) {
                    res.status(403).send('Wrong email!');
                } else {
                    const pass = decrypt(result[0].password);

                    if (user.password === pass) {
                        const email = result[0].email;

                        const accessToken = jwt.sign(
                            { email: user.email },
                            process.env.SECRET_KEY,
                            { expiresIn: "1d" }
                        );
                        res.status(200).json({ email, accessToken });
                    } else {
                        res.status(403).send('Wrong password!');
                    }
                }
            }
        });
    } catch (e) {
        res.status(403).send('Server error!');
    }
});

//Get wallet addressess
router.get('/address/:username', verify, async (req, res) => {
    const username = req.params.username;

    const sqlSelect = "SELECT `address` FROM `tbl_wallet` WHERE `username`=?";

    try {
        await db.query(sqlSelect, [username], (err, result) => {
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
});
//Insert wallets
router.post("/inputAddress", verify, async (req, res) => {
    const address = String(req.body.address).toLowerCase();
    const username = req.body.username;

    const sqlInsert = "INSERT INTO `tbl_wallet`(`address`, `username`) VALUES (?,?)";

    try {
        await db.query(sqlInsert, [address, username], (err) => {
            if (err) {
                if (err.errno === 1452) {
                    res.status(500).send('Wrong username!');
                } else if (err.errno === 1062) {
                    res.status(500).send('This account belongs to someone else. Please change it!');
                } else {
                    res.status(500).send('Try again!');
                }
            } else {
                res.status(201).json('Successfull address insertion!');
            }
        });
    } catch (e) {
        res.status(403).send('Server error!');
    }
});

//Get token
router.get('/token/:username', verify, async (req, res) => {
    const username = req.params.username;

    const sqlSelect = "SELECT * FROM `tbl_token` WHERE `username`=?";

    try {
        await db.query(sqlSelect, [username], (err, result) => {
            if (err) {
                res.status(500).send('Try again!');
            } else {
                if (result.length === 0) {
                    res.status(403).send('No grail found!');
                } else {
                    res.status(200).json(result);
                }
            }
        });
    } catch (e) {
        res.status(403).send('Server error!');
    }
});
//Insert token
router.post('/inputToken', verify, async (req, res) => {
    const balance = req.body.balance;
    const network = req.body.network;
    const username = req.body.username;
    const address = String(req.body.address).toLowerCase();

    const sqlInsert = "INSERT INTO `tbl_token`(`balance`, `network`, `username`, `address`) VALUES (?,?,?,?)";

    try {
        await db.query(sqlInsert, [balance, network, username, address], (err) => {
            if (err) {
                if (err.errno === 1452) {
                    res.status(500).send('Wrong username!');
                } else {
                    res.status(500).send('Try again!');
                }
            } else {
                res.status(201).json('Successfull token insertion!');
            }
        });
    } catch (e) {
        res.status(403).send('Server error!');
    }
});
//Update token
router.put('/newToken', verify, async (req, res) => {
    const balance = req.body.balance;
    const network = req.body.network;
    const username = req.body.username;
    const address = req.body.address;

    const sqlUpdate = "UPDATE `tbl_token` SET `balance`=? WHERE `network`=? AND `username`=? AND `address`=?";

    try {
        await db.query(sqlUpdate, [balance, String(network), String(username).toLowerCase(), String(address)], (err) => {
            if (err) {
                res.status(500).send('Try again!');
            } else {
                res.status(201).json('Successfull token update!');
            }
        });
    } catch (e) {
        res.status(403).send('Server error!');
    }
});
//Update token
router.put('/newToken', verify, async (req, res) => {
    const stake = req.body.stake;
    const locktime = req.body.locktime;
    const xGrail = req.body.xGrail;
    const phase = req.body.phase;
    const network = req.body.network;
    const username = req.body.username;
    const address = req.body.address;

    const sqlUpdate = "UPDATE `tbl_token` SET `stake`=?,`locktime`=?,`xgrail`=?,`phase`=? WHERE `network`=? AND `username`=? AND `address`=?";

    try {
        await db.query(sqlUpdate, [stake, locktime, xGrail, phase, String(network), String(username), String(address).toLowerCase()], (err) => {
            if (err) {
                res.status(500).send('Try again!');
            } else {
                res.status(201).json('Successfull token update!');
            }
        });
    } catch (e) {
        res.status(403).send('Server error!');
    }
});

//Insert transaction
router.post('/newTransaction', verify, async (req, res) => {
    const title = req.body.title;
    const hash = req.body.hash;
    const from_address = req.body.from_address;
    const to_address = req.body.to_address;
    const for_token = req.body.for_token;
    const fee = req.body.fee;
    const time = req.body.time;
    const status = req.body.status;
    const username = req.body.username;
    const address = req.body.address;

    const sqlInsert = "INSERT INTO `tbl_transactions`(`title`, `hash`, `from_address`, `to_address`, `for_token`, `fee`, `time`, `status`, `username`, `address`) VALUES (?,?,?,?,?,?,?,?,?,?)";

    try {
        await db.query(sqlInsert, [title, hash, from_address, to_address, for_token, fee, time, status, username, address], (err) => {
            if (err) {
                if (err.errno === 1452) {
                    res.status(500).send('Please connect this wallet account to site!');
                } else {
                    res.status(500).send(err);
                }
            } else {
                res.status(201).json('Successfull transaction insertion!');
            }
        });
    } catch (e) {
        res.status(403).send('Server error!');
    }
});

//insert ido
router.post('/ido', verify, async (req, res) => {
    const paperUpload = multer({ storage: paperStorage }).any();

    paperUpload(req, res, async (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        const sqlInsert = 'INSERT INTO `tbl_ido`(`projectName`, `projectStatus`, `isFundRaise`, `raise`, `dox`, `purpose`, `otherPurpose`, `migration`, `planning`, `description`, `site`, `telegram`, `twitter`, `medium`, `discord`, `github`, `summary`, `paper`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        const data = JSON.parse(req.body.data);

        try {
            await db.query(sqlInsert, [data.projectName, data.projectStatus, data.isFundRaise, data.raise, data.dox, data.purpose, data.otherPurpose, data.migration, data.planning, data.description, data.site, data.telegram, data.twitter, data.medium, data.discord, data.github, data.summary, String(req.files[0].filename)], (err, result) => {
                if (err) {
                    res.status(403).send(err);
                    fs.unlink(req.files[0].path, (err) => {
                        if (err) {
                            return
                        }

                        //file removed
                    });
                } else {
                    res.status(201).json('Successfull ido insertion!');
                }
            })
        } catch (e) {
            res.status(403).send('Server error!');
        }
    });
});

//Update username
router.put('username', verify, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sqlUpdate = "UPDATE `tbl_users` SET `username`=? WHERE `password`=?";

    try {
        await db.query(sqlUpdate, [username, password], (err) => {
            if (err) {
                res.status(500).send('Try again!');
            } else {
                res.status(201).json('Username token update!');
            }
        });
    } catch (err) {
        res.status(403).send('Server error!');
    }
});

module.exports = router;
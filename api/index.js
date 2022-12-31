const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const mysql = require('mysql');
const { engine } = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const invetorRoute = require('./routes/investor');
const adminRoute = require('./routes/admin');
// const authRoute = require("./routes/auth");
// const userRoute = require("./routes/users");
// const movieRoute = require("./routes/movies");
// const listRoute = require("./routes/lists");

// const smsRoute = require("./routes/sms/Sms");
// const validateSmsRoute = require("./routes/sms/ValidateSms");
// const deleteSmsRoute = require("./routes/sms/DeleteSms");
// const insertUserRoute = require("./routes/user/InsetUser");
// const getUserRoute = require("./routes/user/GetUser");

dotenv.config();

app.use('/public', express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api/investor', invetorRoute);
app.use('/api/admin', adminRoute);
// app.use("/api/auth", authRoute)
// app.use("/api/users", userRoute);
// app.use("/api/movies", movieRoute);
// app.use("/api/lists", listRoute);


// app.use("/api/insertSms", smsRoute);
// app.use("/api/validateSms", validateSmsRoute);
// app.use("/api/deleteSms", deleteSmsRoute);
// app.use("/api/insertUser", insertUserRoute);
// app.use("/api/getUser", getUserRoute);

app.listen(8800, () => {
  console.log("backend is running!");
})

var db_config = {
  host: 'localhost',
  user: 'root',
  password: "",
  database: "grail",
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {              // The server is either down
    if (err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
    console.log("Connected!");            // process asynchronous requests in the meantime.
  });
  // If you're also serving http, display a 503 error.
  connection.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

// View engine setup
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('home');
});

app.post('/send', (req, res) => {
  const output = `
    <div style="
      background-color: #002a4c;
      padding: 20px;
      color: #fff;
    ">
      <h1>Your activation code</h1>
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
    to: "pirzadehmahdi1222@gmail.com", // list of receivers
    subject: "Activation Email ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
      return (
        res.status(400).send(error)
      )
    }

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.render('home', { msg: 'Email has been sent!!!' });
  });
});

handleDisconnect();
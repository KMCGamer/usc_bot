const nodemailer = require('nodemailer');
const db = require('../DBController.js');

function student(message, args) {
  message.author.send('I see you want to verify yourself as a student, can you please tell me your USC email address?');
  db.addUserToServer(message.guild.id, message.member.id);
  db.giveUserKeycode(message.guild.id, message.member.id);
}

// function verify(message) {
//   const database = require('../data/students.json');
//   const studentRole = message.guild.roles.find('name', 'Student');

//   // check if user already has student role
//   if (message.member.roles.get(studentRole.id)) {
//     message.channel.send('You already have the student role!');
//     return;
//   }

//   // check if the guildmember if already in the database and verified
//   if (database[message.author.id] && database[message.author.id].verified) {
//     message.member.addRole(studentRole).then(() => {
//       message.channel.send('You have been given the student role.');
//     });
//     return;
//   }

//   const commandArray = message.content.split(/ +/g);

//   // if the verify command contains a number, its a verify response.
//   if (!Number.isNaN(Number(commandArray[1]))) {
//     // If you type in a number but dont exist in the database. You get kicked out.
//     if (!database[message.author.id]) {
//       message.channel.send('You do not exist in our database. Please enter your full name with the !verify command. !help for more information.');
//       return;
//     }

//     // correct token
//     if (database[message.author.id].token === commandArray[1]) {
//       database[message.author.id].verified = true;
//       message.member.addRole(studentRole).then(() => {
//         message.channel.send('You have been given the student role.');
//       });

//       fs.writeFile('./data/students.json', JSON.stringify(database), 'utf8', (err) => {
//         if (err) {
//           console.log(err);
//         }
//       });
//       // incorrect token
//     } else {
//       message.channel.send('Incorrect token. Try again.');
//     }
//     return;
//   }

//   // check if the email is correct, (email.sc.edu).
//   if (!/^\w+@email.sc.edu$/.test(commandArray[1])) {
//     message.channel.send('Invalid email entry.');
//     return;
//   }

//   // TODO: check if the person has done this within the last hour

//   // check if the email is already verified in the database.
//   const guildMembers = Object.keys(database);
//   if (guildMembers.some((member) => {
//     if (database[member].email === commandArray[1] &&
//             database[member].verified === true) {
//       return true;
//     }
//     return false;
//   })) {
//     message.channel.send('This email is already taken and verified. Please contact an admin.');
//     return;
//   }

//   let randomNumber = '';
//   for (let i = 0; i < 4; i += 1) {
//     randomNumber += Math.floor(Math.random() * 10);
//   }

//   database[message.author.id] = {
//     email: commandArray[1],
//     token: randomNumber,
//     verified: false,
//   };

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'usc.cockbot@gmail.com',
//       pass: 'Gamecock2017',
//     },
//   });

//   const mailOptions = {
//     from: 'usc.cockbot@gmail.com',
//     to: commandArray[1],
//     subject: 'UoSC eSports Student Verification',
//     text: `Hello!\n\nEnter in this four digit key to authenticate yourself as a student in the discord server!\n\nVerification Number: ${database[message.author.id].token}\n\nTo verify yourself in the discord, type !verify followed by your 4 digit verification number.\n\nSee you on the rift, track, or battlefield!\n\nIf you feel this email was sent to you by mistake, please ignore this message.`,
//     html: `<html><p>Hello!</p>Enter in this four digit key to authenticate yourself as a student in the discord server!<p><p><b>Verification Number:</b> ${database[message.author.id].token}</p><p>To verify yourself in the discord, type !verify followed by your 4 digit verification number.</p><p>See you on the rift, track, or battlefield!</p><p>cock_bot</p><p><i>If you believe this email was sent to you on accident, ignore this message.</i></p></html>`,
//   };

//   transporter.sendMail(mailOptions, (error) => {
//     if (error) {
//       message.channel.send('Error sending email. Make sure you entered in your email address correctly.');
//     } else {
//       message.channel.send('Email sent. Check your school email for your verification code!');

//       fs.writeFile('./data/students.json', JSON.stringify(database), 'utf8', (err) => {
//         if (err) {
//           console.log(err);
//         }
//       });
//     }
//   });
// }

module.exports = student;

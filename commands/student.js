const nodemailer = require('nodemailer');
const db = require('../modules/dbcontroller.js');
const config = require('../config/config');

// Metadata
module.exports = {
  name: 'student',
  syntax: `${config.prefix}student`,
  description: 'Verify yourself as a student',
};

module.exports.run = (client, message, args) => {
  const studentRole = message.guild.roles.find('name', 'Student');

  // Check if user is already student in the database
  if (db.userIsStudent(message.guild, message.author)) {
    // Try and give the user the student role.
    message.channel.send('You already have the student role!');
    return;
  }

  db.addUserToGuild(message.guild, message.member);
  const keycode = db.giveUserKeycode(message.guild, message.member);

  message.author.send('I see you want to verify yourself as a student, can you please tell me your USC email address?').then(async (dm) => {
    const filter = m => /^\w+@(email|mailbox).sc.edu$/.test(m); // proper usc email syntax

    let recipient;
    try {
      recipient = await dm.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
      recipient = recipient.first().content;
    } catch (err) {
      console.log(err);
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.email.username,
        pass: config.email.password,
      },
    });

    const mailOptions = {
      from: config.email.username,
      to: recipient,
      subject: 'UoSC eSports Student Verification',
      html: `<html><p>Hello!</p>Enter in this four digit key to authenticate yourself as a student in the discord server!<p><p><b>Verification Number:</b> ${keycode}</p><p>To verify yourself in the discord, type !verify followed by your 4 digit verification number.</p><p>See you on the rift, track, or battlefield!</p><p>cock_bot</p><p><i>If you believe this email was sent to you on accident, ignore this message.</i></p></html>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        dm.channel.send('Error sending email. Make sure you entered in your email address correctly.');
      } else {
        dm.channel.send('Email sent. Check your school email for your verification code!').then(async (dm2) => {
          const keycodeFilter = m => m.toString() === keycode;
          try {
            recipient = await dm2.channel.awaitMessages(keycodeFilter, { max: 1, time: 60000, errors: ['time'] });
            db.makeUserStudent(message.guild, message.author);
            message.member.addRole(studentRole).then(() => {
              dm2.channel.send('You have been given the student role!');
            });
          } catch (err) {
            console.log(`error in keycode filter: ${err}`);
          }
        });
      }
    });
  });
};

// module.exports.verify = (client, message, args) => {
//   // check if the guildmember if already in the database and verified
//   if (database[message.author.id] && database[message.author.id].verified) {
//     message.member.addRole(studentRole).then(() => {
//       message.channel.send('You have been given the student role.');
//     });
//     return;
//   }

//   const commandArray = message.content.split(/ +/g);

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

// }

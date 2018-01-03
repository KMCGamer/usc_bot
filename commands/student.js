const nodemailer = require('nodemailer');
const db = require('../modules/dbcontroller.js');
const config = require('../config/config');
const dot = require('dot');
const fs = require('fs-extra');

// Metadata
module.exports = {
  name: 'student',
  syntax: `${config.prefix}student`,
  description: 'Verify yourself as a student.',
  help: 'In order to get the student role, you must verify you have a USC email address. Using the `student` command will initiaite a direct message session with the bot asking for your email address. Upon a correct email input, the bot will send a four digit keycode to your email. Respond back with the correct keycode and you will be given the student role in the guild.',
  usage: [
    `\`${config.prefix}student\` - Start the verification process for receiving a student role.`,
  ],
};

module.exports.run = async (client, message, args) => {
  const studentRole = message.guild.roles.find('name', 'Student');

  // Check if user is already student in the database
  if (db.userIsStudent(message.guild, message.author)) {
    // Try and give the user the student role.
    if (!message.member.roles.get(studentRole.id)) { // Check if the user doesnt have the student role
      message.member.addRole(studentRole).then(() => {
        message.react('✅');
        message.channel.send('You seem to already be verified in our database. You have been given the student role.').then((msg) => {
          msg.delete(10000); // Delete the message ten seconds
        });
      }).catch((err) => {
        message.react('💢');
        message.channel.send(err.message);
      });
      return;
    }

    message.channel.send('You already have the student role!');
    return;
  }

  db.addUserToGuild(message.guild, message.member);
  const keycode = db.giveUserKeycode(message.guild, message.member);

  message.author.send('I see you want to verify yourself as a student, can you please tell me your USC email address? I will accept either @email.sc.edu or @mailbox.sc.edu.').then(async (dm) => {
    const filter = (m) => { // Give the user some feedback.
      if (m.author.bot) { // Dont listen to bot messages
        return false;
      }
      if (/^\w+@(email|mailbox).sc.edu$/.test(m.content) && !db.isEmailTaken(m.content)) { // Correct email
        return true;
      }
      m.channel.send('Invalid email. Please try again.'); // Incorrect email
      return false;
    };

    let recipient;
    try {
      recipient = await dm.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] });
      recipient = recipient.first().content;
      db.giveUserEmail(message.guild, message.author, recipient);
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

    const rawHTML = await fs.readFile(`${__dirname}/../email/email.html`, 'utf8');
    const tempFn = dot.template(rawHTML);
    const result = tempFn({ keycode });

    const mailOptions = {
      from: config.email.username,
      to: recipient,
      subject: 'UoSC eSports Student Verification',
      html: result,
      text: `Thank you for verifying yourself as a student!\nVerification Code: ${keycode}\nTo verify yourself as a student, please respond back to the bot in a private message with the verification code above. This step will only be available for a short time. If you fail to verify your account, you will need to restart this process.\nIf you are not the intended recipient of this email, please contact soesports@gmail.com.`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        dm.channel.send('Error sending email. Please contact an admin.');
      } else {
        dm.channel.send('Email sent. Check your school email for your verification code! Check your spam folder if you can\'t find the email.').then(async (dm2) => {
          const keycodeFilter = (m) => { // Give the user some feedback
            if (m.author.bot) { // Dont listen to bot messages
              return false;
            }
            if (m.toString() === keycode) { // Correct keycode
              return true;
            }
            m.channel.send('Invalid keycode. Please try again.'); // Incorrect keycode
            return false;
          };
          try {
            recipient = await dm2.channel.awaitMessages(keycodeFilter, { max: 1, time: 600000, errors: ['time'] }); // about 10 minutes
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

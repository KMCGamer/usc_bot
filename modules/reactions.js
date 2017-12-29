/*
✅ (Success): A command completed succesfully with absolutely no errors.
❓ (Mistake): Malformed input? User typed something in wrong? Other user input issues.
🚫 (Restricted): The user is not allowed to do this command. User does not have proper permissions.
❌ (Error): The command did not execute properly due to a simple error that is supposed to be caught.
💢 (Debug): The bot broke because of this command. Completely unintentional error that needs to be debugged.
*/

module.exports = {
  success: '✅',
  mistake: '❓',
  restricted: '🚫',
  error: '❌',
  debug: '💢',
  trash: '🗑️',
  one: '1⃣',
  two: '2⃣',
  three: '3⃣',
  four: '4⃣',
  x: '🇽',
};

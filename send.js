// const Nexmo = require('nexmo')
// const nexmo = new Nexmo({
//   apiKey: '192b1a40',
//   apiSecret: 'Mrne9k7i2xcB3lgs'
// })
// const from = 'Lapor Mama Hacktiv8'
// const to = '+6281219593553'
// const text = 'Anak anda cabut sumpah'

// nexmo.message.sendSms(from, to, text, (err, responseData) => {
//   if (err) {
//     console.log(err);
//   } else {
//     if (responseData.messages[0]['status'] === "0") {
//       console.log("Message sent successfully.");
//     } else {
//       console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//     }
//   }
// })
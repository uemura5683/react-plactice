export default function handler(req, res) {  
    // if(req.method === 'POST') {
    //   const sgMail = require('@sendgrid/mail');
    //   sgMail.setApiKey(process.env.GRID_API_KEY);
    //   const msg = {
    //     to: req.email,
    //     from: process.env.FROM,
    //     subject: 'お問合せありがとうございました。',
    //     text: 'お問合せを受け付けました。回答をお待ちください。' + req.body,
    //     html: 'お問合せを受け付けました。回答をお待ちください。' + req.body,
    //   };
    //   (async () => {
    //     try {
    //       await sgMail.send(msg);
    //     } catch (error) {
    //       console.error(error);
    //       if (error.response) {
    //         console.error(error.response.body)
    //       }
    //     }
    //   })();
    // }
    // res.status(200)
}
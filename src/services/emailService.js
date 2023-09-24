require('dotenv').config();
import nodemailer from "nodemailer";



let sendSimpleEmail= async (dataSend)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD
        },
        
      });   
      let info = await transporter.sendMail({
        from: '"MediHEAL 👻" <buiduclan000@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
        html: getBodyHTMLEmail(dataSend)
      });
}

let getBodyHTMLEmail = (dataSend)=>{
  let result = '';
  if (dataSend.language==='vi'){
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên MediHeal</p>
    <p>Thông tin đặt lịch khám bệnh: </p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    
    <p>Nếu các thông tin trên là đúng, vui lòng click vào đường link bên dưới 
    để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
    <div>
        <a href=${dataSend.redirectLink} target="_blank"> Click here</a>
        </div>
        
        <div>Xin chân thành cảm ơn</div>`
  }
  if (dataSend.language === 'en') {
    result = `
    <h3>Hello ${dataSend.patientName}!</h3>
    <p>You have received this email because you have booked a appointment online on MediHeal</p>
    <p>Information about appointment: </p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>
    
    <p>If the information below is correct, please click on the link below to confirm and complete the appointment.</p>
    <div>
        <a href=${dataSend.redirectLink} target="_blank"> Click here</a>
        </div>
        
    <div>Thank you for using MediHeal</div>`
  }
  return result;
}


module.exports= {
    sendSimpleEmail: sendSimpleEmail
}
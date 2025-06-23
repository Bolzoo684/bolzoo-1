import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

// Email илгээх тохиргоо
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    if (!to) {
      console.warn('Email илгээхгүй: хаяг байхгүй');
      return false;
    }
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text
    });
    return true;
  } catch (error) {
    console.error('Email илгээхэд алдаа:', error.message);
    return false;
  }
};

// Урилгуудыг санах ойд хадгална
const invitations = {};

// Урилга үүсгэх
app.post('/api/invitations', (req, res) => {
  const { location, date, time, tableNumber, guestName, hostName, message, email } = req.body;
  const id = uuidv4();
  const createdAt = new Date().toISOString();
  const invitation = { 
    id, 
    location, 
    date, 
    time, 
    tableNumber, 
    guestName, 
    hostName, 
    message, 
    email,
    createdAt,
    response: null
  };
  invitations[id] = invitation;
  res.status(201).json({ id });
});

// Урилга авах
app.get('/api/invitations/:id', (req, res) => {
  const { id } = req.params;
  const invitation = invitations[id];
  if (!invitation) {
    return res.status(404).json({ error: 'Invitation not found' });
  }
  res.json(invitation);
});

// Урилгын хариулт хадгалах + Email илгээх
app.post('/api/invitations/:id/response', async (req, res) => {
  const { id } = req.params;
  const { response } = req.body; // 'accepted' эсвэл 'declined'
  
  const invitation = invitations[id];
  if (!invitation) {
    return res.status(404).json({ error: 'Invitation not found' });
  }
  
  invitation.response = response;
  invitation.responseDate = new Date().toISOString();
  
  // Email илгээх
  if (invitation.email) {
    const responseText = response === 'accepted' ? 'зөвшөөрсөн' : 'татгалзсан';
    const subject = `Урилгын хариу: ${invitation.guestName}`;
    const text = `🎉 ${invitation.guestName} таны урилгыг ${responseText}!\nОгноо: ${invitation.date}\nЦаг: ${invitation.time}\nГазар: ${invitation.location}`;
    await sendEmail(invitation.email, subject, text);
  }
  
  res.json({ success: true, response });
});

app.listen(port, () => {
  console.log(`Invitation backend listening on port ${port}`);
}); 
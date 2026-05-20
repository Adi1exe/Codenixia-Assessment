import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import logging

load_dotenv()

def send_lead_notification(name: str, email: str, company: str, message: str):
    sender_email = os.getenv("EMAIL_HOST_USER")
    sender_password = os.getenv("EMAIL_HOST_PASSWORD")
    
    if not sender_email or not sender_password:
        logging.warning("Email credentials not set. Skipping email notification.")
        return

    subject = f"Nexus Intel: New Lead Captured - {name}"
    
    text_body = f"""
    New Lead Received!
    
    Name: {name}
    Email: {email}
    Company: {company}
    Message: {message}
    
    Codenixia Nexus Automation Solutions Platform
    """

    html_body = f"""
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0; background-color: #070a0e; color: #e5e7eb; font-family: 'Inter', -apple-system, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #070a0e; padding: 40px 20px;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0d1118; border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(to right, rgba(13, 148, 136, 0.2), rgba(234, 88, 12, 0.2)); padding: 30px; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: center;">
                                <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Codenixia <span style="color: #2dd4bf;">Nexus</span></h1>
                                <p style="margin: 5px 0 0; color: #fb923c; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">System Alert: New Lead Captured</p>
                            </td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="padding-bottom: 20px;">
                                            <p style="margin: 0; font-size: 11px; text-transform: uppercase; color: #9ca3af; letter-spacing: 1px; font-weight: 600;">Lead Engineer (Name)</p>
                                            <p style="margin: 5px 0 0; font-size: 16px; color: #ffffff; font-weight: 500;">{name}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-bottom: 20px;">
                                            <p style="margin: 0; font-size: 11px; text-transform: uppercase; color: #9ca3af; letter-spacing: 1px; font-weight: 600;">Secure Comms (Email)</p>
                                            <p style="margin: 5px 0 0; font-size: 16px;"><a href="mailto:{email}" style="color: #2dd4bf; text-decoration: none;">{email}</a></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-bottom: 20px;">
                                            <p style="margin: 0; font-size: 11px; text-transform: uppercase; color: #9ca3af; letter-spacing: 1px; font-weight: 600;">Organization</p>
                                            <p style="margin: 5px 0 0; font-size: 16px; color: #ffffff; font-weight: 500;">{company or '<span style="color: #6b7280; font-style: italic;">Classified</span>'}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px;">
                                            <p style="margin: 0 0 10px; font-size: 11px; text-transform: uppercase; color: #9ca3af; letter-spacing: 1px; font-weight: 600;">Workflow Specifications</p>
                                            <p style="margin: 0; font-size: 15px; color: #d1d5db; line-height: 1.6;">{message}</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px; background-color: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
                                <p style="margin: 0; font-size: 12px; color: #6b7280;">Automated Transmission from Nexus Server Core.</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    """

    msg = MIMEMultipart('alternative')
    msg['From'] = sender_email
    msg['To'] = sender_email 
    msg['Subject'] = subject
    
    part1 = MIMEText(text_body, 'plain')
    part2 = MIMEText(html_body, 'html')
    
    msg.attach(part1)
    msg.attach(part2)

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        logging.info(f"Email notification sent for lead: {email}")
    except Exception as e:
        logging.error(f"Failed to send email: {str(e)}")
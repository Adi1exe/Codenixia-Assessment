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
    <body style="margin: 0; padding: 0; background-color: 
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: 
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: 
                        <!-- Header -->
                        <tr>
                            <td style="background: linear-gradient(to right, rgba(139, 92, 246, 0.2), rgba(14, 165, 233, 0.2)); padding: 30px; border-bottom: 1px solid rgba(255,255,255,0.05); text-align: center;">
                                <h1 style="margin: 0; color: 
                                <p style="margin: 5px 0 0; color: 
                            </td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px 30px;">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="padding-bottom: 20px;">
                                            <p style="margin: 0; font-size: 11px; text-transform: uppercase; color: 
                                            <p style="margin: 5px 0 0; font-size: 16px; color: 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-bottom: 20px;">
                                            <p style="margin: 0; font-size: 11px; text-transform: uppercase; color: 
                                            <p style="margin: 5px 0 0; font-size: 16px;"><a href="mailto:{email}" style="color: 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding-bottom: 20px;">
                                            <p style="margin: 0; font-size: 11px; text-transform: uppercase; color: 
                                            <p style="margin: 5px 0 0; font-size: 16px; color: 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 20px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px;">
                                            <p style="margin: 0 0 10px; font-size: 11px; text-transform: uppercase; color: 
                                            <p style="margin: 0; font-size: 15px; color: 
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 20px; background-color: rgba(0,0,0,0.2); border-top: 1px solid rgba(255,255,255,0.05); text-align: center;">
                                <p style="margin: 0; font-size: 12px; color: 
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
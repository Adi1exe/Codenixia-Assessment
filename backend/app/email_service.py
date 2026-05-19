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

    subject = f"New Automation Lead Captured: {name} from {company or 'Unknown Co'}"
    body = f"""
    New Lead Received!
    
    Name: {name}
    Email: {email}
    Company: {company}
    Message: {message}
    
    Codenixia Nexus Automation Solutions Platform
    """

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = sender_email # Sending to admin/self
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        logging.info(f"Email notification sent for lead: {email}")
    except Exception as e:
        logging.error(f"Failed to send email: {str(e)}")
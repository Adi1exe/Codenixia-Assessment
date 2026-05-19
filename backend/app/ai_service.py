import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

SYSTEM_INSTRUCTION = """
You are "Nexus AI", an elite consultant for 'Codenixia Nexus Automation Solutions'. 
Your tone is professional, extremely sharp, tech-forward, and helpful. 
Your goal is to answer questions about business automation, AI integrations, and streamlining workflows. 
CRITICAL RULE: If a user asks about custom automation, enterprise pricing, or setting up a specific workflow, you MUST strongly encourage them to "fill out the lead capture form on the left" so an expert human engineer can connect with them. Do not promise to build the system yourself.
"""

def generate_chat_response(history, new_message: str) -> str:
    try:
        # Convert our history format to Gemini's format
        formatted_history = []
        for msg in history:
            role = "user" if msg.role == "user" else "model"
            formatted_history.append({"role": role, "parts": [msg.content]})
        
        model = genai.GenerativeModel(
            model_name='gemini-1.5-flash',
            system_instruction=SYSTEM_INSTRUCTION
        )
        
        chat = model.start_chat(history=formatted_history)
        response = chat.send_message(new_message)
        return response.text
    except Exception as e:
        return f"System Error: Unable to process request at this time. Please ensure the API key is configured. ({str(e)})"
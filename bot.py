import openai
import json
import time

class Bot:

    def authenticate():
        with open("api_keys/api_keys.json", "r") as f:
            json_data = json.load(f)
        openai.api_key = json_data["openai_api_key"]
        

    def response(chatbot, chat_state):
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=chat_state
        )
        chatbot[-1][1] = completion.choices[0].message.content

        time.sleep(1)
        return chatbot, chat_state + [{"role":"assistant", "content": completion.choices[0].message.content}]


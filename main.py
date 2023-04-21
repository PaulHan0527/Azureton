import gradio as gr
import json
import time
# import openai


# Authentication Function
# def authenticate():
#     with open("api_keys/api_keys.json", "r") as f:
#         json_data = json.load(f)
#     openai.api_key = json_data["openai_api_key"]
    
         
def respond(message, chatbot):
    bot_message = "Hi"
    chatbot.append((message, bot_message))
    time.sleep(0.5)
    return "", chatbot

# Main Function
if __name__ == "__main__":
    # Authenticate to any packages/apis
    # authenticate()
    
    with gr.Blocks() as demo:
        chatbot = gr.Chatbot()
        chat_state = gr.State([])           
        user_input = gr.Textbox(placeholder="메시지를 입력한 후 엔터를 눌려주세요.")
        
        user_input.submit(respond, inputs=[user_input, chatbot], outputs=[user_input, chatbot])

    demo.launch()
    

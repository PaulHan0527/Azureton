import gradio as gr
from temp.user import User
from temp.api_keys.bot import Bot

def demo_load(chatbot, chat_state):

    _, chatbot, chat_state = User.input("안녕하세요", chatbot, chat_state)
    chatbot, chat_state = Bot.response(chatbot, chat_state)
    return chatbot, chat_state   

# Main Function
if __name__ == "__main__":
    # Authenticate to any packages/apis
    Bot.authenticate()

    instruction_msg_list = ["너는 롯데백화점 직원이야. 사용자에게 친절하게 대해줘."]

    with gr.Blocks() as demo:
        chatbot = gr.Chatbot()
        chat_state = gr.State([{"role": "system", "content": instruction_msg_list[0]}])    
        user_input = gr.Textbox(placeholder="메시지를 입력한 후 엔터를 눌려주세요.")
        demo.load(demo_load, [chatbot, chat_state], [chatbot, chat_state])

        user_input.submit(User.input, inputs=[user_input, chatbot, chat_state], outputs=[user_input, chatbot, chat_state], queue=False).then(Bot.response, inputs=[chatbot, chat_state], outputs=[chatbot, chat_state])
    demo.launch()
    

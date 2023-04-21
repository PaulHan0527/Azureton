class User:
    def input(msg, chatbot, chat_state):
        chat_state = chat_state + [{"role": "user", "content": msg}]
        return "", chatbot + [[msg, None]], chat_state


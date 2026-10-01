import os
from dotenv import load_dotenv
from anthropic import Anthropic

def get_agent_response(text):
    load_dotenv()

    client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

    agent_response = []
    message = client.messages.create(
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": text,
            }
        ],
        model="claude-opus-5-5",
    )

    for block in message.content:
        if block.type == "text":
            agent_response.append(block.text)

    return ''.join(agent_response)
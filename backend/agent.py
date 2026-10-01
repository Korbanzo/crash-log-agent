import os
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()
prompt_instructions = open("prompt_instructions.txt").read()
client = Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

def get_agent_response(text):
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
        system=prompt_instructions
    )

    for block in message.content:
        if block.type == "text":
            agent_response.append(block.text)

    return ''.join(agent_response)
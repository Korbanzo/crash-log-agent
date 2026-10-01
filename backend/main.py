from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from agent import get_agent_response

app = FastAPI()
origins = ['http://localhost:5173']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.post("/api/request/")
def post_request():
    print("Post Request Successful.")

@app.get("/api/request/")
def get_request(body):
    agent_response = get_agent_response(body)
    print("Agent Response: " + agent_response)
    return agent_response

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)
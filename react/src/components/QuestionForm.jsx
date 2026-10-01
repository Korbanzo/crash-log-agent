import { useState, useRef } from 'react'
import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:8000/api/request'});

const formatResponse = () => {

}

const QuestionForm = () => {
    const textRef = useRef(null);

    const [agent_response, set_agent_response] = useState('Heya! Waiting on input...')
    const [post, setPost] = useState({
        body: ''
    });

    const handleInput = (event) => {
        setPost({body: textRef.current.value})
    }

    const postData = (event) => {
        textRef.current.value = "";
        event.preventDefault();
        api.post('/', {post}.post)
            .then(() => api.get(`?body=${{post}.post.body}`))
            .then(response => set_agent_response(response.data))
            .catch(err => console.error(err.response.data))
            .finally(() => console.log("POST request completed."));
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <p style={{width: '40vw', whiteSpace: 'pre-wrap'}}>{agent_response}</p>
            <form onSubmit={postData} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <input ref={textRef} onChange={handleInput} name="user_request" type="text" placeholder={"How can I help?"} style={{width: '40vw'}}/>
                <input type="submit" value={"Submit"}/>
            </form>
        </div>
    )
}

export default QuestionForm;
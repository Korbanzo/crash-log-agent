import { useState, useRef } from 'react'
import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:8000/api/request'});


// Handle line breaks (\n) and spacing ([x] x > 1)
const formatResponse = (text) => {
    const result = [];

    for (let i = 0; i < text.length; i++) {
        let check_break = text.slice(i, i + 7);
        let check_spacing = text.slice(i, i + 3);
        let number = text.charAt(i + 1);
        let isNumber = false;


        if (number > '0' && number < '9') {
            isNumber = true;
        }

        if (check_break === '[BREAK]') {
            console.log("Breaking da line")
            result.push(<br />);
            i += 6;
        } else if (check_spacing === `[${number}]` && isNumber === true) {
            console.log(`Spacing ${number} times`)
            const space_mem = []
            for (let j = 0; j < number; j++) {
                space_mem.push(<span>&nbsp;</span>)
            }
            result.push(<div>{...space_mem}</div>);
            i += 2;
        } else {
            result.push(<span>{text[i]}</span>)
        }
    }

    return result;
}

const QuestionForm = () => {
    const textRef = useRef(null);

    const [agent_response, set_agent_response] = useState([<p>Heya! Waiting on input...</p>])
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
            .then(response => formatResponse(response.data))
            .then(formatted_response => set_agent_response(formatted_response))
            .catch(err => console.error(err.response.data))
            .finally(() => console.log("POST request completed."));
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: '40vw'}}>
                {agent_response}
            </div>
            <form onSubmit={postData} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <input ref={textRef} onChange={handleInput} name="user_request" type="text" placeholder={"How can I help?"} style={{width: '40vw'}}/>
                <input type="submit" value={"Submit"}/>
            </form>
        </div>
    )
}

export default QuestionForm;
import { useState, useRef } from 'react'
import axios from 'axios'
import SurenessCircle from '../components/SurenessCirlce.jsx'

const api = axios.create({baseURL: 'http://localhost:8000/api/request'});

const QuestionForm = () => {
    const textRef = useRef(null);

    const [agent_response, set_agent_response] = useState([<p>Heya! Waiting on input...</p>])
    const [sureness, setSureness] = useState(0);
    const [post, setPost] = useState({
        body: '',
        log: ''
    });

    const handleInput = () => {
        setPost({body: textRef.current.value, log: {post}.post.log})
    }

    const handleFileUpload = (event) => {
        const reader = new FileReader();
        const uploaded_file = event.target.files[0];
        console.log(uploaded_file);
        reader.readAsText(uploaded_file);
        reader.onload = (e) => {
            console.log(e.target.result);
            setPost({body: {post}.post.body, log: e.target.result})
        }
    }

    const postData = (event) => {
        textRef.current.value = "";
        set_agent_response([<p>Processing...</p>]);
        event.preventDefault();

        if ({post}.post.body !== '') {
            api.post('/', {post}.post)
            .then(() => api.get(`?body=${{post}.post.body}&log=${{post}.post.log}`))
            .then(response => formatResponse(response.data))
            .then(formatted_response => {set_agent_response(formatted_response.slice(0, formatted_response.length - 3)); setSureness(formatted_response.slice(formatted_response.length - 3, formatted_response.length))})
            .catch(err => console.error(err.response.data))
            .finally(() => console.log("POST request completed."));
        } else {
            alert("Please ask a question before sumbitting");
        }
    }

    const formatResponse = (text) => {
        // Handle line breaks ([BREAK]) and spacing ([x] such that x > 1)

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
                result.push(<br />);
                i += 6;
            } else if (check_spacing === `[${number}]` && isNumber === true) {
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

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div className={"agent-response-wrapper"}>
                {agent_response}
            </div>
            <SurenessCircle number={sureness}/>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '20vh'}}>

                <form onSubmit={postData} method={"post"} encType={"multipart/form-data"}>
                    <input name="crash_log" type="file" onChange={handleFileUpload} accept=".log, .evtx, .xml, .txt, .csv"/>
                    <input ref={textRef} onChange={handleInput} name="user_request" type="text" placeholder={"How can I help?"} style={{width: '40vw'}}/>
                    <input type="submit" value={"Submit"}/>
                </form>
                <div>

                </div>
            </div>

        </div>
    )
}

export default QuestionForm;
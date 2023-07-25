import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

const MessageInput = ({send}:{send:(value:string)=>void}) => {
    const[value, setValue] = useState('')
    return (  
        <>
        <Input onChange={(e)=>setValue(e.target.value)} placeholder="type here..." value={value}/>
        <Button onClick={() => send(value) }>send</Button>
        </>
    );
}
 
export default MessageInput; 
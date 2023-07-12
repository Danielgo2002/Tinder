import { Box } from "@chakra-ui/react";

const Messages = ({messages}:{messages:string[]}) => {
    return ( <>
    {messages.map((message,index) =>
    <Box key={index}>{message }</Box>)}
    </> );
}
 
export default Messages;
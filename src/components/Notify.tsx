import { Alert, Snackbar } from "@mui/material";


export default function Notify (props){
    const { notify, setnotify} = props;
    return(
        <>
            <h1>teste</h1>
            <Snackbar>
                <Alert>

                </Alert>
            </Snackbar>
        </>
    )
}
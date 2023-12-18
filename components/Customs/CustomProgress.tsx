import * as React from 'react';
import CircularProgress, {
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useEffect} from "react";



interface IProps {
    onClose : () => void;
}

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number },
) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                className="text-black-primary"
                variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    className={"text-base-light"}
                >{`${Math.round(props.value / 20)}`}</div>
            </Box>
        </Box>
    );
}

export function CustomProgress({onClose} : IProps) {
    const [progress, setProgress] = React.useState(100);

    React.useEffect(() => {

            const timer = setInterval(() => {
                setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - 20 : 0));
            }, 1000);


        return () => {
            clearInterval(timer);
        };
    }, []);


    useEffect(() => {
        if(progress === 0) {
            onClose();
        }
    }, [progress]);


    return <CircularProgressWithLabel value={progress} />;
}
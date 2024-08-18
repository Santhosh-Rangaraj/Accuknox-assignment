import React from 'react';
import {
    Grid,
    Paper,
    Card,
    CardContent,
    Typography,
    IconButton,
    Box
} from "@mui/material";
import { IoClose } from "react-icons/io5";

const WidgetCard = ({ widget, onDelete }) => {
    return (
        <Grid item md={3} xs={12} sm={6}>
            <Paper elevation={4} sx={{ minWidth: '200px' }}>
                <Card sx={{ minHeight: "120px" }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>{widget.name}</Typography>
                        <IconButton
                            sx={{ minWidth: 'auto', padding: 0, color: 'black' }}
                            onClick={onDelete}
                        >
                            <IoClose />
                        </IconButton>
                    </Box>
                    <CardContent>
                        <Typography sx={{ fontWeight: 'bold' }}>{widget.content}</Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    );
};

export default WidgetCard;

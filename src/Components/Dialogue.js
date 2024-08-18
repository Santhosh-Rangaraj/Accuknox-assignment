import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, IconButton } from "@mui/material";
import { GrClose } from "react-icons/gr";

const WidgetDialog = ({ open, onClose, title, name, content, onNameChange, onContentChange, onSave }) => (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ background: 'skyblue' }}>
            {title}
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}>
                <GrClose />
            </IconButton>
        </DialogTitle>
        <DialogContent sx={{ minHeight: '450px' }}>
            <TextField
                required
                autoFocus
                margin="dense"
                label={title.includes('Widget') ? "Card Name" : "Section Name"}
                fullWidth
                variant="standard"
                value={name}
                onChange={onNameChange}
            />
            {title.includes('Widget') && (
                <TextField
                    required
                    margin="dense"
                    label="Card Content"
                    fullWidth
                    variant="standard"
                    value={content}
                    onChange={onContentChange}
                />
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onSave}>Confirm</Button>
        </DialogActions>
    </Dialog>
);

export default WidgetDialog;

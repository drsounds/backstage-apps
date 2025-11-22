import { useState, ChangeEvent } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    makeStyles,
} from '@material-ui/core';
import { CreateShiftInput } from '../../api/ShiftClient';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        width: 400,
    },
}));

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (shift: CreateShiftInput) => Promise<void>;
};

export const ShiftDialog = ({ open, onClose, onSubmit }: Props) => {
    const classes = useStyles();
    const [form, setForm] = useState<CreateShiftInput>({
        commitment_uri: '',
        duration_ms: 0,
        project_uri: '',
        worked: new Date().toISOString(),
        user_uri: '',
        tags: [],
        unit_amount: 500,
        currency: 'SEK',
        customer_uri: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]:
                name === 'duration_ms' || name === 'unit_amount'
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async () => {
        await onSubmit(form);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create Shift</DialogTitle>
            <DialogContent>
                <div className={classes.container}>
                    <TextField
                        label="Project URI"
                        name="project_uri"
                        value={form.project_uri}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="User URI"
                        name="user_uri"
                        value={form.user_uri}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Customer URI"
                        name="customer_uri"
                        value={form.customer_uri}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Commitment URI"
                        name="commitment_uri"
                        value={form.commitment_uri}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Duration (ms)"
                        name="duration_ms"
                        type="number"
                        value={form.duration_ms}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Worked (ISO Timestamp)"
                        name="worked"
                        value={form.worked}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Unit Amount"
                        name="unit_amount"
                        type="number"
                        value={form.unit_amount}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Currency"
                        name="currency"
                        value={form.currency}
                        onChange={handleChange}
                        fullWidth
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

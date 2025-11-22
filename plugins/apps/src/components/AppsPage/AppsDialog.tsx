import React, { useState, useEffect, ChangeEvent } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Grid,
} from '@material-ui/core';
import { CreateAppInput, App } from '../../api/AppsClient';

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (app: CreateAppInput) => Promise<void>;
    app?: App;
};

const initialApp: CreateAppInput = {
    slug: '',
    name: '',
    embed_url: '',
    description: '',
    released: '',
    user_uri: '',
    tags: [],
    icon_url: '',
    header_image_url: '',
    vendor_uri: '',
    category_uri: '',
    website_url: '',
};

export const AppsDialog = ({ open, onClose, onSubmit, app }: Props) => {
    const [form, setForm] = useState<CreateAppInput>(initialApp);

    useEffect(() => {
        if (app) {
            setForm(app);
        } else {
            setForm(initialApp);
        }
    }, [app, open]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setForm(prev => ({ ...prev, tags: value.split(',').map(t => t.trim()) }));
    };

    const handleSubmit = async () => {
        await onSubmit(form);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>{app ? 'Edit App' : 'Create App'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="slug"
                            label="Slug"
                            type="text"
                            fullWidth
                            value={form.slug}
                            onChange={handleChange}
                            disabled={!!app}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="dense"
                            name="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={form.name}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            type="text"
                            fullWidth
                            multiline
                            rows={3}
                            value={form.description}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="dense"
                            name="embed_url"
                            label="Embed URL"
                            type="text"
                            fullWidth
                            value={form.embed_url}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="dense"
                            name="website_url"
                            label="Website URL"
                            type="text"
                            fullWidth
                            value={form.website_url}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="dense"
                            name="icon_url"
                            label="Icon URL"
                            type="text"
                            fullWidth
                            value={form.icon_url}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="dense"
                            name="header_image_url"
                            label="Header Image URL"
                            type="text"
                            fullWidth
                            value={form.header_image_url}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="dense"
                            name="released"
                            label="Released Date"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            value={form.released}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            margin="dense"
                            name="tags"
                            label="Tags (comma separated)"
                            type="text"
                            fullWidth
                            value={form.tags.join(', ')}
                            onChange={handleTagsChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            margin="dense"
                            name="user_uri"
                            label="User URI"
                            type="text"
                            fullWidth
                            value={form.user_uri}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            margin="dense"
                            name="vendor_uri"
                            label="Vendor URI"
                            type="text"
                            fullWidth
                            value={form.vendor_uri}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            margin="dense"
                            name="category_uri"
                            label="Category URI"
                            type="text"
                            fullWidth
                            value={form.category_uri}
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    {app ? 'Save' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

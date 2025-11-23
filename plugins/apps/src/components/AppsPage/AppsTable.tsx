import { Table, TableColumn } from '@backstage/core-components';
import { App } from '../../api/AppsClient';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Button } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

type Props = {
    apps: App[];
    onEdit: (app: App) => void;
    onDelete: (slug: string) => void;
};

const AppsTableActions = ({ app, onEdit, onDelete }: { app: App; onEdit: (app: App) => void; onDelete: (slug: string) => void }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleClose();
        onEdit(app);
    };

    const handleDelete = () => {
        handleClose();
        onDelete(app.slug);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
                variant="outlined"
                color="primary"
                size="small"
                component={Link}
                to={`/app/${app.slug}`}
                style={{ marginRight: 8 }}
            >
                Open app
            </Button>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEdit}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </MenuItem>
            </Menu>
        </div>
    );
};

export const AppsTable = ({ apps, onEdit, onDelete }: Props) => {
    const columns: TableColumn<App>[] = [
        { title: 'Slug', field: 'slug' },
        { title: 'Name', field: 'name' },
        { title: 'Description', field: 'description' },
        { title: 'Vendor', field: 'vendor_uri' },
        { title: 'Category', field: 'category_uri' },
        {
            title: 'Actions',
            field: 'actions',
            render: (row: App) => (
                <AppsTableActions app={row} onEdit={onEdit} onDelete={onDelete} />
            ),
        },
    ];

    return (
        <Table
            title="Apps"
            options={{ search: true, paging: true }}
            columns={columns}
            data={apps}
        />
    );
};

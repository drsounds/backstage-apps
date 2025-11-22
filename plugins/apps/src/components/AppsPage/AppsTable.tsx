import { Table, TableColumn } from '@backstage/core-components';
import { App } from '../../api/AppsClient';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

type Props = {
    apps: App[];
    onEdit: (app: App) => void;
    onDelete: (slug: string) => void;
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
                <>
                    <IconButton onClick={() => onEdit(row)} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete(row.slug)} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </>
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

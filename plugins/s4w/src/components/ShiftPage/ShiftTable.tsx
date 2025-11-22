import { Table, TableColumn } from '@backstage/core-components';
import { Shift } from '../../api/ShiftClient';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

type Props = {
    shifts: Shift[];
    onEdit: (shift: Shift) => void;
    onDelete: (id: string) => void;
};

export const ShiftTable = ({ shifts, onEdit, onDelete }: Props) => {
    const columns: TableColumn[] = [
        { title: 'Project', field: 'project_uri' },
        { title: 'User', field: 'user_uri' },
        { title: 'Worked', field: 'worked' },
        { title: 'Duration (ms)', field: 'duration_ms', type: 'numeric' },
        { title: 'Amount', field: 'unit_amount', type: 'currency', currencySetting: { currencyCode: 'SEK' } },
        {
            title: 'Actions',
            field: 'actions',
            render: (rowData: any) => (
                <>
                    <IconButton onClick={() => onEdit(rowData as Shift)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => onDelete((rowData as Shift).id)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    const data = shifts.map(shift => ({
        ...shift,
    }));

    return (
        <Table
            title="Shifts"
            options={{ search: true, paging: true }}
            columns={columns}
            data={data}
        />
    );
};

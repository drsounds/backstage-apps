import { Table, TableColumn } from '@backstage/core-components';
import { Shift } from '../../api/ShiftClient';

type Props = {
    shifts: Shift[];
};

export const ShiftTable = ({ shifts }: Props) => {
    const columns: TableColumn[] = [
        { title: 'Project', field: 'project_uri' },
        { title: 'User', field: 'user_uri' },
        { title: 'Worked', field: 'worked' },
        { title: 'Duration (ms)', field: 'duration_ms', type: 'numeric' },
        { title: 'Amount', field: 'unit_amount', type: 'currency', currencySetting: { currencyCode: 'SEK' } },
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

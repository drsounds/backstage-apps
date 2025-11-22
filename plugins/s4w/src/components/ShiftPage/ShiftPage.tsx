import { useState } from 'react';
import {
    Content,
    ContentHeader,
    Header,
    Page,
    Progress,
    ResponseErrorPanel,
} from '@backstage/core-components';
import { Button } from '@material-ui/core';
import { useApi } from '@backstage/core-plugin-api';
import { useAsyncRetry } from 'react-use';
import { shiftApiRef } from '../../api/ShiftClient';
import { ShiftTable } from './ShiftTable';
import { ShiftDialog } from './ShiftDialog';

import { Shift } from '../../api/ShiftClient';

export const ShiftPage = () => {
    const shiftApi = useApi(shiftApiRef);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingShift, setEditingShift] = useState<Shift | undefined>(undefined);

    const { value, loading, error, retry } = useAsyncRetry(async () => {
        return await shiftApi.getShifts();
    }, []);

    const handleCreateShift = async (shift: any) => {
        if (editingShift) {
            await shiftApi.updateShift(editingShift.id, shift);
        } else {
            await shiftApi.createShift(shift);
        }
        setIsDialogOpen(false);
        setEditingShift(undefined);
        retry();
    };

    const handleEditShift = (shift: Shift) => {
        setEditingShift(shift);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingShift(undefined);
    };

    const handleDeleteShift = async (id: string) => {
        await shiftApi.deleteShift(id);
        retry();
    };

    if (loading) {
        return <Progress />;
    } else if (error) {
        return <ResponseErrorPanel error={error} />;
    }

    return (
        <Page themeId="tool">
            <Header title="Spacify for Workers" subtitle="Manage your shifts" />
            <Content>
                <ContentHeader title="Shifts">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Create Shift
                    </Button>
                </ContentHeader>
                <ShiftTable shifts={value || []} onEdit={handleEditShift} onDelete={handleDeleteShift} />
                <ShiftDialog
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                    onSubmit={handleCreateShift}
                    shift={editingShift}
                />
            </Content>
        </Page>
    );
};

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

export const ShiftPage = () => {
    const shiftApi = useApi(shiftApiRef);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { value, loading, error, retry } = useAsyncRetry(async () => {
        return await shiftApi.getShifts();
    }, []);

    const handleCreateShift = async (shift: any) => {
        await shiftApi.createShift(shift);
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
                <ShiftTable shifts={value || []} />
                <ShiftDialog
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onSubmit={handleCreateShift}
                />
            </Content>
        </Page>
    );
};

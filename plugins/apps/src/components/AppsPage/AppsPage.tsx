import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Content,
    ContentHeader,
    Header,
    Page,
    Progress,
    SupportButton,
} from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { appsApiRef, CreateAppInput, App } from '../../api/AppsClient';
import { useAsyncRetry } from 'react-use';
import { AppsTable } from './AppsTable';
import { AppsDialog } from './AppsDialog';
import { Button } from '@material-ui/core';

export const AppsPage = () => {
    const appsApi = useApi(appsApiRef);
    const {
        value: apps,
        loading,
        error,
        retry,
    } = useAsyncRetry(async () => {
        return await appsApi.getApps();
    }, []);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingApp, setEditingApp] = useState<App | undefined>(undefined);

    const handleCreateApp = () => {
        setEditingApp(undefined);
        setIsDialogOpen(true);
    };

    const handleEditApp = (app: App) => {
        setEditingApp(app);
        setIsDialogOpen(true);
    };

    const handleDeleteApp = async (slug: string) => {
        if (window.confirm('Are you sure you want to delete this app?')) {
            await appsApi.deleteApp(slug);
            retry();
        }
    };

    const handleSubmit = async (app: CreateAppInput) => {
        if (editingApp) {
            await appsApi.updateApp(editingApp.slug, app);
        } else {
            await appsApi.createApp(app);
        }
        retry();
    };

    if (loading) {
        return <Progress />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Page themeId="tool">
            <Header title="Apps" subtitle="Manage your apps">
                <SupportButton>A description of your plugin goes here.</SupportButton>
            </Header>
            <Content>
                <ContentHeader title="Apps List">
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/chord"
                        style={{ marginRight: '16px' }}
                    >
                        Create new app with AI
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleCreateApp}
                    >
                        Add external application
                    </Button>
                </ContentHeader>
                <AppsTable
                    apps={apps || []}
                    onEdit={handleEditApp}
                    onDelete={handleDeleteApp}
                />
                <AppsDialog
                    open={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                    onSubmit={handleSubmit}
                    app={editingApp}
                />
            </Content>
        </Page>
    );
};

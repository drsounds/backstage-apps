import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAsync } from 'react-use';
import { useApi } from '@backstage/core-plugin-api';
import { appsApiRef } from '../../api/AppsClient';
import { StitchApp } from '../StitchApp';
import { Progress, Content, Page } from '@backstage/core-components';

export const AppPage = () => {
    const { slug, '*': rest } = useParams();
    const navigate = useNavigate();
    const appsApi = useApi(appsApiRef);
    const params = rest ? rest.split('/') : [];

    const { value: app, loading, error } = useAsync(async () => {
        if (!slug) throw new Error('No slug provided');
        return await appsApi.getApp(slug);
    }, [slug]);

    if (loading) {
        return <Progress />;
    }

    if (error) {
        return (
            <Page themeId="tool">
                <Content>
                    <div>Error: {error.message}</div>
                </Content>
            </Page>
        );
    }

    if (!app) {
        return (
            <Page themeId="tool">
                <Content>
                    <div>App not found</div>
                </Content>
            </Page>
        );
    }

    const handleNavigate = useCallback((pathParts: string[]) => {
        // Construct new path: /app/<slug>/<pathParts>
        const newPath = `/app/${slug}/${pathParts.join('/')}`;
        navigate(newPath);
    }, [slug, navigate]);

    return (
        <Page themeId="tool">
            <Content noPadding>
                <StitchApp
                    app={{
                        ...app,
                        id: app.slug,
                        type: 'app',
                    }}
                    params={params}
                    uri={`stitch:app:${app.slug}:${params.join(':')}`}
                    onNavigate={handleNavigate}
                />
            </Content>
        </Page>
    );
};

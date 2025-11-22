import { DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import { createApiRef } from '@backstage/core-plugin-api';

export interface App {
    slug: string;
    name: string;
    embed_url: string;
    description: string;
    released: string;
    user_uri: string;
    tags: string[];
    icon_url: string;
    header_image_url: string;
    vendor_uri: string;
    category_uri: string;
    website_url: string;
}

export type CreateAppInput = App;

export interface AppsApi {
    getApps(): Promise<App[]>;
    createApp(app: CreateAppInput): Promise<App>;
    updateApp(slug: string, app: CreateAppInput): Promise<App>;
    deleteApp(slug: string): Promise<void>;
    getApp(slug: string): Promise<App>;
}

export const appsApiRef = createApiRef<AppsApi>({
    id: 'plugin.apps.service',
});

export class AppsClient implements AppsApi {
    private readonly discoveryApi: DiscoveryApi;
    private readonly fetchApi: FetchApi;

    constructor(options: { discoveryApi: DiscoveryApi; fetchApi: FetchApi }) {
        this.discoveryApi = options.discoveryApi;
        this.fetchApi = options.fetchApi;
    }

    private async getBaseUrl(): Promise<string> {
        return await this.discoveryApi.getBaseUrl('appify');
    }

    async getApps(): Promise<App[]> {
        const baseUrl = await this.getBaseUrl();
        const response = await this.fetchApi.fetch(`${baseUrl}/apps`);

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();
        return data.items;
    }

    async createApp(app: CreateAppInput): Promise<App> {
        const baseUrl = await this.getBaseUrl();
        const response = await this.fetchApi.fetch(`${baseUrl}/apps`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(app),
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return await response.json();
    }

    async updateApp(slug: string, app: CreateAppInput): Promise<App> {
        const baseUrl = await this.getBaseUrl();
        const response = await this.fetchApi.fetch(`${baseUrl}/apps/${slug}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(app),
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return await response.json();
    }

    async deleteApp(slug: string): Promise<void> {
        const baseUrl = await this.getBaseUrl();
        const response = await this.fetchApi.fetch(`${baseUrl}/apps/${slug}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
    }

    async getApp(slug: string): Promise<App> {
        const baseUrl = await this.getBaseUrl();
        const response = await this.fetchApi.fetch(`${baseUrl}/apps/${slug}`);

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return await response.json();
    }
}

import {
    createApiRef,
    DiscoveryApi,
    FetchApi,
} from '@backstage/core-plugin-api';

export interface Shift {
    commitment_uri: string;
    duration_ms: number;
    project_uri: string;
    worked: string; // timestamp
    user_uri: string;
    tags: string[];
    unit_amount: number;
    currency: string;
    customer_uri: string;
    id: string;
}

export type CreateShiftInput = Omit<Shift, 'id'>;

export interface ShiftApi {
    getShifts(): Promise<Shift[]>;
    createShift(shift: CreateShiftInput): Promise<Shift>;
    updateShift(id: string, shift: CreateShiftInput): Promise<Shift>;
    deleteShift(id: string): Promise<void>;
    getShift(id: string): Promise<Shift>;
}

export const shiftApiRef = createApiRef<ShiftApi>({
    id: 'plugin.s4w.shift',
});

export class ShiftClient implements ShiftApi {
    private readonly discoveryApi: DiscoveryApi;
    private readonly fetchApi: FetchApi;

    constructor(options: { discoveryApi: DiscoveryApi; fetchApi: FetchApi }) {
        this.discoveryApi = options.discoveryApi;
        this.fetchApi = options.fetchApi;
    }

    private async getBaseUrl(): Promise<string> {
        return await this.discoveryApi.getBaseUrl('s4w');
    }

    async getShifts(): Promise<Shift[]> {
        const baseUrl = await this.getBaseUrl();
        const response = await this.fetchApi.fetch(`${baseUrl}/shifts`);

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();
        return data.items;
    }

    async createShift(shift: CreateShiftInput): Promise<Shift> {
        const baseUrl = await this.getBaseUrl();
        const response = await this.fetchApi.fetch(`${baseUrl}/shifts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(shift),
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return await response.json();
    }

    async updateShift(id: string, shift: CreateShiftInput): Promise<Shift> {
        const baseUrl = await this.getBaseUrl();
        const response = await this.fetchApi.fetch(`${baseUrl}/shifts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(shift),
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return await response.json();
    }

    async deleteShift(id: string): Promise<void> {
        const baseUrl = await this.getBaseUrl();
        const response = await this.fetchApi.fetch(`${baseUrl}/shifts/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
    }

    async getShift(id: string): Promise<Shift> {
        const baseUrl = await this.getBaseUrl();
        const response = await this.fetchApi.fetch(`${baseUrl}/shifts/${id}`);

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return await response.json();
    }
}

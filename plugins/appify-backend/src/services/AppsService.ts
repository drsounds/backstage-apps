import {
    coreServices,
    createServiceFactory,
    createServiceRef,
    LoggerService,
} from '@backstage/backend-plugin-api';
import { NotFoundError } from '@backstage/errors';

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

export class AppsService {
    #logger: LoggerService;
    #storedApps: App[] = [];

    static create(options: { logger: LoggerService }) {
        return new AppsService(options.logger);
    }

    private constructor(logger: LoggerService) {
        this.#logger = logger;
    }

    async createApp(input: CreateAppInput): Promise<App> {
        const existing = this.#storedApps.find(a => a.slug === input.slug);
        if (existing) {
            throw new Error(`App with slug '${input.slug}' already exists`);
        }

        const newApp: App = { ...input };
        this.#storedApps.push(newApp);
        this.#logger.info('Created new app', { slug: input.slug });

        return newApp;
    }

    async updateApp(slug: string, input: CreateAppInput): Promise<App> {
        const index = this.#storedApps.findIndex(item => item.slug === slug);
        if (index === -1) {
            throw new NotFoundError(`No app found with slug '${slug}'`);
        }

        const updatedApp: App = { ...input, slug }; // Ensure slug matches ID
        this.#storedApps[index] = updatedApp;
        this.#logger.info('Updated app', { slug });

        return updatedApp;
    }

    async deleteApp(slug: string): Promise<void> {
        const index = this.#storedApps.findIndex(item => item.slug === slug);
        if (index === -1) {
            throw new NotFoundError(`No app found with slug '${slug}'`);
        }

        this.#storedApps.splice(index, 1);
        this.#logger.info('Deleted app', { slug });
    }

    async listApps(): Promise<{ items: App[] }> {
        return { items: Array.from(this.#storedApps) };
    }

    async getApp(slug: string): Promise<App> {
        const app = this.#storedApps.find(item => item.slug === slug);
        if (!app) {
            throw new NotFoundError(`No app found with slug '${slug}'`);
        }
        return app;
    }
}

export const appsServiceRef = createServiceRef<AppsService>({
    id: 'appify.apps',
    defaultFactory: async service =>
        createServiceFactory({
            service,
            deps: {
                logger: coreServices.logger,
            },
            async factory({ logger }) {
                return AppsService.create({ logger });
            },
        }),
});

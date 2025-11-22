import { mockServices } from '@backstage/backend-test-utils';
import { AppsService } from './AppsService';

describe('AppsService', () => {
    const logger = mockServices.logger.mock();
    let subject: AppsService;

    beforeEach(() => {
        subject = AppsService.create({ logger });
    });

    it('creates an app', async () => {
        const input = {
            slug: 'test-app',
            name: 'Test App',
            embed_url: 'https://example.com/embed',
            description: 'A test app',
            released: '2023-10-27T10:00:00Z',
            user_uri: 'spacify:user:123',
            tags: ['tag1', 'tag2'],
            icon_url: 'https://example.com/icon.png',
            header_image_url: 'https://example.com/header.png',
            vendor_uri: 'spacify:vendor:456',
            category_uri: 'spacify:category:789',
            website_url: 'https://example.com',
        };

        const created = await subject.createApp(input);
        expect(created).toEqual(input);

        const fetched = await subject.getApp(input.slug);
        expect(fetched).toEqual(input);
    });

    it('lists apps', async () => {
        const input = {
            slug: 'test-app-2',
            name: 'Test App 2',
            embed_url: 'https://example.com/embed',
            description: 'A test app',
            released: '2023-10-27T10:00:00Z',
            user_uri: 'spacify:user:123',
            tags: ['tag1', 'tag2'],
            icon_url: 'https://example.com/icon.png',
            header_image_url: 'https://example.com/header.png',
            vendor_uri: 'spacify:vendor:456',
            category_uri: 'spacify:category:789',
            website_url: 'https://example.com',
        };

        await subject.createApp(input);
        const { items } = await subject.listApps();
        expect(items).toHaveLength(1);
        expect(items[0]).toEqual(input);
    });
});

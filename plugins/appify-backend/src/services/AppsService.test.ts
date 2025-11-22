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

    it('updates an app', async () => {
        const input = {
            slug: 'test-app-update',
            name: 'Test App Update',
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
        const updatedInput = { ...input, name: 'Updated Name' };
        const updated = await subject.updateApp(input.slug, updatedInput);

        expect(updated).toEqual(updatedInput);
        const fetched = await subject.getApp(input.slug);
        expect(fetched.name).toBe('Updated Name');
    });

    it('deletes an app', async () => {
        const input = {
            slug: 'test-app-delete',
            name: 'Test App Delete',
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
        await subject.deleteApp(input.slug);

        await expect(subject.getApp(input.slug)).rejects.toThrow(
            `No app found with slug '${input.slug}'`,
        );
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

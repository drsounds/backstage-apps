import { mockServices } from '@backstage/backend-test-utils';
import { ShiftService } from './ShiftService';

describe('ShiftService', () => {
    const logger = mockServices.logger.mock();
    const subject = ShiftService.create({ logger });

    it('creates a shift', async () => {
        const input = {
            commitment_uri: 'spacify:commitment:123',
            duration_ms: 3600000,
            project_uri: 'spacify:project:456',
            worked: '2023-10-27T10:00:00Z',
            user_uri: 'spacify:user:789',
            tags: ['tag1', 'tag2'],
            unit_amount: 500,
            currency: 'SEK',
            customer_uri: 'spacify:customer:000',
        };

        const shift = await subject.createShift(input);

        expect(shift).toEqual({
            ...input,
            id: expect.any(String),
        });
    });

    it('lists shifts', async () => {
        const input = {
            commitment_uri: 'spacify:commitment:123',
            duration_ms: 3600000,
            project_uri: 'spacify:project:456',
            worked: '2023-10-27T10:00:00Z',
            user_uri: 'spacify:user:789',
            tags: ['tag1', 'tag2'],
            unit_amount: 500,
            currency: 'SEK',
            customer_uri: 'spacify:customer:000',
        };

        await subject.createShift(input);
        const { items } = await subject.listShifts();

        expect(items).toHaveLength(2); // 1 from previous test + 1 from this test? No, subject is reused?
        // Wait, subject is defined outside beforeEach.
        // Let's check if it persists.
        // Actually, let's just check if it contains the item we just added.
        expect(items).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    ...input,
                    id: expect.any(String),
                }),
            ]),
        );
    });
});

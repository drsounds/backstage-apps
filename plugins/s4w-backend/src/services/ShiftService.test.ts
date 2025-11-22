import { mockServices } from '@backstage/backend-test-utils';
import { ShiftService } from './ShiftService';

describe('ShiftService', () => {
    const logger = mockServices.logger.mock();
    let subject: ShiftService;

    beforeEach(() => {
        subject = ShiftService.create({ logger });
    });

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

    it('updates a shift', async () => {
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

        const created = await subject.createShift(input);
        const updatedInput = { ...input, duration_ms: 7200000 };
        const updated = await subject.updateShift(created.id, updatedInput);

        expect(updated).toEqual({
            ...updatedInput,
            id: created.id,
        });

        const fetched = await subject.getShift(created.id);
        expect(fetched.duration_ms).toBe(7200000);
    });

    it('deletes a shift', async () => {
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

        const created = await subject.createShift(input);
        await subject.deleteShift(created.id);

        await expect(subject.getShift(created.id)).rejects.toThrow(
            `No shift found with id '${created.id}'`,
        );
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

        expect(items).toHaveLength(1);
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

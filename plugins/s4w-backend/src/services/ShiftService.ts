import {
    coreServices,
    createServiceFactory,
    createServiceRef,
    LoggerService,
} from '@backstage/backend-plugin-api';
import { NotFoundError } from '@backstage/errors';
import { Expand } from '@backstage/types';
import crypto from 'node:crypto';

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
    id: string; // Internal ID
}

export type CreateShiftInput = Omit<Shift, 'id'>;

export class ShiftService {
    readonly #logger: LoggerService;
    readonly #storedShifts = new Array<Shift>();

    static create(options: { logger: LoggerService }) {
        return new ShiftService(options.logger);
    }

    private constructor(logger: LoggerService) {
        this.#logger = logger;
    }

    async createShift(input: CreateShiftInput): Promise<Shift> {
        const id = crypto.randomUUID();
        const newShift: Shift = {
            ...input,
            id,
        };

        this.#storedShifts.push(newShift);
        this.#logger.info('Created new shift', { id, user_uri: input.user_uri });

        return newShift;
    }

    async listShifts(): Promise<{ items: Shift[] }> {
        return { items: Array.from(this.#storedShifts) };
    }

    async getShift(id: string): Promise<Shift> {
        const shift = this.#storedShifts.find(item => item.id === id);
        if (!shift) {
            throw new NotFoundError(`No shift found with id '${id}'`);
        }
        return shift;
    }
}

export const shiftServiceRef = createServiceRef<Expand<ShiftService>>({
    id: 'shift.service',
    defaultFactory: async service =>
        createServiceFactory({
            service,
            deps: {
                logger: coreServices.logger,
            },
            async factory({ logger }) {
                return ShiftService.create({ logger });
            },
        }),
});

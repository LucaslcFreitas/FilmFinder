import { PercentagePipe } from './percentage.pipe';

describe('PercentagePipe', () => {
    let pipe: PercentagePipe;

    beforeEach(() => {
        pipe = new PercentagePipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should format number as percentage', () => {
        const formated = pipe.transform(30);
        expect(formated).toBe('30%');
    });

    it('should format a negative number', () => {
        const formated = pipe.transform(-30);
        expect(formated).toBe('-30%');
    });

    it('should dont format a non number', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formated = pipe.transform('a' as any);
        expect(formated).toBe('0%');
    });

    it('should handle null', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formated = pipe.transform(null as any);
        expect(formated).toBe('0%');
    });

    it('should handle undefined ', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formated = pipe.transform(undefined as any);
        expect(formated).toBe('0%');
    });
});

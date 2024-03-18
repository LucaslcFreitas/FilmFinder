import { AgePipe } from './age.pipe';

describe('AgePipe', () => {
    let pipe: AgePipe;

    beforeEach(() => {
        pipe = new AgePipe();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should format date string', () => {
        const formated = pipe.transform('1997-12-11T12:10:00.000Z');
        expect(formated).toBe(26);
    });

    it('should format date', () => {
        const formated = pipe.transform(new Date('1997-12-11T12:10:00.000Z'));
        expect(formated).toBe(26);
    });

    it('should handle empty date', () => {
        const formated = pipe.transform('');
        expect(formated).toBe(-1);
    });

    it('should handle null', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formated = pipe.transform(null as any);
        expect(formated).toBe(-1);
    });

    it('should handle undefined ', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formated = pipe.transform(undefined as any);
        expect(formated).toBe(-1);
    });
});

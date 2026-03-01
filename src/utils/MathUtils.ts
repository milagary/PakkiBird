export class MathUtils {
    static clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }

    static lerp(a: number, b: number, t: number): number {
        return a + (b - a) * t;
    }

    static random(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
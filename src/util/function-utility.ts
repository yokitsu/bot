export default class IFunctionUtil {
    /**
     * Check if anything is an function
     * @param fn The function
     * @returns A true/false statement if it is
     */
    public static isFunction(fn: Function): boolean {
        return (
            typeof fn === 'function'
        );
    }
};
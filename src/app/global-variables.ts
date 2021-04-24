

export class GlobalVariables {
    constructor () {
        setInterval(() => {
            GlobalVariables.nowTime = new Date();
        }, 1000);
    }
    public static nowTime: Date = new Date();
}

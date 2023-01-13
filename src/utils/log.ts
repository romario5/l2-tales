const prefix = 'Game:';

export default {
    info(...message : any[]) : void {
        console.log(prefix, ...message)
    },

    warn(...message : any[]) : void {
        console.warn(prefix, ...message)
    },

    error(...message : any[]) : void {
        console.error(prefix, ...message)
    }
}
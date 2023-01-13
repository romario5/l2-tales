let moveHandlers : ((dx: number, dy: number) => void)[] = []
let skillUseHandlers : ((button: string) => void)[] = []

let actionsMap : {[key: string] : () => void} = {} // Key is button, value is callback


document.addEventListener('keydown', event => {
    console.log(event)

    if (event.key === 'arrowUp') { // Up arrow
        for (let i = 0; i < moveHandlers.length; i++) {
            moveHandlers[i](0, -1);
        }
    } else if (event.key === 'arrowUp') { // Down arrow
        for (let i = 0; i < moveHandlers.length; i++) {
            moveHandlers[i](0, 1);
        }
    }
})



export default {
    onMove(handler : (dx: number, dy: number) => void) {
        moveHandlers.push(handler)
    },

    onSkillUse(handler: (button: string) => void) {
        skillUseHandlers.push(handler)
    },

    assignToButton(button: string, action: () => void) {
        actionsMap[button] = action
    },

    reset() {
        moveHandlers = []
        skillUseHandlers = []
        actionsMap = {}
    }
}
import {Store} from '../store.js'

export class Score {
    constructor () {
        this.pen = Store.sington().pen
    }

    render () {
        this.pen.font = '45px Arial'
        this.pen.fillStyle = '#000'
        this.pen.fillText(
            Store.sington().score,
            Store.sington().canvas.width*0.1,
            Store.sington().canvas.height*0.08
        )
    }
}
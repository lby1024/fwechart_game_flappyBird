import {Store} from '../store.js' 

export class StartBtn {
    constructor() {
        this.store = Store.sington()
        this.image = this.store.clothes.get('start_button')
        this.image_x = this.store.canvas.width/2-this.image.width/2
        this.image_y = this.store.canvas.height*0.4
        this.image_w = this.image.width
        this.image_h = this.image.height
    }
    render () {
        this.store.pen.drawImage(
            this.image,
            this.image_x,
            this.image_y,
            this.image_w,
            this.image_h
        )
    }
}
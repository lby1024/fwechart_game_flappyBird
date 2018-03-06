import {Store} from '../store.js' 

export class Land {

    constructor () {
        this.store = Store.sington()
        this.image = this.store.clothes.get('land')
        this.image_x = 0
        this.image_y = this.store.canvas.height-this.image.height
        this.image_w = this.image.width
        this.image_h = this.image.height
    }

    update () {
        this.image_x -= 2
    }
    
    check () {
        if(this.image_x<-this.image_w){
            this.image_x = 0
        }
    }
    render_and_update () {
        this.render()
        this.update()
        this.check()
    }

    render () {
        this.store.pen.drawImage(
            this.image,
            this.image_x,
            this.image_y,
            this.image_w,
            this.image_h
        )
        this.store.pen.drawImage(
            this.image,
            this.image_x+this.image.width,
            this.image_y,
            this.image_w,
            this.image_h
        )
    }
}
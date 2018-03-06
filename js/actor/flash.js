import {Store} from '../store.js' 

export class Flash {

    constructor () {
        this.store = Store.sington()
        this.image = this.store.clothes.get('flash')
        this.image_w = this.image.width/2
        this.image_h = this.image.height/3
        this.image_x = this.store.canvas.width/2-25
        this.image_y = this.store.canvas.height*0.5
        this.count = 0
    }

    update () {
        // 当n==1时出现,当n==0时消失(高度为0)
        this.count += 0.05
        if(this.count>2){
            this.count = 0
        }
        let n = parseInt(this.count)
        if (n==0) {
            this.image_h = 0
        } else {
            this.image_h = this.image.height/3
        }
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
    render_and_update () {
        this.render()
        this.update()
    }
}
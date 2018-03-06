import {Store} from '../store.js' 

export class Background {

    constructor () {
        this.store = Store.sington()
        this.image = this.store.clothes.get('background')
        this.image_x = 0
        this.image_y = 0
        this.image_w = this.image.width
        this.image_h = this.store.canvas.height
    }

    update () {
        // 每渲染一帧x坐标减1
        // 当x坐标小于-image_w时,瞬移回去==>>轮播图
        this.image_x -= 1
    }

    check () {
        if(this.image_x<-this.image_w){
            this.image_x = 0
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
        this.store.pen.drawImage(
            this.image,
            this.image_x+this.image.width,
            this.image_y,
            this.image_w,
            this.image_h
        )
    }
    render_and_update () {
        this.render()
        this.update()
        this.check()
    }
}
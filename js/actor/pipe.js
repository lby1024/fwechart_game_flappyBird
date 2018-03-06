import {Store} from '../store.js' 

export class Pipe {

    constructor () {
        
        this.store = Store.sington()
        this.image_pipe_up = this.store.clothes.get('pie_up')
        this.image_pipe_down = this.store.clothes.get('pie_down')
        this.image_x = this.store.canvas.width
        this.image_w = this.image_pipe_up.width
        this.image_h = this.image_pipe_up.height
        this.random_top()   //随机生成image_y
        this.can_add_pipe = true
        this.can_add_score = true
    }
    
    check_score_add () {
        let a = this.image_x+this.image_w
        let b = this.store.get_actor('bird').image_x
        if(a<b&&this.can_add_score==true){
            this.store.score++
            this.can_add_score = false
        }
    }

    random_top () {
        let top_min = this.store.canvas.height*0.09
        let top_max = this.store.canvas.height*0.48
        this.top = top_min + Math.random()*(top_max-top_min)
        this.image_y_pipe_up = this.top - this.image_h
        this.image_y_pipe_down = this.top + 150
    }

    update () {
        this.image_x -= 2
        
    }
    render () {
        this.store.pen.drawImage(
            this.image_pipe_up,
            this.image_x,
            this.image_y_pipe_up,
            this.image_w,
            this.image_h
        )
        this.store.pen.drawImage(
            this.image_pipe_down,
            this.image_x,
            this.image_y_pipe_down,
            this.image_w,
            this.image_h
        )
    }
    render_and_update () {
        this.render()
        this.update()
        this.check_score_add()
    }

}
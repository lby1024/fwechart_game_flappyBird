import {Store} from '../store.js' 

export class Bird {

    constructor () {
        this.store = Store.sington()
        this.image = this.store.clothes.get('birds')
        this.clipping_x_list = [9, 9+34+18, 9+34+18+34+18]
        this.clipping_x = this.clipping_x_list[0]
        this.clipping_y = 10
        this.clipping_w = 34
        this.clipping_h = 24
        this.image_x = this.store.canvas.width/2-17
        this.image_y = 0
        this.image_w = 34
        this.image_h = 24
        this.count = 0
        this.index = 0
        this.a = 0.098
        this.v = 0
    }
    play_music() {
      let hit = wx.createInnerAudioContext()
      hit.autoplay = true
      hit.src = 'music/hit.ogg'
    }
    render_update_action_0 () {
        this.render()
        this.update_0_1()
        this.check_action_0()
    }
    render_update_action_1 () {
        this.render()
        this.update_0_1()
        this.check_action_1()
    }
    render_update_action_2 () {
        this.render()
        this.update_2()
        this.check_action_2()
    }
    

    render () {
        this.store.pen.drawImage(
            this.image,
            this.clipping_x,
            this.clipping_y,
            this.clipping_w,
            this.clipping_h,
            this.image_x,
            this.image_y,
            this.image_w,
            this.image_h
        )
        
    }

    // 
    check_action_0 () {
        if(this.image_y>this.store.canvas.height*0.5){
            this.v = -5
        }
    }
    // 着地游戏结束&&最大飞行高度不超出屏幕
    check_action_1 () {
        this.check_between_land_and_sky()
        this.check_impack()
    }
    check_action_2 () {
        this.check_between_land_and_sky()
    }
    update_0_1 () {
        this.fly()
        this.fall()
    }
    update_2 () {
        this.fall()
    }

    fall () {
        this.v += this.a
        this.image_y += this.v
        
    }

    fly () {
        this.count += 0.2
        if(this.count>3){
            this.count = 0
        }
        this.index = parseInt(this.count)
        this.clipping_x = this.clipping_x_list[this.index]
    }
    check_impack () {
        let bird_boder = {
            top: this.image_y,
            bottom: this.image_y+this.image_h,
            left: this.image_x,
            right: this.image_x+this.image_w
        }
        this.store.get_actor('pipe').map(item=> {
            let pipe_up_border = {
                top: 0,
                bottom: item.top,
                left: item.image_x,
                right: item.image_x+item.image_w
            }
            let pip_down_border = {
                top: item.image_y_pipe_down,
                bottom: this.store.canvas.height,
                left: item.image_x,
                right: item.image_x+item.image_w
            }
            if(
                this.is_impack(bird_boder, pipe_up_border)||
                this.is_impack(bird_boder, pip_down_border)
            ){
                console.log('game over')

                this.store.action_number = 2
                if(this.store.can_play_music){
                    this.play_music()
                    this.store.can_play_music = false
                }
            }

        })
    }
    is_impack (a,b) {
        let is_impack = false
        // 如果a和b没有发生碰撞,return false
        if(
            a.top>b.bottom||
            a.left>b.right||
            a.bottom<b.top||
            a.right<b.left
        ){
            return false
        }else{
            return true
        }
    }
    // 确保在陆地和屏幕顶部之间
    check_between_land_and_sky () {
        let canvas_h = this.store.canvas.height
        let land_h = this.store.clothes.get('land').height
        let bird_h = this.image_h
        let h = canvas_h-land_h-bird_h
        // 如果触底game over
        if(this.image_y>h) {
            this.image_y = h
            this.v = 0
            this.store.action_number = 2
            if(this.store.can_play_music){
                this.play_music()
                this.store.can_play_music = false
            }
        }
        // 去报不飞到屏幕上方
        if(this.image_y<0) {
            this.image_y = 0
            this.v = 0
        }
    }
}
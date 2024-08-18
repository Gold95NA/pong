class Box
{
    constructor()
    {
        this.x = c.width/2
        this.y = c.height/2
        this.w = 100
        this.h = 100
        this.fill = `#999999`
        this.stroke = `#000000`
        this.vx = 0
        this.vy = 0
        this.dir = 1;
        this.type=0;
        this.target=`undefined`
        this.force=1;
        return this;
    }

    setProps(obj={})
    {
        for(let i in obj)
        {
            if(this[i] !== undefined)
            {
                this[i] = obj[i]
            }
        }
        return this;
    }

    draw()
    {
        ctx.save()
            ctx.translate(this.x, this.y)
            ctx.fillStyle = this.fill
            ctx.strokeStyle = this.stroke
            ctx.fillRect(0-this.w/2, 0-this.h/2, this.w, this.h)
            ctx.strokeRect(0-this.w/2, 0-this.h/2, this.w, this.h)
        ctx.restore()
    }

    debug()
    {
        ctx.save()
            ctx.translate(this.x, this.y)
            ctx.fillStyle = this.stroke;
            ctx.strokeStyle = this.stroke;
            ctx.fillRect(-5, -5, 10, 10)
            ctx.beginPath();
            ctx.moveTo(-this.w/2, -this.h/6)
            ctx.lineTo(this.w/2, -this.h/6)
            ctx.closePath()
            ctx.stroke();
            ctx.moveTo(-this.w/2, this.h/6)
            ctx.lineTo(this.w/2, this.h/6)
            ctx.closePath()
            ctx.stroke();
        ctx.restore()
    }

    move(_self=this)
    {
        var types=[]
        var moveMentType=[this.control, this.track]
        moveMentType[_self.type](_self);
       
    }
    control(_self)
    {
        _self.x += _self.vx;
        _self.y += _self.vy;
    }
 
    track(_self)
    {
        var dx = _self.target.x-_self.x;
        var dy = _self.target.y-_self.y;
        var dist = Math.sqrt(dy+dy*dx*dx);
        var rad = Math.atan2(dy,dx);
        _self.vy += Math.sin(rad)*_self.force;
        _self.y += _self.vy;
    }

    left(){return this.x - this.w/2}
    right(){return this.x + this.w/2}
    top(){return this.y - this.h/2}
    bottom(){return this.y + this.h/2}

    collide(obj)
    {
        if(
            this.right() > obj.left() &&
            this.left() < obj.right() &&
            this.bottom() > obj.top() &&
            this.top() < obj.bottom()
        )
        {
            return true
        }
        return false
    }

}
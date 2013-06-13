var ButtonsAPI = function(selector){
    this.selector = selector.selector;
    this.active = selector.active;
    this.buttons = [];
    this.currentPosition = {
        x:0,
        y:0
    };
    this.currentBtn = null;
    
    this.getButtons = function(){
        this.buttons = document.getElements(this.selector);
    }
    
    this.r = null;
    this.l = null;
    this.u = null;
    this.d = null;

    this.map = function(){
        this.buttons.each(function(b){
            var pos = b.getPosition();
            if(b.hasClass(this.active)){
                this.currentPosition = pos;
            }
        }.bind(this));
        
        var cp = this.currentPosition;
        
        var r = {
            el:null,
            len:10000000000
        };
        var l={
            el:null,
            len:10000000000
        };
        var u={
            el:null,
            len:10000000000
        };
        var d={
            el:null,
            len:10000000000
        };


        this.buttons.each(function(btn){
            var pos = btn.getPosition();
            if(btn.hasClass(this.active)){
                this.currentPosition = pos;
                this.currentBtn = btn;
            }else{
                var xdiff = pos.x - cp.x;
                var ydiff = pos.y - cp.y;
                var len = Math.round(Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5));
                var direction = '';
                if(pos.x>cp.x){
                    direction='r';
                    if(len<r.len){
                        r.len = len;
                        r.el = btn;
                    }
                }else if(pos.x<cp.x){
                    direction='l';
                    if(len<l.len){
                        l.len = len;
                        l.el = btn;
                    }
                }else{
                    
                }
                if(pos.y>cp.y){
                    direction+='d';
                    if(len<d.len){
                        d.len = len;
                        d.el = btn;
                    }
                }else if(pos.y<cp.y){
                    direction+='t';
                    if(len<u.len){
                        u.len = len;
                        u.el = btn;
                    }
                }
            }
        }.bind(this));
        
        if(r.el){
            r.el.addClass('neighbor');
            this.r = r.el;
        }
        if(l.el){
            l.el.addClass('neighbor');
            this.l = l.el;
        }
        if(u.el){
            u.el.addClass('neighbor');
            this.u = u.el;
        }
        if(d.el){
            d.el.addClass('neighbor');
            this.d = d.el; 
        }
    }

    this.navigate = function(dir){
        if(this.currentBtn){
            this.currentBtn.removeClass(this.active);
        }
        this.buttons.removeClass('neighbor');
        
        if(dir=='right' && this.r){
            this.r.addClass(this.active);
        }
        
        if(dir=='left' && this.l){
            this.l.addClass(this.active);
        }
        
        if(dir=='up' && this.u){
            this.u.addClass(this.active);
        }
        
        if(dir=='down' && this.d){
            this.d.addClass(this.active);
        }
        
        this.map();
        
    };

    
    this.start  = function(){
        this.getButtons();
        this.map();
    }
    this.sqr = function(x) {
        return x * x;
    };


}
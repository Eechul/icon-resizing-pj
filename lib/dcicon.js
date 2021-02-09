function DCIcon(options) {
    var self = this;
    self.$container =  $(options.container);
    self.$targetEl = $(options.el);
    self.$targetEl.addClass('dc-cusor center')
    self.$ctrlBorder = $('<div class="ctrl-border"/>');
    self.$ctrlBorder.append(self.$targetEl);
    $('body').append(self.$ctrlBorder);

    self.initPointer();
    self.initEvent();
}
DCIcon.prototype.initMoveXY = function() {
    self.ctrlPoint.tmoveX = 0;
    self.ctrlPoint.tmoveY = 0;
    self.ctrlPoint.moveX = 0;
    self.ctrlPoint.moveY = 0;
}

DCIcon.prototype.initEvent = function() {
    var self = this;
    $(window).mousemove(function(event) {
        if(self.ctrlPoint.active) {
            var cx = Number(self.$ctrlBorder.css('left').replace('px',''));
            var cy = Number(self.$ctrlBorder.css('top').replace('px',''));
            var cWidth = self.$targetEl.width();
            var cHeight = self.$targetEl.height();
            self.ctrlPoint.tmoveX = self.ctrlPoint.moveX;
            self.ctrlPoint.tmoveY = self.ctrlPoint.moveY;
            self.ctrlPoint.moveX = event.pageX;
            self.ctrlPoint.moveY = event.pageY;

            if(self.ctrlPoint.tmoveX != 0 && self.ctrlPoint.tmoveY != 0 ) {
                if(self.ctrlPoint.active === 'center') {
                    self.$ctrlBorder.css('left', cx + (self.ctrlPoint.moveX - self.ctrlPoint.tmoveX));
                    self.$ctrlBorder.css('top', cy + (self.ctrlPoint.moveY - self.ctrlPoint.tmoveY));
                }else if(self.ctrlPoint.active === 'leftTop') {
                    self.$ctrlBorder.css('left', cx + (self.ctrlPoint.moveX - self.ctrlPoint.tmoveX));
                    self.$ctrlBorder.css('top', cy + (self.ctrlPoint.moveY - self.ctrlPoint.tmoveY));
                    self.$targetEl.css('width', cWidth - (self.ctrlPoint.moveX - self.ctrlPoint.tmoveX));
                    self.$targetEl.css('height', cHeight - (self.ctrlPoint.moveY - self.ctrlPoint.tmoveY));
                } else if(self.ctrlPoint.active === 'leftBottom') {
                    self.$ctrlBorder.css('left', cx + (self.ctrlPoint.moveX - self.ctrlPoint.tmoveX));
                    self.$ctrlBorder.css('top', cy);
                    self.$targetEl.css('width', cWidth - (self.ctrlPoint.moveX - self.ctrlPoint.tmoveX));
                    self.$targetEl.css('height', cHeight + (self.ctrlPoint.moveY - self.ctrlPoint.tmoveY));
                } else if(self.ctrlPoint.active === 'rightTop'){
                    self.$ctrlBorder.css('left', cx);
                    self.$ctrlBorder.css('top', cy + (self.ctrlPoint.moveY - self.ctrlPoint.tmoveY));
                    self.$targetEl.css('width', cWidth + (self.ctrlPoint.moveX - self.ctrlPoint.tmoveX));
                    self.$targetEl.css('height', cHeight - (self.ctrlPoint.moveY - self.ctrlPoint.tmoveY));
                } else if(self.ctrlPoint.active === 'rightBottom') {
                    self.$ctrlBorder.css('left', cx);
                    self.$ctrlBorder.css('top', cy);
                    self.$targetEl.css('width', cWidth + (self.ctrlPoint.moveX - self.ctrlPoint.tmoveX));
                    self.$targetEl.css('height', cHeight + (self.ctrlPoint.moveY - self.ctrlPoint.tmoveY));
                }
            }
        }
     }).mouseup(function() {
        self.ctrlPoint.tmoveX = 0;
        self.ctrlPoint.tmoveY = 0;
        self.ctrlPoint.moveX = 0;
        self.ctrlPoint.moveY = 0;
        self.ctrlPoint.active = null;
     });

    self.$targetEl.mousedown(function() {
        self.ctrlPoint.active = 'center';
    });
    self.ctrlPoint.$leftTop.mousedown(function() {
        self.ctrlPoint.active = 'leftTop';
    });
    self.ctrlPoint.$rightTop.mousedown(function() {
        self.ctrlPoint.active = 'rightTop';
    });
    self.ctrlPoint.$rightBottom.mousedown(function() {
        self.ctrlPoint.active = 'rightBottom';
    });
    self.ctrlPoint.$leftBottom.mousedown(function() {
        self.ctrlPoint.active = 'leftBottom';
    });
}

DCIcon.prototype.initPointer = function() {
    var self = this;
    self.ctrlPoint = {
        active: null,
        tmoveX: 0,
        tmoveY: 0,
        moveX: 0,
        moveY: 0
    };
    var $base = $('<div class="ctrl-point dc-cusor point">');
    var psize = 10;
    $base.css('width', psize).css('height', psize);
    
    self.ctrlPoint.$leftTop = $base.clone().css('left', (psize / 2) * -1).css('top',  (psize / 2) * -1);
    self.ctrlPoint.$rightTop = $base.clone().css('right', (psize / 2) * -1).css('top',  (psize / 2) * -1);
    self.ctrlPoint.$rightBottom = $base.clone().css('right', (psize / 2) * -1).css('bottom', (psize / 2) * -1);
    self.ctrlPoint.$leftBottom = $base.clone().css('left', (psize / 2) * -1).css('bottom', (psize / 2) * -1);

    self.ctrlPoint.active = null;

    self.$ctrlBorder.append(self.ctrlPoint.$leftTop)
    self.$ctrlBorder.append(self.ctrlPoint.$rightTop)
    self.$ctrlBorder.append(self.ctrlPoint.$rightBottom)
    self.$ctrlBorder.append(self.ctrlPoint.$leftBottom)

}

var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
            
var keycode={
    UP:tvKey.KEY_UP,
    LEFT:tvKey.KEY_LEFT,
    RIGHT:tvKey.KEY_RIGHT,
    DOWN:tvKey.KEY_DOWN
};


displayLog = function(txt){
    document.id('listing').set('html', txt);
}
            
document.addEvent('domready',function(){
    var btnsObj = new ButtonsAPI({
        'selector' :'.button',
        'active':'active'
    });
    btnsObj.start();
                
    document.getElementById("anchor").focus();
    widgetAPI.sendReadyEvent();
    document.id('anchor').addEvent('keydown',function(e){
                   
        if(e.code==keycode.UP){
            btnsObj.navigate('up');
        }else if(e.code==keycode.LEFT){
            btnsObj.navigate('left');
        }else if(e.code==keycode.RIGHT){
            btnsObj.navigate('right');
        }else if(e.code==keycode.DOWN){
            btnsObj.navigate('down');
        }else if(e.code==tvKey.KEY_ENTER || e.code==13){
            
            
        }
        if(e.code==tvKey.KEY_RETURN){
            widgetAPI.sendReturnEvent();
        }
        
        
        displayLog(e.code);
        
    });
});

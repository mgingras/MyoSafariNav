(function(){

  Myo.start();
  Myo.lock();
  var hasFocus = false;

  var hasFocus = function(){
    console.dir(document);
    console.log(this + 'hasFocus: '+ document.hasFocus());
    return document.hasFocus();
  }.call();

  Myo.on('thumb_to_pinky', function(){
    if(!hasFocus){
      return;
    }
    if(!Myo.isLocked){
      resetTimeout();
      window.scrollBy(0,250);
      return;
    }

    Myo.vibrate('short');
    Myo.unlock();
    resetTimeout();

  });

  Myo.on('spread', function(){
    if(Myo.isLocked || !hasFocus){
      return;
    }
    window.scrollBy(0,-250);
    resetTimeout();
    return;
  });

  Myo.on('fist', function(){
    if(Myo.isLocked || !hasFocus){
      return;
    }
    location.reload();
  });

  Myo.on('wave_out', function() {
    if(Myo.isLocked || !hasFocus){
      return;
    }
    window.history.forward();
  });

  Myo.on('wave_in', function() {
    if(Myo.isLocked || !hasFocus){
      return;
    }
    window.history.back();
  });

  var timeout = undefined;
  function resetTimeout(){
    if(timeout){
      clearTimeout(timeout);
    }
    timeout = setTimeout(function(){
      Myo.lock();
      console.log('locked');
      Myo.vibrate('long');
    }, 3500);
  }

  Myo.on('arm_lost', function() {
    console.log('ARM LOST!!'); //WTF
  });

}).call(this);

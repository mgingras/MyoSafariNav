(function(){

  Myo.start();
  Myo.lock();
  var eventHappening = false;
  var hasFocus = false;

  var hasFocus = function(){
    console.dir(document);
    console.log(document.hasFocus());
    return document.hasFocus();
  }.call();

  Myo.on('pose', function(pose){
    if(eventHappening || Myo.isLocked || !hasFocus){
      return;
    }
    // console.log(pose);
    eventHappening = true;
    setTimeout(function(){
      eventHappening = false;
    }, 25);
  });

  Myo.on('thumb_to_pinky', function(){
    if(eventHappening || !hasFocus){
      return;
    }
    if(!Myo.isLocked){
      resetTimeout();
      window.scrollBy(0,200);
      return;
    }
    Myo.vibrate('short');
    Myo.unlock();
    resetTimeout();
  });

  Myo.on('spread', function(){
    if(eventHappening || Myo.isLocked || !hasFocus){
      return;
    }
    window.scrollBy(0,-200);
    resetTimeout();
    return;
  });

  Myo.on('arm_lost', function() {
    console.log('ARM LOST!!');
  });

  Myo.on('fist', function(){
    if(eventHappening || Myo.isLocked || !hasFocus){
      return;
    }
    location.reload();
  });

  Myo.on('wave_out', function() {
    if(eventHappening || Myo.isLocked || !hasFocus){
      return;
    }
    window.history.forward();
  });

  Myo.on('wave_in', function() {
    if(eventHappening || Myo.isLocked || !hasFocus){
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

}).call(this);

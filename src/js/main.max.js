(function() {
  var cap, p_cap, w_cap;

  cap = $('.cap');

  w_cap = cap.width();

  cap.height(w_cap * 0.1216);

  p_cap = cap.css("padding-left");

  p_cap = parseInt(p_cap);

  cap.css({
    "padding": p_cap
  });

  0;

}).call(this);

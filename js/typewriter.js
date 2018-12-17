// typewriter

// 3215287
// bertaec32@gmail.com
(function($, w, d, undefined) {

  function typewriter() {

    // Globals 
    var self = this, speed;
    function init(element, options) {
            // Set Globals
      var str;
      var indice = 0;

      self.options = $.extend( {}, $.fn.typewriter.options, options );
      $currentElement = $(element);
      elementStr = $currentElement.html().replace(/\s+/g, ' ');
      dataSpeed  = $currentElement.data("speed") || self.options.speed;
      $currentElement.empty();
      var txt = "";
      var html_symbols = "</>";
      var showText = setInterval(
				function(){
					if (indice++ < elementStr.length) {
			      // $currentElement.append(elementStr[indice - 1]);
            txt += elementStr[indice - 1];
            if(!html_symbols.includes(elementStr[indice - 1])) $currentElement.html(txt);
			    }else{
            clearInterval(showText);
            $('.feature .typed-bar').addClass('hidden');
            $('.feature .bg-light:nth-child(odd)').addClass('_bounce_5');
            $('.feature .bg-light:nth-child(even)').addClass('_bounce_reverse_5');
			    }
				}, dataSpeed);
      // self.animation = setInterval(function(){animate_calification()}, 20);
    }

    // Metodos publicos
    return {
      init: init
    }
  }

  // Plugin jQuery
  $.fn.typewriter = function(options) {
    return this.each(function () {
    	var writer =  new typewriter();
      writer.init(this, options);
      $.data( this, 'typewriter', writer);
    });
  };

  $.fn.typewriter.options = {
    'speed' : 300
  };

})(jQuery, window, document);
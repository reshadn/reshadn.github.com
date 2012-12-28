/**
* jGrow
* jGrow is a jQuery plug-in that makes the textarea adjust its size according to the length of the text.
* @requires jQuery v1.2.3 or later
* @version 0.3.2
* @author Berker Peksag http://lab.berkerpeksag.com/jGrow
* 
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
*/

(function($) {

	//jGrow:
	$.fn.jGrow = function(settings) {
		var settings = $.extend({}, $.fn.jGrow.defaults, settings);
	
		this.each(function() {
			var $t = $(this);
			$t.css(settings);
			
			var height = $.browser.msie ? $t.innerHeight() : $t.css('height');
			var c_h = parseInt(height);

			settings.cache_height = c_h;
			init($(this), settings);
		}).keyup(function() {
			
			init($(this), settings);
		});
		
		function init(k, o) {
			var $t = k;
			var id = "jgrow-" + $t.attr("name");
			var h = $t.css("height");
			h = parseInt(h == "auto" ? "50px" : h);
			var l = $t.css("line-height");
			l = parseInt(l == "normal" ? "16px" : l);
			
			var v = $t.val().replace(/\n/g, "<br />");
				
			if (!$("#" + id).length) {
					
				$("<div/>").attr("id", id).css({
					"border": $t.css("border"),
					"font-family": $t.css("font-family"),
					"font-size": $t.css("font-size"),
					"font-weight": $t.css("font-weight"),
					"left": "-999px",
					"overflow": "auto",
					"padding": $t.css("padding"),
					"position": "absolute",
					"top": 0,
					"width": $t.css("width")
				}).html(v).appendTo("body");
					
			} else {
				$("#" + id).html(v);
			}
			
			var n_h = $.browser.msie ? parseInt($("#" + id).innerHeight()) : parseInt($("#" + id).css("height")) + l;
				
			if (n_h > parseInt(settings.max_height)) {
				$t.css({
					overflow: "auto", "height": (parseInt(settings.max_height) + l) + "px"
				});
			}else if (n_h > settings.cache_height) {
				$t.css("height", n_h + "px");
			}else {
				var cache_height = isNaN(settings.cache_height) ? 0 : settings.cache_height + 'px';
				$t.css("height", cache_height);
			}
		}
	};
	
	//Default configuration:
	$.fn.jGrow.defaults = {
		max_height  : "900px",
		resize      : "none",
		overflow    : "hidden",
		cache_height: 0
	};
	
	//Current version:
	$.fn.jGrow.version = '0.3.2';

})(jQuery);

$(function() {
	var success_container_width = $('#success-container').width();
	var success_container_height = $('#success-container').height();
	var success_width = $('.success-content').css('width');
	var horizontal = parseFloat(success_container_width) - parseFloat(success_width);
	var horizontal_divide = horizontal / 2;
	var success_height = $('.success-content').css('height');
	var vertical = parseFloat(success_container_height) - parseFloat(success_height);
	var vertical_divide = vertical / 2;

	$('.success-content').css({'position' : 'absolute', 'top' : vertical_divide + 'px', 'left': horizontal_divide + 'px'});
});
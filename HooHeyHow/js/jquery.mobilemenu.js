(function($){$.fn.mobileMenu=function(options){var defaults={defaultText:'Navigate to...',className:'select-menu',subMenuClass:'sub-menu',subMenuDash:'&ndash;'},settings=$.extend(defaults,options),el=$(this);this.each(function(){var $el=$(this),$select_menu;$el.find('ul').addClass(settings.subMenuClass);var $select_menu=$('<select />',{'class':settings.className+' '+ el.get(0).className}).insertAfter($el);$('<option />',{"value":'#',"text":settings.defaultText}).appendTo($select_menu);$el.find('a').each(function(){var $this=$(this),optText='&nbsp;'+ $this.text(),optSub=$this.parents('.'+ settings.subMenuClass),len=optSub.length,dash;if($this.parents('ul').hasClass(settings.subMenuClass)){dash=Array(len+1).join(settings.subMenuDash);optText=dash+ optText;}
$('<option />',{"value":this.href,"html":optText,"selected":(this.href==window.location.href)}).appendTo($select_menu);});$select_menu.change(function(){var locations=$(this).val();if(locations!=='#'){window.location.href=$(this).val();};});$('.select-menu').show();});return this;};})(jQuery);$(document).ready(function(){$('.sf-menu').mobileMenu();});
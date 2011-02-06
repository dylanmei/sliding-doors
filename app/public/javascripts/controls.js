;(function($) {
  var Watermark_Behavior = function(control) {
    if ($(control).data('watermark-behavior')) return;

    function find_label() {
      var label = null;
      var test = $(control).attr('id');
      var form = $(control).closest('form');
      $('label', form).each(function() {
        var selector = $(this).attr('for').toLowerCase();
        if (selector == test || selector + '_id' == test) {
          label = this; return false;
        }
      });

      return label;
    }

    function mark_textbox(label) {
      var text = $(label).remove().text();
      $(control).watermark(text);
    }

    function mark_selectbox(label) {
      var text = $(label).text();
      $(label)
        .addClass('watermark')
        .data('placeholder', text);
      $(control).before(label);

      $('option:empty', control).text(text);
      var selected = $('option:selected', control).first();
      if (selected && !selected.is('[value=""]')) {
        $(label)
          .removeClass('watermark')
          .text(selected.text());
      }
      $(control).change(function() {
        selected = $(':selected', this);
        if (selected.is('[value=""]')) {

          $(label)
            .addClass('watermark')
            .text($(label).data('placeholder'));
        }
        else {
          $(label)
            .removeClass('watermark')
            .text(selected.text());
        }
      });
    }

    var label = find_label();
    if (label) {
      $(control).data('watermark-behavior', 1);
      $(control).attr('title', $(label).text());
      if ($(control).is('input[type=text]')) mark_textbox(label);
      else if ($(control).is('input[type=password]')) mark_textbox(label);
      else if ($(control).is('select')) mark_selectbox(label);
    }
  };

  var Textbox_Decorator = function(container) {
    $('.text-wrap input', container).each(function() {
      if ($(this).data('textbox-behavior')) return;

      var wrap = $(this).closest('.text-wrap');
      if ($(this).is(':disabled')) wrap.addClass('disabled');
      if ($(this).is('.field_with_errors')) wrap.addClass('errors');

      new Watermark_Behavior(this);
      $(this)
        .data('textbox-behavior', 1)
        .focus(function() {
          if ($(this).is(':disabled')) return;
          wrap.addClass('active');
        })
        .blur(function() {
          if ($(this).is(':disabled')) return;
          wrap.removeClass('active');
        });
    });
  };

  var Selectbox_Decorator = function(container) {
    $('.select-wrap select', container).each(function() {
      if($(this).data('selectbox-behavior')) return;

      var wrap = $(this).closest('.select-wrap');
      if ($(this).is(':disabled')) wrap.addClass('disabled');
      if ($(this).is('.field_with_errors')) wrap.addClass('errors');

      new Watermark_Behavior(this);
      $(this)
        .data('selectbox-behavior', 1)
        .focus(function() {
          if ($(this).is(':disabled')) return;
          wrap.addClass('active');
        })
        .blur(function() {
          if ($(this).is(':disabled')) return;
          wrap.removeClass('active');
        });
    });
  };

  $(function() {
    $('form').each(function() {
      new Textbox_Decorator(this);
      new Selectbox_Decorator(this);
    });
  });

})(jQuery);


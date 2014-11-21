// This is a custom configuration file that will be used by BrowserCMS to load instances of 
// the CKEditor.
// As per http://docs.cksource.com/ckeditor_api/symbols/CKEDITOR.config.html#.customConfig using a custom config
// avoids the need to 'mask' the core default config.js file that CKEDITOR comes packaged with.

CKEDITOR.config.toolbar_CMS = [
  ['Source','-','Cut','Copy','Paste','PasteText','PasteFromWord','-','SpellChecker','Scayt','-','Undo','Redo','Find','Replace','RemoveFormat','-','NumberedList','BulletedList','Outdent','Indent','HorizontalRule'],
  '/',
  ['Link','Unlink','Anchor','Image','Table','SpecialChar','-','Bold','Italic','Underline','JustifyLeft','JustifyCenter','JustifyRight','JustifyFull','-','TextColor','Styles']
];

CKEDITOR.config.toolbar_CMSForms = [
	['Source','-','Cut','Copy','Paste','PasteText','PasteFromWord','-','SpellChecker','Scayt','-','Undo','Redo','Find','Replace','RemoveFormat','-','NumberedList','BulletedList','Outdent','Indent','HorizontalRule'],
  '/',
	['Link','Unlink','Anchor','Image','Table','SpecialChar','Bold','Italic','Underline','JustifyLeft','JustifyCenter','JustifyRight','JustifyFull','TextColor','Styles'],
	'/',
	['TextField','Select','Checkbox','Radio','Textarea','Button','ImageButton','HiddenField']
];

CKEDITOR.config.width = 598;
CKEDITOR.config.height = 400;
CKEDITOR.config.toolbar = 'CMS';

CKEDITOR.on('dialogDefinition', function(e){
  if (e.data.name == 'image') {
    e.data.definition.onLoad = function() {
      var url = this.getContentElement('info', 'txtUrl');
      var f = url.onChange;
      url.removeListener('change', url.onChange);
      $('#cke_61_textInput').addClass('typeahead');
      var images = new Bloodhound({limit: 10, datumTokenizer: Bloodhound.tokenizers.obj.whitespace('image'), queryTokenizer: Bloodhound.tokenizers.whitespace, remote: '/typeahead?t=image&q=%QUERY',});
      images.initialize();
      $('.cke_dialog_ui_input_text .typeahead').typeahead(null, {name: 'images', displayKey: 'value', source: images.ttAdapter()}).bind('typeahead:selected', function(obj, datum, name){url.onChange(f)});
      $('.cke_dialog_ui_input_text .tt-dropdown-menu').css({'width': '600px', 'margin-top': '12px', 'padding': '8px 0', 'background-color': '#fff', 'border': '1px solid #ccc', 'border': '1px solid rgba(0, 0, 0, 0.2)', '-webkit-border-radius': '8px', '-moz-border-radius': '8px', 'border-radius': '8px', '-webkit-box-shadow': '0 5px 10px rgba(0,0,0,.2)', '-moz-box-shadow': '0 5px 10px rgba(0,0,0,.2)', 'box-shadow': '0 5px 10px rgba(0,0,0,.2)'});
      $('.cke_dialog_ui_input_text.typeahead.tt-input').css({'width': '300px'});
    }
  } else if (e.data.name == 'link') {
    e.data.definition.onLoad = function() {
      var url = this.getContentElement('info', 'url');
      var f = url.onChange;
      url.removeListener('change', url.onChange);
      $('#cke_62_textInput').addClass('typeahead');
      var links = new Bloodhound({limit: 10, datumTokenizer: Bloodhound.tokenizers.obj.whitespace('image'), queryTokenizer: Bloodhound.tokenizers.whitespace, remote: '/typeahead?t=page&q=%QUERY',});
      links.initialize();
      $('.cke_dialog_ui_input_text .typeahead').typeahead(null, {name: 'links', displayKey: 'value', source: links.ttAdapter()}).bind('typeahead:selected', function(obj, datum, name){url.onChange(f)});
      $('.cke_dialog_ui_input_text .tt-dropdown-menu').css({'width': '600px', 'margin-top': '12px', 'padding': '8px 0', 'background-color': '#fff', 'border': '1px solid #ccc', 'border': '1px solid rgba(0, 0, 0, 0.2)', '-webkit-border-radius': '8px', '-moz-border-radius': '8px', 'border-radius': '8px', '-webkit-box-shadow': '0 5px 10px rgba(0,0,0,.2)', '-moz-box-shadow': '0 5px 10px rgba(0,0,0,.2)', 'box-shadow': '0 5px 10px rgba(0,0,0,.2)'});
      $('.cke_dialog_ui_input_text.typeahead.tt-input').css({'width': '300px'});
    }
  }
})

$(function() {
	$('.submit-order').click(function() {
		$('#order').validationEngine({
			inlineValidation: false,

			success: function() {		
				var inputs = $('form').serialize();

				$.ajax({
					type: 'POST',
					url: 'handlers/go.php',
					data: inputs,

					success: function(response) {
						if(response == 1) {
							$('#success-container').fadeIn(1000);
						}
					}
				});
			}
		});
	});

	var sessionID = $('input[name="session_id"]').val();

	$('#awesomejs_fileInput').uploadify({
		'uploader' : 'plugin/uploadify.swf',
		'script' : 'plugin/uploadify.php',
		'cancelImg' : false,
		'folder' : 'upload/' + sessionID,
		'buttonImg' : 'imgs/choose-files-bg.gif',
		'width' : '134',
		'height' : '30',
		'sizeLimit' : 52428800,
		'auto' : true,
		'fileDesc' : '.rar, .zip, .png, .pdf, .doc, .docx, .pages, .txt, .rtf, .jpg, .jpeg, .gif, .eps, .ai, .psd',
		'fileExt' : '*.rar; *.zip; *.png; *.pdf; *.doc; *.docx; *.pages; *.txt; *.rtf; *.jpg; *.jpeg; *.gif; *.eps; *.ai; *.psd',

		'onError' : function(event, queueID, fileObj) {
			alert('Error uploading ' + fileObj.name + ' Please restart your browser and try again (or email your files to gigs@awesomejs.com)');
		}, 

		'onComplete': function(event, queueID, fileObj, response, data) {
			$('<li title="Remove" id="' + fileObj.name + '" onclick="removeFile(this);">' + fileObj.name + '<input type="hidden" name="files[]" id="' + fileObj.name + '" value="' + response + '" /></li>').hide().appendTo('#filesUploaded').slideDown(500);
		}
	});

	$('.project-type-select').click(function() {
			$('.project-type-select').removeClass('selected');
			$('#'+this.id).addClass('selected');
			$('#projecttype_' + this.id).attr('checked', true);
	});

	$('div.psdto-type').click(function() {
		$('.selected_tick').removeClass('active');
		$('.psdto-type').removeClass('selectedsub');
		$(this).addClass('selectedsub');
		if(typeof document.body.style.maxHeight === "undefined") {}else{
			$('#'+this.id+' .selected_tick').addClass('active');
		}
		var id_name = this.id;
		id_name = id_name.replace(/js2/g, "js");
		$('#javascripttype_' + id_name).attr('checked', true);	
	});

	$('#location, #delivery, #javascript-library').sSelect();

	$("#project-desc").jGrow();

	$('#psdto-options').click(function() {
		$('.bringyourowncode-choose-option').slideUp(300);
		$('.psdto-choose-option').slideDown(350);
	});

	$('#bringyourowncode-options').click(function() {
		$('.psdto-choose-option').slideUp(300);
		$('.bringyourowncode-choose-option').slideDown(350);
	});

	$('#standalone').click(function() {
		$('.psdto-choose-option, .bringyourowncode-choose-option').slideUp(300);
	});
});

function removeFile(id) {
	var folder = $('#session_id').val();
	var filename = $(id).attr('id');

	$.ajax({
		type: 'POST',
		url: 'plugin/delete_file.php',
		data: 'filepath=/order/upload/' + folder + '/' + filename,

		success: function() {
			$(id).slideUp(300);
			$(id).find('input').remove();
		}
	});
}
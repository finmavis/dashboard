$(document).ready(function(){
	setInterval(function(){
    	moment().local();
    	var time = moment().format('H:mm');
    	$(".clock").text(time); 
  	}, 1000);

  	var date = moment().format('dddd, LL');
  	$(".date").text(date);
});

$(document).ready(function(){
	var vc = document.getElementById("visitor-chart").getContext('2d');
	var visitorChart = new Chart(vc, {
	    type: 'line',
	    data: {
	        labels: ["24/10/2017", "25/10/2017", "26/10/2017", "27/10/2017", "28/10/2017", "29/10/2017", "Yesterday"],
	        datasets: [{
	        	label: 'Mobile',
	            data: ['123', '23', '43', '654', '324', '311', '123'],
	            backgroundColor: [
	                'rgba(123, 208, 209, 0.3)'
	            ],
	            borderColor: [
	                'rgba(123, 208, 209, 1)'
	            ],
	            borderWidth: 1
	        	}, {
	        	label: 'Tablet',
	            data: ['45', '234', '445', '234', '363', '123', '534'],
	            backgroundColor: [
	                'rgba(176, 199, 129, 0.3)'
	            ],
	            borderColor: [
	                'rgba(176, 199, 129, 1)'
	            ],
	            borderWidth: 1
	        	}, {
	        	label: 'Desktop',
	            data: ['75', '12', '232', '253', '324', '654', '64'],
	            backgroundColor: [
	                'rgba(228, 117, 120, 0.3)'
	            ],
	            borderColor: [
	                'rgba(228, 117, 120, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
			responsive: true
	    }
	});
});

$(document).ready(function(){
	var bc = document.getElementById("browser-chart").getContext('2d');
	var browserChart = new Chart(bc, {
	    type: 'doughnut',
	    data: {
	        labels: ["Chrome", "Firefox", "IE/Edge", "Safari", "Opera"],
	        datasets: [{
       			data: [52, 36, 12, 32, 19],
       			backgroundColor: [
       				'rgb(217, 83, 79)', 'rgb(28, 175, 154)', 'rgb(66, 139, 202)', 'rgb(91, 192, 222)', 'rgb(66, 139, 202)'
       			],
       			borderColor: [
       				'rgba(255,99,132,1)'
       			],
       			borderWidth: 1
    		}],
	    },
	    options: {
			responsive: true,
			legend: {
				position: 'bottom',
				labels : {
					usePointStyle: true
				}
			},
			pieceLabel: {
			    render: 'percentage',
			    fontColor: '#000',
			    precision: 2
			}
	    }
	});
});

$(document).ready(function(){
	function searchCustom(){
		$("#data-content").DataTable().search(
        	$("#input-search").val()
    	).draw();
	}

	var oTable = $("#data-content").dataTable({
		"aoColumnDefs": [
			{'bSortable': false, 'aTargets':[0]}
       	],
       	"order": [[1, 'asc']],
		"sDom":"ltipr"
	});

	$("input.input-search").on('keyup click', function(){
        searchCustom();
    });
});

$(document).ready(function(){
	$('#modal-confirmation').modal('hide');
	
	$('button.trash').click(function(){
		$('.modal-name').text($(this).attr("data-name"));
		$('#delete-form').attr("action", $(this).attr("data-href"));
	});
	
	$('#modal-confirmation').on("hide.bs.modal", function(){
		$('.modal-name').text("");
		$('#delete-form').attr("action", "");
	});
});

// $(document).ready(function(){
// 	var end = moment();

// 	$('input[name="date"]').daterangepicker({
// 		autoUpdateInput: false,
// 		locale: {
// 			format: 'DD MMMM YYYY'
// 		},
// 		singleDatePicker: true,
//         showDropdowns: true,
//         maxDate: end
// 	});

// 	$('input[name="date"]').on('apply.daterangepicker', function(ev, picker) {
// 		$(this).val(picker.endDate.format('DD MMMM YYYY'));
//   	});

//   	$('input[name="date"]').on('cancel.daterangepicker', function(ev, picker) {
//   		$(this).val('');
//   	});
// });

$(document).ready(function(){
	$('.datepicker').datepicker({
		format: 'MM yyyy',
    	viewMode: 'years',
    	minViewMode: 'months',
    	maxViewMode: 'years',
    	orientation: 'bottom auto',
    	startView: 'years',
    	autoclose: true,
    	clearBtn: true
	});
});

$(document).ready(function(){
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = function(e) {
				$('.image-show').attr('src', e.target.result);
			}
			reader.readAsDataURL(input.files[0]);
			$('.img-name').text(input.files[0].name);
		}
	}

	function readURLMany(input) {
		if (input.files) {
			$('.img-preview').html('');
			var filesAmount = input.files.length;
			for (i = 0; i < filesAmount; i++) {
				var reader = new FileReader();
				reader.onload = function(e) {
					$('.img-preview').append('<figure><img class="image-show" src="' + e.target.result + '"></figure>');
				}
				reader.readAsDataURL(input.files[i]);
			}
		}
	}

	function showPreview(){
		$('.img-preview').css('display', 'block');
		$('.toolbar-img').css('display', 'block');
		$('.cancel').css('display', 'inline-block');
	}

	function hidePreview() {
		$('.img-preview').css('display', 'none');
		$('.toolbar-img').css('display', 'none');
		$('.cancel').css('display', 'none');
	}

	$("#file-upload").change(function() {
		showPreview();
		readURL(this);
	});

	$("#file-upload-many").change(function() {
		showPreview();
		readURLMany(this);
	});

	$('.cancel').on("click", function(e){
		e.preventDefault();
		hidePreview();
		$('.image-show').attr('src', '');
		$('.img-name').text('');
		$('#file-upload').val("");
	});

	function checkURLimage() {
		if ($('.image-show').attr('src')) {
			showPreview();
		} else {
			hidePreview();
		}
	}

	checkURLimage();

	$('.btn-change').click(function(e){
		e.preventDefault();
		$('.btn-change').css("display", "none");
		$('.form-group.change').css("display", "block");
		$('.changepass').val('true');
	});

	function PasswordValidation() {
		if ($('.new-password').val().length < 5 && $('.confirm-password').val().length < 5) {
			$('.error-text').css('display', 'block');
			$('.error-text').text("Use at least 6 characters");
			$('.btn-save').attr('disabled', 'disabled');
			return false;
		}
		if($('.new-password').val() != $('.confirm-password').val()) {
			$('.error-text').css('display', 'block');
			$('.error-text').text("These passwords don't match. Try again");
			$('.btn-save').attr('disabled', 'disabled');
			return false;
		}
		$('.error-text').css('display', 'none');
		$('.error-text').text("");
		$('.btn-save').removeAttr('disabled');
	}

	$('.new-password, .confirm-password').on('keyup', function(){
		PasswordValidation();
	});
});

$(document).ready(function(){
	function sendImageFile(file) {
		var data = new FormData();
		data.append('file', file);
		$.ajax({
			url: 'https://lin-cloned-finmavis.c9users.io/admin/posts/image',
            type: 'POST',
            contentType: false,
            cache: false,
            processData: false,
            dataType: 'JSON',
            data: data,
            success: function(result) {
            	if(result.success == true){
            		// $('#editor').summernote('insertImage', result.url);
            		var imageTemplateWithData = '<div class="image">\n' +
                								' <img src="' + result.url + '" data-image-zoom="' + result.url + '" alt="change with your image title">\n' +
                								' <div class="img-caption">\n' +
                								'  <p><small>Change with your image description</small></p>\n' +
                								' </div>\n' +
                								'</div>';
            		$('#editor').focus();
            		pasteHtmlAtCaret(imageTemplateWithData);
            	}
            	if(result.success == false){
            		$('#editor').summernote('insertText', 'An error detected, Unable to Upload File');
            	}
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus + " " + errorThrown);
            }
		});
	}

	function pasteHtmlAtCaret(html) {
	    var sel, range;
	    if (window.getSelection) {
	        // IE9 and non-IE
	        sel = window.getSelection();
	        if (sel.getRangeAt && sel.rangeCount) {
	            range = sel.getRangeAt(0);
	            range.deleteContents();

	            // Range.createContextualFragment() would be useful here but is
	            // non-standard and not supported in all browsers (IE9, for one)
	            var el = document.createElement("div");
	            el.innerHTML = html;
	            var frag = document.createDocumentFragment(), node, lastNode;
	            while ((node = el.firstChild)){
	                lastNode = frag.appendChild(node);
	            }
	            range.insertNode(frag);
	            
	            // Preserve the selection
	            if (lastNode) {
	                range = range.cloneRange();
	                range.setStartAfter(lastNode);
	                range.collapse(true);
	                sel.removeAllRanges();
	                sel.addRange(range);
	            }
	        }
	    } else if (document.selection && document.selection.type != "Control") {
	        // IE < 9
	        document.selection.createRange().pasteHTML(html);
	    }
	}

	var contentTemplate =	'<div class="work-content">\n' + 
							' <div class="container">\n' +
							'  <div class="row work-section">\n' + 
							'   <div class="col-sm-12 col-lg-10 col-lg-offset-1">\n' + 
							'    <p>Content Start Here</p>\n' +
							'   </div>\n' +
							'  </div>\n' +
							' </div>\n' +
							'</div>\n' + 
							'\n' +
							' ',
		imageTemplate = '<div class="image">\n' + 
						' <img src="IMAGE-URL-HERE" data-image-zoom="IMAGE-URL-HERE" alt="change with your image title">\n' +
						' <div class="img-caption">\n' + 
						'  <p><small>Change with your image description</small></p>\n' + 
						' </div>\n' + 
						'</div>\n' + 
						'\n' +
						' ',
		imageFullTemplate = '<div class="work-content">\n' +
							' <div class="container-fluid">\n' + 
							'  <div class="row work-section">\n' + 
							'   <div class="col-sm-12">\n' + 
							'    <div class="image">\n' + 
							'     <img src="IMAGE-URL-HERE" data-image-zoom="IMAGE-URL-HERE" alt="change with your Title of Image">\n' +
							'    </div>\n' + 
							'    <br>\n' + 
							'   </div>\n' + 
							'  </div>\n' + 
							' </div>\n' + 
							'</div>\n' + 
							'\n' +
							' ',
		videoTemplate =	'<div class="video">\n' +
						' <div class="video-content">\n' +
						'  <iframe src="VIDEO-URL-FRAME-HERE" frameborder="0" allowfullscreen></iframe>\n' +
						' </div>\n' +
						' <div class="video-caption">\n' +
						'  <p><small>Vivamus varius dui et quam ullamco</small></p>\n' +
						' </div>\n' +
						'</div> \n' +
						' '

	var contentButton = function (context) {
    	var ui = $.summernote.ui;
    	// create button
    	var button = ui.button({
        	contents: '<i class="fa fa-file-code-o"></i>',
        	tooltip: 'HTML Tag for Content',
        	click: function () {
            	$('#editor').summernote('pasteHTML', contentTemplate);
        	}
    	});
    	return button.render();
	}

	var imageButton = function (context) {
    	var ui = $.summernote.ui;
    	// create button
    	var button = ui.button({
        	contents: '<i class="fa fa-file-image-o"></i>',
        	tooltip: 'HTML Tag for Image',
        	click: function () {
            	// $('#editor').summernote('pasteHTML', imageTemplate);
            	$('#editor').focus();
            	pasteHtmlAtCaret(imageTemplate);
        	}
    	});
    	return button.render();
	}

	var imageFullButton = function (context) {
    	var ui = $.summernote.ui;
    	// create button
    	var button = ui.button({
        	contents: '<i class="fa fa-picture-o"></i>',
        	tooltip: 'HTML Tag for Image with Full Width',
        	click: function () {
            	$('#editor').summernote('pasteHTML', imageFullTemplate);
        	}
    	});
    	return button.render();
	}

	var videoButton = function (context) {
    	var ui = $.summernote.ui;
    	// create button
    	var button = ui.button({
        	contents: '<i class="fa .fa-file-video-o"></i>',
        	tooltip: 'HTML Tag for Video',
        	click: function () {
            	$('#editor').focus();
            	pasteHtmlAtCaret(videoTemplate);
        	}
    	});
    	return button.render();
	}

	$('#editor').summernote({
		minHeight: 250,
		focus: true,
		toolbar: [
			['style', ['style']],
			['fontstyle', ['bold', 'italic', 'underline', 'clear']],
			['fontsubp', ['strikethrough', 'superscript', 'subscript']],
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['table', ['table']],
			['hr', ['hr']],
			['insert', ['link', 'picture', 'video']],
			['height', ['height']],
			['mybutton', ['contentTag', 'imageTag', 'imageFullTag', 'videoButton']],
    		['tool', ['undo', 'redo', 'fullscreen', 'codeview']]
    	],
    	buttons: {
        	contentTag: contentButton,
        	imageTag: imageButton,
        	imageFullTag: imageFullButton,
        	videoTag: videoButton
    	},
    	callbacks: {
    		onPaste: function (e) {
    			var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
    			e.preventDefault();
    			setTimeout(function () {
    				document.execCommand('insertText', false, bufferText);
    			}, 10);
    		},
    		onImageUpload: function(files){
    			for (var i = 0; i < files.length; i++) {
    				sendImageFile(files[i]);
   				}
    		}
  		}
  	});
});
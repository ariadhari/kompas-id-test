window.multipleRules = [];
var validator;
var imgurl = $('#img_url').val();
var imgurl_lock = $('#img_url_lock').val();
var defimage = $('#img_default').val();

window.onload = function(){
	if($('#state').val() == 'add') {
		$('input[name="source"]:checked').trigger('change');
	}
};

$(function() {
	$(".fancybox").fancybox({
		width: '1062px',
		height: 'auto',
		autoDimensions: false,
		type: 'iframe',
		autoSize: false,
		iframe : {
			css : {
				width  : '1072px',
				height : '100%'
			}
		},                     
		clickSlide: false,
		clickOutside: false,
	});

	$('#publish_date_datetimepicker').datetimepicker({
		format: "YYYY-MM-DD HH:mm:ss",
		use24hours: true,
		autoclose: true,
		todayHighlight: true,
		buttons: {
			showToday: true,
			showClear: true
		},
		keyBinds: {
			'delete': function () {
				if(this.date() === null) {
					this.date(moment());
				}
				this.hide();
			},
			enter: function(){
				if(this.date() === null) {
					this.date(moment());
				}
				this.hide();
			}
		}
	});
	
	$('#start_date_datetimepicker').datetimepicker({
		format: "YYYY-MM-DD HH:mm:ss",
		use24hours: true,
		autoclose: true,
		todayHighlight: true,
		buttons: {
			showToday: true,
			showClear: true
		},
		keyBinds: {
			'delete': function () {
				if(this.date() === null) {
					this.date(moment());
				}
				this.hide();
			},
			enter: function(){
				if(this.date() === null) {
					this.date(moment());
				}
				this.hide();
			}
		}
	});
	
	$('#end_date_datetimepicker').datetimepicker({
		format: "YYYY-MM-DD HH:mm:ss",
		use24hours: true,
		autoclose: true,
		todayHighlight: true,
		buttons: {
			showToday: true,
			showClear: true
		},
		keyBinds: {
			'delete': function () {
				if(this.date() === null) {
					this.date(moment());
				}
				this.hide();
			},
			enter: function(){
				if(this.date() === null) {
					this.date(moment());
				}
				this.hide();
			}
		}
	});
	
	$('#start_date_datetimepicker').on('change.datetimepicker', function(e) {
		$('#end_date_datetimepicker').datetimepicker('clear')
		$('#end_date_datetimepicker').datetimepicker('minDate', e.date);
		$('#end_date_datetimepicker').datetimepicker('clear')
	});
	
	$("#channel").select2();
	$('#category_id').select2({
		placeholder: "Choose Category",
		allowClear: true,
		matcher: modelMatcher,
	});
	
	$("#category_id").on("change", function(e) {
		if($(this).val()) {
			$.ajax({
				type: "POST",
				url: HOST_URL+'/ajax/lock/generate-url-category',
				cache:false,
				data: {
					id: $(this).val(), 
				},
				success: function (data){
					$("#url_category").val(data);
				}
			});
		}
	});

	$('input[type=radio][name=source]').change(function() {
		resetForm();
	});
	
	if( $('#channel_val').val() ) {
		let tagsval = JSON.parse($('#channel_val').val());
		$('#channel').val(tagsval).trigger('change');
	}
	
	if( $('#object_val').val() ) {
		let objectval = JSON.parse($('#object_val').val());
		
		setForm(objectval, 1);
	}
	
	$.validator.addMethod('filesize', function(value, element, param) {
        param = param * 1024;
        return this.optional(element) || (element.files[0].size <= param);
    }, 'Ukuran file harus kurang dari {0} Kb');

    $.validator.addMethod('dimension', function(value, element, param) {
        if (element.files.length == 0) {
            return true;
        }

        var width = $(element).data('imageWidth');
        var height = $(element).data('imageHeight');
        if (width == param[0] && height == param[1]) {
            return true;
        } else {
            return false;
        }
    }, 'Please upload an image with {0} x {1} pixels dimension');

    $.each($.validator.methods, function(key, value) {
        $.validator.methods[key] = function() {
            if (arguments.length > 0) {
                arguments[0] = $.trim(arguments[0]);
            }

            return value.apply(this, arguments);
        };
    });
	
    const form = document.getElementById("form_lock");
    validator = $("#form_lock").validate({
        ignore: null,
		onfocusout: function(el) {
			if (!this.checkable(el)){
				this.element(el);
			}
		},
        rules: {
            title: {
				required: true,
				maxlength: 250,
			},
			summary: "required",
			publish_date: "required",
			image_upload: {
                required: function(element){
					return $("#image").val() == "";
				},
				accept: "image/jpg,image/jpeg,image/png",
                filesize: 2048 // 2 Mb
            },
			category_id: "required",
			url: {
				required: true,
				url: true
			},
            start_date: "required",
            end_date: "required",
            ordering: {
				required: true,
				digits: true
			},
            position: "required",
			'channel[]': "required",
			'platform[]': "required",
        },
        highlight: function(element) {
            $(element).closest('.form-control').addClass('is-invalid');
        },
        unhighlight: function(element) {
            $(element).closest(".form-control").removeClass("is-invalid");
        },
        errorPlacement: function(error, element) {
            error.addClass('fv-plugins-message-container');
			if(element.hasClass('select2') && element.next('.select2-container').length) {
				$(element).closest('.form-group').addClass('is-invalid');
				error.insertAfter(element.next('.select2-container'));
			} else if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else if (element.hasClass('select2')) {
                error.insertAfter(element.next('span'));
            } else if (element.attr("type") == "radio") {
                error.insertAfter(element.closest('div.radio-inline'));
            } else if (element.attr("type") == "checkbox") {
                error.insertAfter(element.closest('div.checkbox-inline'));
            } else if (element.attr("name") == "content") {
                error.insertAfter("div#cke_content");
            } else {
                error.insertAfter(element);
            }
        },
        errorElement: "div",
        errorClass : 'fv-help-block',
        messages: {
			source:{
				required: 'Source is required',
			},
            title:{
                required: 'Title is required.',
            },
			summary:{
                required: 'Summary is required.',
            },
			category_id:{
                required: 'Category is required.',
            },
			publish_date:{
                required: 'Publish Date is required.',
            },
			url:{
                required: 'Url is required.',
            },
			image_upload: {
                required: 'Image is required.',
            },
            start_date:{
                required: 'Start Date is required.',
            },
            end_date: {
                required: 'End Date is required.',
            },
            ordering: {
                required: 'Ordering is required.',
            },
            position: {
                required: 'Position is required.',
            },
			'channel[]': {
                required: 'Channel is required.',
            },
			'platform[]': {
                required: 'Choose platform for destkop, mobile, or both.',
            }
        },
        wrapper: 'div'
    });
	
	$("#button_submit").click(function(event) {
		event.preventDefault();
		if($("#form_lock").valid()) {
			$.ajax({
				type: "POST",
				url: HOST_URL + '/ajax/lock/check-channel',
				cache:false,
				data: $('#form_lock :not(input[name=_method])').serialize(),
				success: function (data) {				
					if(data.length > 0) {
						var arr = data[0].filter(function(elem, item, ary) { 
							return elem !== null && (!item || elem != ary[item - 1]);
						});
						$('<div class="fv-plugins-message-container">' +
							'<div class="fv-help-block">' +
								'The channel you entered <strong>(' + arr.toString() + ')</strong> is already being exists on <strong> Ordering : ' + $('#ordering').val() + '</strong>' +
							'</div>' +
						'</div>').appendTo('#msgerror');
						$('#channel').focus();
					} else {
						$('#form_lock').submit();
					}
				}
			});
		}
		return false;
	});
});

window.openArticle = function (url) {
	$('.fancybox').attr('href', url + '?source=' + $('input[name="source"]:checked').val()); 
	//$('.fancybox').fancybox().trigger('click'); 
}

window.addRules = function (rulesObj){
    rulesObj.forEach(function (value, i) {
        for (var item in value){
            $('#'+item+i).rules('add',value[item]);  
        }
    });
}

window.removeRules = function (rulesObj){
    rulesObj.forEach(function (value, i) {
        for (var item in value){
            $('#'+item+i).rules('remove');  
        }
    });
}

window.setForm = function (post, edit = null) {
	$('#title').val(post.title);
	$('#summary').val(post.summary);
	$('#publish_date').val(post.publish_date);
	$('#url').val(post.url);
	$('#category_id').val(post.category_id).trigger('change');
	$('#url_category').val(post.url_category);
	
	if(edit) {
		defimage = imgurl_lock + post.id + '/' + post.image;
	} else {
		var newDate = moment(post.publish_date).format("YYYY/MM/DD/");
	
		if($('input[name="source"]:checked').val() == 'BISNIS.COM') {
			defimage = imgurl + 'posts/' + newDate + post.id + '/' + post.image;
		} else {
			defimage = imgurl + 'plus/' + post.id + '/' + post.image;
		}
	}

	$("#view_image").attr("src", defimage);
	
	if(post.image) 
		$('#image').val(defimage);
}

window.resetForm = function () {
	$('#title, #summary, #publish_date, #image, #url, #url_category').val('');
	$('#category_id').val(null).trigger('change');
	$("#view_image").attr("src", $('#img_default').val());
}

window.modelMatcher = function (params, data) 
{
	data.parentText = data.parentText || "";
	if ($.trim(params.term) === '') {
		return data;
	}
	
	if (data.children && data.children.length > 0) {
		var match = $.extend(true, {}, data);
		for (var c = data.children.length - 1; c >= 0; c--) {
			var child = data.children[c];
			child.parentText += data.parentText + " " + data.text;

			var matches = modelMatcher(params, child);
			if (matches == null) {
				match.children.splice(c, 1);
			}
		}
		
		if (match.children.length > 0) {
			return match;
		}
		return modelMatcher(params, match);
	}
	
	var original = (data.parentText + ' ' + data.text).toUpperCase();
	var term = params.term.toUpperCase();

	if (original.indexOf(term) > -1) {
		return data;
	}
	
	return null;
}
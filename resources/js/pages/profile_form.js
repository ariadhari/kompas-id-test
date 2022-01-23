window.multipleRules = [];
var validator;

$(function() {
	$('#image_profile').change(function() {
        $('#image_profile').removeData('imageWidth');
        $('#image_profile').removeData('imageHeight');
        var file = this.files[0];
        var tmpImg = new Image();
        tmpImg.src = window.URL.createObjectURL(file);
        tmpImg.onload = function() {
            width = tmpImg.naturalWidth,
            height = tmpImg.naturalHeight;
            $('#image_profile').data('imageWidth', width);
            $('#image_profile').data('imageHeight', height);
        }
    });
	
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
	
	const form = document.getElementById("form_profile");
    validator = $("#form_profile").validate({
        ignore: null,
		onfocusout: function(el) {
			if (!this.checkable(el)){
				this.element(el);
			}
		},
        rules: {
            nama: {
				required: true,
				maxlength: 100,
			},
			email: {
				required: true,
				maxlength: 250,
				email: true,
				remote: {
                    url: HOST_URL + '/ajax/user/validate',
                    type: "post",
                    data: {
                        _token:  form.querySelector('[name="_token"]').value,
                        state: form.querySelector('[name="state"]').value,
                        id: form.querySelector('[name="id"]').value,
						column: 'email'
                    }
                }
			},
			nik: {
				maxlength: 15,
                required: true,
				remote: {
                    url: HOST_URL + '/ajax/user/validate',
                    type: "post",
                    data: {
                        _token:  form.querySelector('[name="_token"]').value,
                        state: form.querySelector('[name="state"]').value,
                        id: form.querySelector('[name="id"]').value,
						column: 'nik'
                    }
                }
			},
			telpon: {
				required: true,
				maxlength: 100,
			},
			aktif: "required",
			uportal: "required",
			username: {
				required: function() {
                    return true;
                },
				maxlength: 100,
				remote: {
                    url: HOST_URL + '/ajax/user/validate',
                    type: "post",
                    data: {
                        _token:  form.querySelector('[name="_token"]').value,
                        state: form.querySelector('[name="state"]').value,
                        id: form.querySelector('[name="id"]').value,
						column: 'username'
                    }
                }
			},
			password : {
				required: function() {
					if (form.querySelector('[name="state"]').value == 'add') {
						return true;
					}
					return false;
				},
				minlength : 8
			},
			password_confirm : {
				required: function() {
					if (form.querySelector('[name="state"]').value == 'add') {
						return true;
					}
					return false;
				},
				minlength : 8,
				equalTo : "#password"
			},
			image_profile: {
                accept: "image/jpg,image/jpeg,image/png",
                dimension: [250, 250],
                filesize: 60
            },
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
			nama:{
				required: 'Name is required',
			},
            email:{
                required: 'Title is required.',
				remote: 'The email you entered is already registered.'
            },
			nik:{
				remote: 'The nik you entered is already registered.'
            },
			telpon:{
                required: 'Phone is required.',
            },
			username:{
                required: 'Username is required.',
				remote: 'The username you entered is already registered.'
            },
        },
        wrapper: 'div'
    });

});

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
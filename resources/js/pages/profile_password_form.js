window.multipleRules = [];
var validator;

$(function() {
	const form = document.getElementById("form_password");
    validator = $("#form_password").validate({
        ignore: null,
		onfocusout: function(el) {
			if (!this.checkable(el)){
				this.element(el);
			}
		},
        rules: {
			old_password : {
				required: true,
				minlength : 5
			},
			password : {
				required: true,
				minlength : 5
			},
			password_confirm : {
				required: true,
				minlength : 5,
				equalTo : "#password"
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
			old_password:{
				required: 'Old Password is required.',
            },
			password:{
				required: 'New Password is required.',
            },
			password_confirm:{
				required: 'Confirmation password is required.',
                equalTo: 'Password confirmation does not match.',
            },
        },
        wrapper: 'div'
    });

});
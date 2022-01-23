window.multipleRules = [];
var validator;

$(function() {
    const form = document.getElementById("form_tag");
    validator = $("#form_tag").validate({
        ignore: null,
        rules: {
            tag:{
                required: true,
                maxlength: 250,
				remote: {
                    url: HOST_URL + '/ajax/tag/title',
                    type: "post",
                    data: {
                        _token:  form.querySelector('[name="_token"]').value,
                        state: form.querySelector('[name="state"]').value,
                        id: form.querySelector('[name="tag_id"]').value
                    }
                }
            },
            keyword: {
				required: true,
			},
			description: {
				required: true,
			}
        },
        highlight: function(element) {
            $(element).closest('.form-control').addClass('is-invalid');
        },
        unhighlight: function(element) {
            $(element).closest(".form-control").removeClass("is-invalid");
        },
        errorPlacement: function(error, element) {
            error.addClass('fv-plugins-message-container');
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent()); // radio/checkbox?
            } else if (element.hasClass('select2')) {
                error.insertAfter(element.next('span')); // select2
            } else if (element.attr("type") == "radio") {
                error.insertAfter(element.closest('div.radio-inline'));
            } else if (element.attr("name") == "content") {
                error.insertAfter("div#cke_content");
            } else {
                error.insertAfter(element); // default
            }
        },
        errorElement: "div",
        errorClass : 'fv-help-block',
		 errorElement: "div",
        errorClass : 'fv-help-block',
        messages: {
            tag:{
                required: 'Tag is required.',
                remote: 'The tag you entered is already registered.'
            },
            keyword: {
                required: 'Keywords is required.',
            },
			description: {
                required: 'Description is required.',
            },
        },
        wrapper: 'div'
    });
});
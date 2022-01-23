var FormValidation = function () {
    var validator;
    const form = document.getElementById("form_image");


    var _validate = function () {
        $.validator.addMethod('filesize', function(value, element, param) {
            param = param * 1024;
            return this.optional(element) || (element.files[0].size <= param);
        }, 'File size must be less than {0} Kb');

        $('#img_file').on('change', function() {
            $('#img_file').removeData('imageWidth');
            $('#img_file').removeData('imageHeight');
            var file = this.files[0];
            var tmpImg = new Image();
            tmpImg.src = window.URL.createObjectURL(file);
            tmpImg.onload = function() {
                width = tmpImg.naturalWidth,
                height = tmpImg.naturalHeight;
                $('#img_file').data('imageWidth', width);
                $('#img_file').data('imageHeight', height);
            }
        });

        $.validator.addMethod('dimension', function(value, element, param) {
            if (element.files.length == 0) {
                return true;
            }
            
            if($('input[name="is_premium"]:checked').val() == '1'){
                param[0] = 1920;
                param[1] = 500;
            }

            var width = $(element).data('imageWidth');
            var height = $(element).data('imageHeight');
            if (width >= param[0] && height >= param[1]) {
                return true;
            } else {
                return false;
            }
        }, 'Please upload an image with {0} x {1} pixels dimension');

        
        validator = $("#form_image").validate({
            ignore: null,
            rules: {
                is_premium: {
                    required: function() {
                        if (form.querySelector('[name="state"]').value == 'add') {
                            return true;
                        }
                        return false;
                    }
                },
                img_file: {
                    required: function() {
                        if (form.querySelector('[name="state"]').value == 'add') {
                            return true;
                        }
                        return false;
                    },
                    accept: "image/jpg,image/jpeg,image/png",
                    dimension: [1000, 667],
                    filesize: 500
                },
                is_watermark: {
                    required: function() {
                        if (form.querySelector('[name="state"]').value == 'add') {
                            return true;
                        }
                        return false;
                    }
                },
                img_caption: {
                    required: true
                },
                img_keyword: {
                    required: true
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
            messages: {},
            wrapper: 'div'
        });
    }

    return {
		init: function() {
			_validate();
		}
	};
}();

jQuery(function() {
	FormValidation.init();
});

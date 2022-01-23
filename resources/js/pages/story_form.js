var section_id = 0;
window.multipleRules = [];
var validator;

$(function() {

    $('#image').change(function() {
        $('#image').removeData('imageWidth');
        $('#image').removeData('imageHeight');
        var file = this.files[0];
        var tmpImg = new Image();
        tmpImg.src = window.URL.createObjectURL(file);
        tmpImg.onload = function() {
            width = tmpImg.naturalWidth,
            height = tmpImg.naturalHeight;
            $('#image').data('imageWidth', width);
            $('#image').data('imageHeight', height);
        }
    });

    $('#thumbnail').change(function() {
        $('#thumbnail').removeData('imageWidth');
        $('#thumbnail').removeData('imageHeight');
        var file = this.files[0];
        var tmpImg = new Image();
        tmpImg.src = window.URL.createObjectURL(file);
        tmpImg.onload = function() {
            width = tmpImg.naturalWidth,
            height = tmpImg.naturalHeight;
            $('#thumbnail').data('imageWidth', width);
            $('#thumbnail').data('imageHeight', height);
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

    const form = document.getElementById("form_story");
    validator = $("#form_story").validate({
        ignore: null,
        rules: {
            title:{
                required: true,
                maxlength: 250,
            },
            url: {
				required: true,
				url: true
			},
            image: {
                required: function() {
                    if (form.querySelector('[name="state"]').value == 'add') {
                        return true;
                    }
                    return false;
                },
                accept: "image/jpg,image/jpeg,image/png",
                dimension: [720, 1280],
                filesize: 2048 // 2 Mb
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
        wrapper: 'div'
    });
});
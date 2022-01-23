var FormValidation = function () {
    var validator;
    var section_id = 0;
    window.multipleRules = [];
    const form = document.getElementById("form_category");

    var addRules = function (rulesObj){
        rulesObj.forEach(function (value, i) {
            for (var item in value){
                $('#'+item+i).rules('add',value[item]);  
            }
        });
    }
    
    var removeRules = function (rulesObj){
        rulesObj.forEach(function (value, i) {
            for (var item in value){
                $('#'+item+i).rules('remove');  
            }
        });
    }

    var dynamicElement = function (data){
        let section_length = 1;
        if(data != 'add'){
            section_length = Object.keys(data).length;
        }
    
        let state = $('#state').val();
    
        for (i = 1; i <= section_length; i++) {
            let post_data = '';
            if(data != 'add'){
                post_data = data[i];
            }else{
                state = 'add';
            }
            section_id += 1; 
    
            $.ajax({
                type: "POST",
                url: HOST_URL+'/ajax/pluses/addSection',
                async: false,
                cache:false,
                data: {
                    section_id: section_id, 
                    data: post_data,
                    state: state
                },
                success: function (data){
                    $("#section").append(data);
                    window["content_" + section_id] = CKEDITOR.replace("content_" + section_id, {
                        on: {
                            instanceReady: function(ev) {
                                this.dataProcessor.writer.setRules('p', {
                                    indent: false,
                                    breakBeforeOpen: false,
                                    breakAfterOpen: false,
                                    breakBeforeClose: false,
                                    breakAfterClose: false
                                });
                            }
                        },
                        enterMode: CKEDITOR.ENTER_P,
                        filebrowserBrowseUrl : 'plugins/plus/filemanager/dialog.php?type=2&editor=ckeditor&fldr=',
                        filebrowserUploadUrl : 'plugins/plus/filemanager/dialog.php?type=2&editor=ckeditor&fldr=',
                        filebrowserImageBrowseUrl : 'plugins/plus/filemanager/dialog.php?type=1&editor=ckeditor&fldr='
                    });
            
                    window.multipleRules [section_id] = {
                        title_ : {
                            required : true
                        },
                        content_ : {
                            required : function(textarea) {
                                // update textarea
                                CKEDITOR.instances[textarea.id].updateElement();
                                // strip tags
                                var editorcontent = textarea.value.replace(/<[^>]*>/gi,'');
                                return editorcontent.length === 0;
                            }
                        }
                    };
                    removeRules(window.multipleRules);
                    addRules(window.multipleRules);
                }
            });
        }
    }

    var count = function () {
        var txtVal = $('#post_title').val();
        var words = txtVal.trim().replace(/\s+/gi, ' ').split(' ').length;
        var chars = txtVal.length;
        var maxchars = 65;
        var remains = maxchars - chars;
        var text = 'remaining';
    
        if (chars === 0) {
            words = 0;
        }
    
        if (remains >= 0) {
            $('#counter_title').css('color', 'gray');
        } else {
            $('#counter_title').css('color', 'red');
            text = 'exceed';
        }
    
        $('#counter_title').html(remains + ' characters ' + text);
    }
    
    var countSummary = function () {
        var txtVal = $('#post_summary').val();
        var words = txtVal.trim().replace(/\s+/gi, ' ').split(' ').length;
        var chars = txtVal.length;
        var maxchars = 160;
        var remains = maxchars - chars;
        var text = 'remaining';
    
        if (chars === 0) {
            words = 0;
        }
    
        if (remains >= 0) {
            $('#counter_summary').css('color', 'gray');
        } else {
            $('#counter_summary').css('color', 'red');
            text = 'exceed';
        }
    
        $('#counter_summary').html(remains + ' characters ' + text);
    }

    var tags = function () {
        $('.fancybox').attr('href', HOST_URL + '/ajax/tag/iframe'); 
    }

    var _validate = function () {
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
    
        var textEditorContent = tinymce.init({
            selector: "#post_content",
            relative_urls: false, // complete absolute path
            remove_script_host: false, // complete absolute path
            theme: "modern",
            width: "90%",
            height: 320,
            plugins: [
                 "advlist autolink link image lists charmap print preview hr anchor pagebreak",
                 "searchreplace wordcount visualblocks visualchars insertdatetime media nonbreaking",
                 "table contextmenu directionality emoticons paste textcolor responsivefilemanager code instagram twitter_url youtube customtable bacajuga quote"
           ],
           toolbar1: "undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | blockquote removeformat styleselect | image",
           toolbar2: "link unlink anchor | forecolor backcolor  | pastetext | preview code | fontsizeselect | youtube instagram twitter_url customtable bacajuga quote",
           paste_word_valid_elements:
            "b,strong,i,em,h1,h2,h3,h4,u,p,ol,ul,li,a[href],table,tr,td,thead,tbody,tfooter,span,color,font-size,font-color,font-family,mark",
            invalid_styles: {
                table: "width height",
                tr: "width height",
                th: "width height",
                td: "width height",
            },
            valid_elements: "+*[*]",
            default_link_target: "_blank",
            extended_valid_elements:
                "+iframe[width|height|name|align|class|frameborder|allowfullscreen|allow|src|*]," +
                "script[language|type|async|src|charset]" +
                "img[*]" +
                "embed[width|height|name|flashvars|src|bgcolor|align|play|loop|quality|allowscriptaccess|type|pluginspage]" +
                "blockquote[dir|style|cite|class|id|lang|onclick|ondblclick" +
                "|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout" +
                "|onmouseover|onmouseup|title]",
            content_css: [
                "//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
                "//www.tinymce.com/css/codepen.min.css",
                "/css/tinymce.custom.css",
            ],
    
            image_advtab: true ,
            branding: false,
            filemanager_crossdomain: false,
           
            external_filemanager_path:"/plugins/bisnis/filemanager/",
            filemanager_title:"Responsive Filemanager" ,
            external_plugins: { "filemanager" : "/plugins/bisnis/filemanager/plugin.min.js"}
        });

        $('#post_title').on('keyup propertychange paste', function() {
            count();
        });
    
        $('#post_summary').on('keyup propertychange paste', function() {
            countSummary();
        });
    
        $('#post_date_datetimepicker').datetimepicker({
            format: "YYYY-MM-DD HH:mm:ss",
            useCurrent: true
        });

        $('#tag_id').select2({
            placeholder: "Select Topic",
            allowClear: true
        }).on('change.select2', function() {
            $('#tag_id').valid();
        });
    
        $('#categoryParent').select2({
            placeholder: "Select Category",
            allowClear: true
        }).on('change.select2', function() {
            $('#categoryParent').valid();
        });

        $('#post_author').select2({
            placeholder: "Select Author",
            allowClear: true
        }).on('change.select2', function() {
            $('#post_author').valid();
        });
    
        $('#post_editor').select2({
            placeholder: "Select Editor",
            allowClear: true
        }).on('change.select2', function() {
            $('#post_editor').valid();
        });
        
        $('#post_feature').select2({
            allowClear: false
        }).on('change.select2', function() {
            $('#post_feature').valid();
        });
    
        $('#post_level').select2({
            allowClear: false
        }).on('change.select2', function() {
            $('#post_level').valid();
        });

        $.validator.addMethod('filesize', function(value, element, param) {
            param = param * 1024;
            return this.optional(element) || (element.files[0].size <= param);
        }, 'File size must be less than {0} Kb');
    
        $.each($.validator.methods, function(key, value) {
            $.validator.methods[key] = function() {
                if (arguments.length > 0) {
                    arguments[0] = $.trim(arguments[0]);
                }
    
                return value.apply(this, arguments);
            };
        });

        $('#post_image_content').on('change', function() {
            $('#post_image_content').removeData('imageWidth');
            $('#post_image_content').removeData('imageHeight');
            var file = this.files[0];
            var tmpImg = new Image();
            tmpImg.src = window.URL.createObjectURL(file);
            tmpImg.onload = function() {
                width = tmpImg.naturalWidth,
                height = tmpImg.naturalHeight;
                $('#post_image_content').data('imageWidth', width);
                $('#post_image_content').data('imageHeight', height);
            }
        });

        $.validator.addMethod('dimension', function(value, element, param) {
            if (element.files.length == 0) {
                return true;
            }
            
            if($('input[name="post_is_premium"]:checked').val() == '1'){
                param[0] = 1920;
                param[1] = 760;
            }

            var width = $(element).data('imageWidth');
            var height = $(element).data('imageHeight');
            if (width == param[0] && height == param[1]) {
                return true;
            } else {
                return false;
            }
        }, 'Please upload an image with {0} x {1} pixels dimension');

        validator = $("#form_post").validate({
            ignore: null,
            rules: {
                post_date: {
                    required: true,
                },
                post_title: {
                    required: true,
                    maxlength: 250,
                    remote: {
                        url: HOST_URL + '/ajax/posts/title',
                        type: "post",
                        data: {
                            _token:  form.querySelector('[name="_token"]').value,
                            state: form.querySelector('[name="state"]').value,
                            id: form.querySelector('[name="post_id"]').value
                        }
                    },
                },
                post_summary: {
                    required: true,
                },
                post_keyword: {
                    required: true,
                },
                post_is_longform: {
                    required: true,
                },
                post_is_premium: {
                    required: true,
                },
                post_live: {
                    required: true,
                },
                post_kolom: {
                    required: true,
                },
                post_content: {
                    required: true,
                },
                tag_id: {
                    required: true,
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
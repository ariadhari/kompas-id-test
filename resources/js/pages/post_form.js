const textEditorContent = {
    //selector: "#post_content",
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
},
form = document.getElementById("form_post");

let image_default = HOST_URL + '/media/default/image_default.jpg',
    postContent = jQuery.extend({}, textEditorContent),
    section_id = 0;

window.choice = [],
window.postId = []
window.choiceTag = [];
window.multipleRules = [];

var FormValidation = function () {
    var validator;
    window._validate = function () {
        $('#tag_id').select2({
            placeholder: "Select Topic",
            allowClear: true
        }).on('change.select2', function() {
            $('#tag_id').valid();
        });
    
        $('#category_id').select2({
            placeholder: "Select Category",
            allowClear: true
        }).on('change.select2', function() {
            $('#category_id').valid();
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

        $.validator.addMethod("notOnlyZero", function (value, element, param) {
            return this.optional(element) || parseInt(value) > 0;
        }, 'Value must be greater  than 0 ');

        $.each($.validator.methods, function(key, value) {
            $.validator.methods[key] = function() {
                if (arguments.length > 0) {
                    arguments[0] = $.trim(arguments[0]);
                }
    
                return value.apply(this, arguments);
            };
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
                post_image_caption: {
                    required: true,
                },
                post_image_content: {
                    required: function() {
                        if (form.querySelector('[name="state"]').value == 'add' && $('#library_file').val() == "") {
                            return true;
                        }
                        return false;
                    },
                    accept: "image/jpg,image/jpeg,image/png",
                    dimension: [1000, 667],
                    filesize: 500
                },
                post_author: {
                    required: true,
                },
                post_editor: {
                    required: true,
                },
                'tag_id[]': {
                    required: true,
                },
                library_image: {
                    required: function() {
                        if ($('#library_file').val() == "" && $('#library_thumb').val() && $('#library_date').val()) {
                            return true;
                        }
                        return false;
                    }
                },
                category_id: {
                    required: true,
                },
                post_source: {
                    required: true,
                },
                post_nilai_reporter: {
                    required: true,
                    notOnlyZero: '0'
                },
                post_nilai_redaktur: {
                    required: true,
                    notOnlyZero: '0'
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
    
    postContent.selector = "#post_content";
    tinymce.init(postContent);

    $("#add_section").on('click',function(event){
        dynamicElement('add');
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

    $('#post_image_content').on('change', function() {
        $('#post_image_content').removeData('imageWidth');
        $('#post_image_content').removeData('imageHeight');
        var file = this.files[0];
        if(file) {
            var tmpImg = new Image();
            tmpImg.src = window.URL.createObjectURL(file);
            tmpImg.onload = function() {
                width = tmpImg.naturalWidth,
                height = tmpImg.naturalHeight;
                $('#post_image_content').data('imageWidth', width);
                $('#post_image_content').data('imageHeight', height);
                
                $('#libraryInfo div').empty();
                $('#post_image_caption').val(null);
            }
        }
    });

    $('input[type=radio][name=post_is_premium]').change(function() {
        $("#post_image_content").val(null);
        $('#view_image').attr('src', HOST_URL + '/media/default/image_default.jpg');
        $('#post_image_content-error').remove();
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

window.dynamicElement = function (data){
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
            url: HOST_URL+'/ajax/posts/addSection',
            async: false,
            cache:false,
            data: {
                section_id: section_id, 
                data: post_data,
                state: state
            },
            success: function (data){
                $("#section").append(data);

                postContent.selector = "#content_" + section_id;
                tinymce.init(postContent);

                window.multipleRules [section_id] = {
                    content_ : {
                        required : true,
                    }
                };
                removeRules(window.multipleRules);
                addRules(window.multipleRules);
            }
        });
    }
}

window.removeReadtoo = function(i) {
    let count = 0,
        title = $('#post_postin' + i + '_title').val(),
        postin = $('.postin').val(null);

    window.postId = [];
    window.choice = $.grep(
        window.choice, function(e){ return e.title != title }
    );

    $.each(window.choice, function(index, item) {
        ++index; count = index;
        window.postId.push(item.id);

        $('#post_postin' + index + '_title').val(item.title);
        $('#post_postin' + index + '_url').val(item.url);
    });
    
    $('#read_too').val(count + ' article selected');
}

window.count = function () {
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

window.countSummary = function () {
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

window.tags = function () {
    $('.fancybox').attr('href', HOST_URL + '/ajax/tag/iframe'); 
}

window.posts = function () {
    $('.fancybox').attr('href', HOST_URL + '/ajax/posts/iframe'); 
}

window.imageLibrary = function () {
    var lib = $('input[name="post_image_type"]:checked').val() == 1 ? 'images' : 'infographics';
    $('.fancybox').attr('href', HOST_URL + '/ajax/' + lib + '/iframe'); 
}

window.setTag = function () {
    $('#tag_id').select2().empty();
    $("#tag_id").select2({data: window.choiceTag, tags: true, width: "90%"});
}

window.setImageContent = function(row) {
    $('#libraryInfo div').empty();

    $('<input>', {type: 'hidden',  name: 'library_date',value: row.date}).appendTo('#libraryInfo');
    $('<input>', {type: 'hidden',  name: 'library_file',value: row.file}).appendTo('#libraryInfo');
    $('<input>', {type: 'hidden',  name: 'library_thumb',value: row.thumb}).appendTo('#libraryInfo');
   
    $('#library_image').val(row.file);

    $("#post_image_content").val(null);
    $('#post_image_caption').val(row.caption);
    $('#view_image').attr('src', row.src).attr('onerror', "this.onerror=null;this.src=\'" + image_default + "\'");
}

window.removeSection = function (id,index, id_data, state){
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then(function(result) {
        if (result.value) {
            if(state == 'add'){
                window.multipleRules.splice(index, 1);
                removeRules(window.multipleRules);
                addRules(window.multipleRules);
                var elem = document.getElementById(id);
                elem.remove();

                Swal.fire(
                    "Deleted!",
                    "Data deleted successfully.",
                    "success"
                );
            }else{
                $.ajax({
                    type: "DELETE",
                    url: HOST_URL+'/ajax/posts/removeSection/'+ id_data,
                    cache: false,
                    data: {
                        _method: 'DELETE', 
                        id: id_data 
                    },
                    success: function(data) {
                        if(data == true){
                            window.multipleRules.splice(index, 1);
                            removeRules(window.multipleRules);
                            addRules(window.multipleRules);
                            var elem = document.getElementById(id);
                            elem.remove(); 
                            Swal.fire(
                                "Deleted!",
                                "Data deleted successfully.",
                                "success"
                            );
                        }else{
                            Swal.fire(
                                "Deleted!",
                                "Data failed to delete.",
                                "error"
                            )
                        }
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        Swal.fire(
                            "Deleted!",
                            "Error : Data failed to delete.",
                            "error"
                        )
                    }
                });
            }
            
        }
    });
}
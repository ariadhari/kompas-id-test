var section_id = 0;
window.multipleRules = [];
var validator;

$(function() {

    var ckeditor_content = CKEDITOR.replace('content', {
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
        filebrowserBrowseUrl : 'plugins/plus/filemanager/dialog.php?type=2&editor=ckeditor&sort_by=date&fldr=',
        filebrowserUploadUrl : 'plugins/plus/filemanager/dialog.php?type=2&editor=ckeditor&sort_by=date&fldr=',
        filebrowserImageBrowseUrl : 'plugins/plus/filemanager/dialog.php?type=1&editor=ckeditor&sort_by=date&fldr='
    });

    $('#publish_date_datetimepicker').datetimepicker({
        format: "YYYY-MM-DD HH:mm:ss",
        useCurrent: true
    });

    $('#category_id').select2({
        placeholder: "Select Category",
        allowClear: true
    }).on('change.select2', function() {
        $('#category_id').valid();
    });

    $('#author_id').select2({
        placeholder: "Select Author",
        allowClear: true
    }).on('change.select2', function() {
        $('#author_id').valid();
    });

    $('#editor_id').select2({
        placeholder: "Select Editor",
        allowClear: true
    }).on('change.select2', function() {
        $('#editor_id').valid();
    });

    ckeditor_content.on('change', function() {
        $('#content').valid();
    });

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
    }, 'File size must be less than {0} Kb');

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

    const form = document.getElementById("form_plus");
    validator = $("#form_plus").validate({
        ignore: null,
        rules: {
            title:{
                required: true,
                maxlength: 250,
                remote: {
                    url: HOST_URL + '/ajax/pluses/title',
                    type: "post",
                    data: {
                        _token:  form.querySelector('[name="_token"]').value,
                        state: form.querySelector('[name="state"]').value,
                        id: form.querySelector('[name="id"]').value
                    }
                }
            },
            category_id: "required",
            publish_date: "required",
            author_id: "required",
            editor_id: "required",
            image_caption: "required",
            summary: "required",
            keywords: "required",
            is_publish: "required",
            is_featured: "required",
            image: {
                required: function() {
                    if (form.querySelector('[name="state"]').value == 'add') {
                        return true;
                    }
                    return false;
                },
                accept: "image/jpg,image/jpeg,image/png",
                dimension: [1920, 760],
                filesize: 2048 // 2 Mb
            },
            thumbnail: {
                required: function() {
                    if (form.querySelector('[name="state"]').value == 'add') {
                        return true;
                    }
                    return false;
                },
                accept: "image/jpg,image/jpeg,image/png",
                dimension: [460, 345],
                filesize: 2048 // 2 Mb
            },
            content:{
                required: function(textarea) {
                    // update textarea
                    CKEDITOR.instances[textarea.id].updateElement();
                    // strip tags
                    var editorcontent = textarea.value.replace(/<[^>]*>/gi, '');
                    return editorcontent.length === 0;
                }
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
        messages: {
            title:{
                required: 'Title is required.',
                remote: 'The title you entered is already registered.'
            },
            category_id:{
                required: 'Category is required.',
            },
            publish_date: {
                required: 'Publish Date is required.',
            },
            author_id: {
                required: 'Author is required.',
            },
            editor_id: {
                required: 'Editor is required.',
            },
            image_caption: {
                required: 'Image Caption is required.',
            },
            summary: {
                required: 'Summary is required.',
            },
            keywords: {
                required: 'Keywords is required.',
            },
            is_publish: {
                required: 'Publish status is required.',
            },
            image: {
                required: 'Image is required.',
            },
            thumbnail: {
                required: 'Thumbnail is required.',
            },
            content: {
                required: 'Content is required.',
            }
        },
        wrapper: 'div'
    });

    // add section
    $("#add_section").on('click',function(event){
        dynamicElement('add');
    });
});

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
                //edit
                $.ajax({
                    type: "POST",
                    url: HOST_URL+'/ajax/plus-sections/'+id_data,
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
var dt;

$(function() {
    dt =  $('#dtIframe').DataTable({
        responsive: true,
        dom: `<'row'<'col-sm-12'tr>>
        <'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
        lengthMenu: [10, 25, 50, 100],
        pageLength: 10,
        processing: true,
        serverSide: true,
        ajax: {
            url: HOST_URL + '/datatables/posts/iframe',
            type: 'POST'
        },
        select: {
            style: 'multi',
        },
        order: [[ 0, 'desc' ]],
        columns: [
            {data: 'post_date'},
            {data: 'post_title'},
            {data: 'category_name'},
            {data: 'post_id'},
            {data: 'post_status'},
            {data: 'post_status_xml'},
            {data: 'post_hits'},
        ],
        columnDefs: [
            {
                targets: 0,
                width: 80,
                render: function(data, type, row, meta) {
                    return moment(data).format('DD MMM YYYY');;
                }
            },
            {
                targets: 1,
                width: 300,
                responsivePriority: 1
            },
            {
                targets: 2,
                width: 200,
            },
            {
                targets: 3,
                responsivePriority: 1,
                searchable: false,
                width: 10,
                render: function(data, type, row, meta){
                    if(type === 'display') {
                        var checked = "";
                        if(jQuery.inArray(row.post_id.toString(), window.parent.postId) != -1) {
                            checked = 'checked="true"';
                        }
                       data = '<label class="checkbox"><input type="checkbox" '+ checked +' data-id="' + row.post_id + '" data-title="' + row.post_title + '" data-url="' + row.url + '" class="dt-checkboxes" autocomplete="off"><span></span></label>';
                    }
                    return data;
                },
                checkboxes: {
                    'selectRow': false,
                    'selectAllRender': '#'
                }
            },
            {
                targets: 4,
                render: function(data, type, full, meta) {
                    var status = {
                        publish: {'title': 'Pending', 'class': 'label-light-primary'},
                        draft: {'title': 'Draft', 'class': 'label-light-danger'},
                        publish: {'title': 'Publish', 'class': 'label-light-success'},
                        revision: {'title': 'Revision', 'class': 'label-light-info'}
                    };

                    if (typeof status[data] === 'undefined') {
                        return data;
                    }

                    return '<span class="label label-lg font-weight-bold ' + status[data].class + ' label-inline">' + status[data].title + '</span>';
                },
            },
            {
                targets: 5,
                render: function(data, type, full, meta) {
                    var status = {
                        1: {'title': 'Yes', 'class': 'label-light-success'},
                        0: {'title': 'No', 'class': 'label-light-danger'},
                    };

                    if (typeof status[data] === 'undefined') {
                        return data;
                    }

                    return '<span class="label label-lg font-weight-bold ' + status[data].class + ' label-inline">' + status[data].title + '</span>';
                },
            },
            {
                targets: 6,
                render: function(data, type, full, meta) {
                    if(data == '' || data == null){
                        return 0;
                    }
                    return numberWithCommas(data);
                }
            }
        ],
        drawCallback: function() {
            $('.dt-checkboxes').on('click', function() {
                var elem = $(this);
                if ($(this).prop('checked')) {
                    window.parent.choice.push({id: elem.attr('data-id'), title: elem.attr('data-title'), url: elem.attr('data-url')});
                } else {
                    window.parent.choice = $.grep(window.parent.choice, function(e){ return e.id != elem.attr('data-id'); });
                }
            });
        },
    });

    $('#kt_search').on('click', function(e) {
        e.preventDefault();
        var params = {};
        $('.datatable-input').each(function() {
            var i = $(this).data('col-index');
            if (params[i]) {
                params[i] += '|' + $(this).val();
            }
            else {
                params[i] = $(this).val();
            }
        });
        $.each(params, function(i, val) {
            dt.column(i).search(val ? val : '', false, false);
        });
        dt.table().draw();
    });
    
    $('#kt_reset').on('click', function(e) {
        e.preventDefault();
        $('.datatable-input').each(function() {
            $(this).val('');
            dt.column($(this).data('col-index')).search('', false, false);
        });
        dt.table().draw();
    });

});

window.attach = function() {
    if((window.parent.choice.length < 1)) {
        Swal.fire(
            "Oops!",
            "There's no data selected.",
            "warning"
        );
        return;
    }

    if((window.parent.choice.length > 3)) {
        Swal.fire(
            "Oops!",
            "Add article read too only allowed for 3 article",
            "warning"
        );
        return;
    }

    window.parent.$('.postin').val('');
    window.parent.postId = [];
    
    var idx = 0;
    $.each(window.parent.choice, function(index, item) {
        ++idx;
        window.parent.$('#post_postin' + idx + '_title').val(item.title);
        window.parent.$('#post_postin' + idx + '_url').val(item.url);
        window.parent.postId.push(item.id);
    });
    
    window.parent.$('#read_too').val(idx + ' article selected');
    parent.$.fancybox.close();
}

window.numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
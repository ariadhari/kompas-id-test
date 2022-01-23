var dt,
    tagId = window.parent.$('#tag_id').val() ?? [];

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
            url: HOST_URL + '/datatables/tag/iframe',
            type: 'POST'
        },
        select: {
            style: 'multi'
        },
        order: [[ 2, 'desc' ]],
        columns: [
            {data: 'tag_id'},
            {data: 'tag'},
            {data: 'count'},
            {data: 'slug'},
        ],
        columnDefs: [
            {
                targets: 0,
                responsivePriority: 1,
                orderable: false,
                searchable: false,
                width: 10,
                render: function(data, type, row, meta){
                    if(type === 'display') {
                        var checked = "";
                        if(jQuery.inArray(row.tag_id.toString(), tagId) != -1) {
                            checked = 'checked="true"';
                        }
                       data = '<label class="checkbox"><input type="checkbox" '+ checked +' data-id="' + row.tag_id + '" data-title="' + row.tag + '" class="dt-checkboxes" autocomplete="off"><span></span></label>';
                    }
                    return data;
                },
                checkboxes: {
                    'selectRow': false,
                    'selectAllRender': '<label class="checkbox"><input type="checkbox" class="dt-checkboxes" autocomplete="off"><span></span></label>'
                }
            },
            {
                targets: 1,
                width: 300,
            },
            {
                targets: 2,
                width: 80,
                render: function(data, type, full, meta) {
                    return numberWithCommas(data);
                }
            },
            {
                targets: 3,
                orderable: false,
                searchable: false,
                render: function(data, type, full, meta) {
                    return '<a target="_blank" href="https://www.bisnis.com/topic/'+full.tag_id+'/'+data+'">https://www.bisnis.com/topic/'+full.tag_id+'/'+data+'</a>';
                }
            }
        ],
        drawCallback: function() {
            $('.dt-checkboxes').on('click', function() {
                var elem = $(this);
                if ($(this).prop('checked')) {
                    window.parent.choiceTag.push({id: elem.attr('data-id'), text: elem.attr('data-title'), selected: true});
                } else {
                    window.parent.choiceTag = $.grep(window.parent.choiceTag, function(e){ return e.id != elem.attr('data-id'); });
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
    if((window.parent.choiceTag.length < 1)) {
        Swal.fire(
            "Oops!",
            "There's no data selected.",
            "warning"
        );
        return;
    }

    window.parent.setTag();
    parent.$.fancybox.close();
}

window.numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
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
            url: HOST_URL + '/datatables/images',
            type: 'POST',
        },
        order: [[ 7, 'desc' ]],
        columns: [
            {data: 'img_file_thumb'},
            {data: 'img_id'},
            {data: 'img_file'},
            {data: 'img_caption'},
            {data: 'img_type'},
            {data: 'img_size'},
            {data: 'img_resolution'},
            {data: 'img_date'},
            {data: 'img_keyword'},
        ],
        columnDefs: [
            {
                targets: 0,
                width: '75',
                responsivePriority: 1,
                render: function(data, type, row, meta) {
                    let image_default = HOST_URL + '/media/default/image_default.jpg';
                    let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
                    let date = new Date(row.img_date);
                    let image = window.parent.IMG_URL + 'library/1/' + date.getFullYear() + '/' + months[date.getMonth()] + '/thumbs/' + data;
                    return '<img src="'+ image +'" onerror="this.onerror=null;this.src=\''+ image_default +'\'" style="width:90px;"/>';
                },
            },
            {
                targets: 1,
                responsivePriority: 2,
                orderable: false,
                searchable: false,
                render: function(data, type, full, meta) {
                    return '<label class="checkbox">' +
                        '<input type="checkbox" class="check">' +
                        '<span></span>'+ 
                        '</label>';
                }
            },
            {
                targets: 2,
                responsivePriority: 3
            },
            {
                targets: 7,
                width: '150',
            }
        ],
        drawCallback: function() {
            $('.check').on('click', function() {
                dt.$('tr.selected-1').removeClass('selected-1');
                if ($(this).prop('checked'))
                    $(this).closest('tr').addClass('selected-1');
                else
                    $(this).closest('tr').removeClass('selected-1')

                //$(".check").not(this).prop('checked', false);
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
    const row = dt.rows('.selected-1').data()[0];
    if(typeof row === 'undefined' || typeof row.length < 1) {
        Swal.fire(
            "Oops!",
            "There's no data selected.",
            "warning"
        );
        return;
    } 

    let date = moment(row.img_date).format('YYYY/MM/').toString(),
        src = window.parent.IMG_URL + 'library/1/' + date + 'thumbs/' + row.img_file_thumb;
        
	window.parent.setImageContent({
        file: row.img_file,
        caption: row.img_caption,
        thumb: row.img_file_thumb,
        date: row.img_date,
        src: src
    });
	window.parent.$.fancybox.close();
}
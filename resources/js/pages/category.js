"use strict";
var datatable;
var KTDatatableJson = function() {

    var grid = function() {
        datatable = $('#kt_datatable').DataTable({
			responsive: true,
			paging: true,
			dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			lengthMenu: [10, 25, 50, 100],
			pageLength: 10,
			processing: true,
			serverSide: true,
			ajax: {
				url: HOST_URL + '/datatables/category',
				type: 'POST',
			},
			order: [[ 3, 'asc' ]],
			columns: [
                {data: 'category_id'},
				{data: 'category_name'},
                {data: 'category_link'},
				{data: 'menu_order'},
                {data: 'headline_view'},
                {data: 'breaking_view'},
                {data: 'is_show'},
                {data: 'status'},
				{data: 'category_id'},
			],
            columnDefs: [
                {
                    data: null,
                    searchable: false,
                    orderable: false,
                    targets: [ 0 ],
                    width: "5%",
                    className: 'details-control',
                    render: function(data, type, row, meta) {
                        return '';
                    }
                },
                {
                    targets: 6,
                    render: function(data) {
                        var display = {
                            1:{'title': 'Ya', 'class': 'label-light-success'},
                            0:{'title': 'Tidak', 'class': 'label-light-info'}
                        };

                        if (typeof display[data] === 'undefined') {
							return data;
						}

                        return '<span class="label label-lg font-weight-bold ' + display[data].class + ' label-inline">' + display[data].title + '</span>';
                    }
                },
                {
                    targets: 7,
                    render: function(data, type, full, meta) {
						var status = {
							1: {'title': 'Aktif', 'class': 'label-light-success'},
							0: {'title': 'Tidak Aktif', 'class': 'label-light-info'}
						};

						if (typeof status[data] === 'undefined') {
							return data;
						}

						return '<span class="label label-lg font-weight-bold ' + status[data].class + ' label-inline">' + status[data].title + '</span>';
					}
                },
                {
                    searchable: false,
                    orderable: false,
                    targets: 8,
                    render: function(data, type, row, meta) {
                        return ' <div class="btn-group" role="group">' + 
                            '<a href="' + baseURL + 'category/' + data + '/show" class="btn btn-outline-secondary btn-icon" title="View">' + 
                                '<i class="flaticon-eye text-success"></i>' + 
                            '</a>' +
                            '<a href="' + baseURL + 'category/' + data + '/edit" class="btn btn-outline-secondary btn-icon" title="Edit">' + 
                                '<i class="flaticon-edit text-primary"></i>' + 
                            '</a>' +
                            '<a onclick="destroy(' + data + ', ' + row.category_id + ')" class="btn btn-outline-secondary btn-icon" title="Delete">' + 
                                '<i class="flaticon2-trash text-danger"></i>' +
                            '</a>' +
                        '</div>';
        
                    },
                    width: "10%",
                },
                
            ]
		});

        $('#kt_datatable tbody').on( 'click', 'tr td.details-control', function (e) {
            $('#kt_datatable tbody tr').removeClass('shown');
            $('#kt_datatable tbody tr .selected-1').hide();
            var tr = $(this).closest('tr');
            var data = datatable.row( tr ).data();
            var row = datatable.row( tr );
            if ( row.child.isShown() ) {
                row.child.hide();
                tr.removeClass('shown');
            } else {
                if ($(this).hasClass('bg-childtd')) {
                    return false;
                }
                row.child(
                    format(data['category_id']),
                    'selected-1',
                ).show();
                tr.addClass('shown')
                child_datatable(data['children'], data['category_id']);
                console.log(data['children']);
            }
        });

		var filter = function() {
			var val = $.fn.dataTable.util.escapeRegex($(this).val());
			datatable.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
		};

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
				// apply search params to datatable
				datatable.column(i).search(val ? val : '', false, false);
			});
			datatable.table().draw();
		});

		$('#kt_reset').on('click', function(e) {
			e.preventDefault();
			$('.datatable-input').each(function() {
				$(this).val('');
				datatable.column($(this).data('col-index')).search('', false, false);
			});
			datatable.table().draw();
		});
            
    };

    return {
        init: function() {
            grid();
        }
    };
}();

jQuery(document).ready(function() {
    KTDatatableJson.init();
});

window.destroy = function (id){
	let msg = 'Do you want to to delete this data now ? <br/> You won\'t be able to revert this!';
	Swal.fire({
        title: 'Are you sure?',
        html: msg,
		icon: 'warning',
		width: '550px',
		buttonsStyling: false,
		confirmButtonText: "<i class='flaticon2-check-mark'></i>Yes, delete it!",
		showCancelButton: true,
		cancelButtonText: "<i class='flaticon2-cross'></i> No, thanks",
		customClass: {
			confirmButton: "btn btn-primary",
			cancelButton: "btn btn-secondary"
		},
		reverseButtons: true
    }).then(function(result) {
        if (result.value) {
			$.ajax({
				type: "POST",
				dataType: 'html',
				url: HOST_URL + "/category/" + id,
				cache: false,
				data: {
					_method: 'DELETE', 
					id: id 
				},
				success: function(data) {
					Swal.fire(
						"Success!",
						"Data deleted successfully.",
						"success"
					);
					datatable.table().draw();
				},
				error: function (xhr, ajaxOptions, thrownError) {
					Swal.fire(
						"Failed!",
						"Data failed to delete.",
						"error"
					);
				},
			});
			//event.preventDefault();
        }
    });
	return false;
}

function child_datatable(child, tableid) {
    var subtable = $('#child' + tableid).DataTable({
		aaData : child,
		language: {
			lengthMenu: "_MENU_",
			zeroRecords: "<p class='text-center'>No data available </p>",
			oPaginate: {
				sNext: '<i class="flaticon2-next"></i>',
				sPrevious: '<i class="flaticon2-back"></i>',
				sFirst: '<i class="flaticon2-fast-back"></i>',
				sLast: '<i class="flaticon2-fast-next"></i>',
			}
		},
		aoColumns : [
			{ "mData" : "category_id" },
			{ "data": null,"sortable": false, 
				render: function (data, type, row, meta) {
					return meta.row + meta.settings._iDisplayStart + 1;
				}  
			},
			{ "mData" : "category_name" },
			{ "mData" : "category_link" },
			{ "mData" : "category_id" },
		],
		order: [[0,"asc"]],
		lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]],
		columnDefs: [
			{
				visible: false, 
				targets: [ 0 ] 
			},
			{ 
				width: "5%", 
				targets: [ 1 ] 
			},
			{ 
				width: "40%",
				targets: [ 2, 3 ] 
			},
			{
				searchable: false,
				orderable: false,
				targets: 4,
				render: function(data, type, row, meta) {
				return ' <div class="btn-group" role="group">' + 
						'<a href="' + baseURL + 'category/' + data + '" class="btn btn-outline-secondary btn-icon" title="View">' + 
							'<i class="flaticon-eye text-success"></i>' + 
						'</a>' +
						'<a href="' + baseURL + 'category/' + data + '/edit" class="btn btn-outline-secondary btn-icon" title="Edit">' + 
							'<i class="flaticon-edit text-primary"></i>' + 
						'</a>' +
						'<a onclick="destroy(' + data + ')" class="btn btn-outline-secondary btn-icon" title="Delete">' + 
							'<i class="flaticon2-trash text-danger"></i>' +
						'</a>' +
					'</div>';
	
				},
				width: "20%",
			}
		],
    });
	
	subtable.on( 'order.dt search.dt', function () {
        subtable.column(1, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    }).draw();
}

function format (tableid) {
    var html ='<div class="table-responsive">'+ 
      '<table id="child' + tableid + '" style="border: #eee solid 1px" class="table childtable" style="cursor:pointer">'+
              '<thead>'+
                  '<th>Sort</th>'+
                  '<th>Category</th>'+
                  '<th>Link SEO</th>'+
                  '<th>Order</th>'+
                  '<th>Action</th>'+
              '</thead>'+
              '<tbody></tbody>' +
          '</table>' + 
      '</div>';
      
      return html;
  }
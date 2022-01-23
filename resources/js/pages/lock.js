"use strict";
var datatable;
var KTDatatableJson = function() {

    var grid = function() {
        datatable = $('#kt_datatable').KTDatatable({
            data: {
                type: 'remote',
                source: HOST_URL + '/datatables/lock',
                pageSize: 10,
				serverPaging: true,
				serverFiltering: true,
				serverSorting: true,
				saveState: true,
				cache: false
            },
            layout: {
                scroll: false, 
                footer: false 
            },
            sortable: true,
            pagination: true,
            search: {
                input: $('#kt_datatable_search_query'),
                key: 'title'
            },
            columns: [
                {
					field: 'title',
					title: 'Title',
					width: 300,
					autoHide: false,
                },
				{
                    field: 'lock_channel',
                    title: 'Channel',
                    width: 100,
                },
				{
                    field: 'start_date',
                    title: 'Start Date',
                    width: 100,
                },
				{
                    field: 'end_date',
                    title: 'End Date',
                    width: 100,
                },
				{
					field: 'position',
					title: 'Position',
					width: 100,
					template: function(row) {
						var status = {
							'HEADLINE': {'title': row.position, 'class': ' label-light-success'},
							'BREAKING': {'title': row.position, 'class': ' label-light-info'},
						};
						return '<span class="label font-weight-bold label-lg ' + status[row.position].class + ' label-inline">' + status[row.position].title + '</span>';
					},
				},
				{
					field: 'category.category_name',
					title: 'Category',
					width: 100,
					template: function(row) {
						if (row.category === undefined || row.category === null)
							return '-';

						return '<span class="label font-weight-bold label-lg label-light-primary label-inline">' + row.category.category_name + '</span>';
					},
				},
				{
                    field: 'platform',
                    title: 'Platform',
                    width: 100,
					template: function(row) {
						var status = {
							'0': {'title': 'Destkop', 'class': ' label-light-success'},
							'1': {'title': 'Mobile', 'class': ' label-light-info'},
							'2': {'title': 'Destkop & Mobile', 'class': ' label-light-danger'},
						};
						return '<span class="label font-weight-bold label-lg ' + status[row.platform].class + ' label-inline">' + status[row.platform].title + '</span>';
					},
                },
				{
                    field: 'action',
                    title: 'Action',
					sortable: false,
					overflow: 'visible',
					width: 150,
                },
            ]

        });

		datatable.sort('start_date', 'desc');

		$('#kt_datatable_search_position').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'position');
		});
		$('#kt_datatable_search_category').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'category_id');
		});

		$('#kt_datatable_search_position, #kt_datatable_search_category').select2();
	}
	
	$('#kt_datepicker').datepicker({
		todayHighlight: true,
		format: "yyyy-mm-dd",
		orientation: "bottom left",
		templates: {
			leftArrow: '<i class="la la-angle-left"></i>',
			rightArrow: '<i class="la la-angle-right"></i>',
		},
	});
	
	$('#kt_search').on('click', function(e) {
		e.preventDefault();
		var params = {};
		$('.datatable-input').each(function() {
			var i = $(this).data('col-index');
			if (params[i]) {
				params[i] += '|' + $(this).val();
			} else {
				params[i] = $(this).val();
			}
		});
		
		$.each(params, function(i, val) {
			datatable.search(val, 'date');
		});
	});
	
	$('#kt_reset').on('click', function(e) {
		e.preventDefault();
		$('.datatable-input').each(function() {
			$(this).val('');
			datatable.search(false, 'date');
		});
	});


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
				url: HOST_URL + "/lock/" + id,
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
					datatable.reload();
				},
				error: function (xhr, ajaxOptions, thrownError) {
					Swal.fire(
						"Failed!",
						"Data failed to delete.",
						"error"
					);
				},
			});
			event.preventDefault();
        }
    });
	return false;
}
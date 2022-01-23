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
			autoWidth: false,
			ajax: {
				url: HOST_URL + '/datatables/hot_topic',
				type: 'POST',
			},
			order: [[ 1, 'desc' ]],
			columns: [
				{data: 'tags.tag'},
				{data: 'h_create_date'},
				{data: 'tags.count'},
				{data: 'h_status'},
				{data: 'h_status_xml'},
				{data: 'action'},
			],
			columnDefs: [
				{
					targets: 0,
					width: '250',
					responsivePriority: 1,
					render: function(data, type, row, meta) {
						if(row.tags)
							return data;
						
						return null;
					},
				},
				{
					targets: 1,
					width: '250',
				},
				{
					width: '250',
					targets: 2,
					className: 'text-right',
					render: function(data, type, row, meta) {
						if(row.tags)
							return data;
						
						return null;
					},
				},
				{
					width: '75',
					targets: 3,
					render: function(data, type, row, meta) {
						var status = {
							'active': {'title': 'Active', 'class': 'label-light-success'},
							'inactive': {'title': 'Inactive', 'class': 'label-light-danger'},
						};
						if (typeof status[data] === 'undefined') {
							return data;
						}

						return '<span class="label label-lg font-weight-bold ' + status[data].class + ' label-inline">' + status[data].title + '</span>';
					},
				},
				{
					width: '75',
					targets: 4,
					render: function(data, type, row, meta) {
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
					targets: 5,
					width: '200',
					title: 'Actions',
					orderable: false,
					className: "text-nowrap"
				}
			],
        });
		
		var filter = function() {
			var val = $.fn.dataTable.util.escapeRegex($(this).val());
			table.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
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
	}


    return {
        init: function() {
            grid();
        }
    };
}();


jQuery(document).ready(function() {
    KTDatatableJson.init();
});


window.destroy = function (id)
{
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
				url: HOST_URL + "/hot_topic/" + id,
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
			event.preventDefault();
        }
    });
	return false;
}

window.setStatus = function (id, status)
{
	let msg = 'Do you want to set this data as hot topic ?';
	let title = status === 'inactive' ? 'Deactivate hot topic' : 'Activate hot topic';
	Swal.fire({
        title: title,
        html: msg,
		icon: 'warning',
		width: '550px',
		buttonsStyling: false,
		confirmButtonText: "<i class='flaticon2-check-mark'></i>Yes, i'm sure!",
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
				dataType: 'json',
				url: HOST_URL + "/ajax/hot_topic/set-status",
				cache: false,
				data: {
					id: id,
					status: status,
				},
				success: function(data) {
					console.log(data.msg);
					Swal.fire(
						'Success!',
						title + 'successfully',
						'success'
					);
					datatable.table().draw();
				},
				error: function (xhr, ajaxOptions, thrownError) {
					Swal.fire(
						"Failed!",
						"Failed to set as hot topic.",
						"error"
					);
				},
			});
			event.preventDefault();
        }
    });
	return false;
}

window.generateXML = function (id)
{
	let msg = 'Do you want to publish hot topic now ?';
	Swal.fire({
        title: 'Publish Hot Topic',
        html: msg,
		icon: 'warning',
		width: '550px',
		buttonsStyling: false,
		confirmButtonText: "<i class='flaticon2-check-mark'></i>Yes, i'm sure!",
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
				dataType: 'json',
				url: HOST_URL + "/ajax/hot_topic/publish",
				cache: false,
				data: {
					id: id
				},
				success: function(data) {
					Swal.fire(
						'Success!',
						'Publish Hot Topic successfully',
						'success'
					);
					datatable.table().draw();
				},
				error: function (xhr, ajaxOptions, thrownError) {
					Swal.fire(
						"Failed!",
						"Failed to set as hot topic.",
						"error"
					);
				},
			});
			event.preventDefault();
        }
    });
	return false;
}
"use strict";
var datatable;
var KTDatatableJson = function() {

	$.fn.dataTable.Api.register('column().title()', function() {
		return $(this.header()).text().trim();
	});

    var grid = function() {
		datatable = $('#kt_datatable').DataTable({
			responsive: true,
			pagingType: 'full_numbers',
			dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			lengthMenu: [10, 25, 50, 100],
			pageLength: 10,
			processing: true,
			serverSide: true,
			ajax: {
				url: HOST_URL + '/datatables/posts',
				type: 'POST',
			},
			order: [[ 2, 'desc' ]],
			columns: [
                {data: 'DT_RowIndex', name: 'DT_RowIndex'},
				{data: 'judul'},
				{data: 'tanggal_terbit'},
				{data: 'status_id'},
				{data: 'nama'},
				{data: 'action', name: 'action'},
			],
			columnDefs: [
				{
					width: '75px',
					targets: 3,
					render: function(data, type, full, meta) {
						var status = {
							0: {'title': 'Unpublish', 'class': 'label-light-danger'},
							1: {'title': 'Publish', 'class': 'label-light-success'}
						};

						if (typeof status[data] === 'undefined') {
							return data;
						}

						return '<span class="label label-lg font-weight-bold ' + status[data].class + ' label-inline">' + status[data].title + '</span>';
					},
				},
			],
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
				url: HOST_URL + "/posts/" + id,
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


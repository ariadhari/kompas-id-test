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
				url: HOST_URL + '/datatables/stories',
				type: 'POST',
			},
			order: [[ 1, 'desc' ]],
			columns: [
				{data: 'title'},
				{data: 'created_at'},
				{data: 'action'},
			],
			columnDefs: [
				{
					targets: 0,
					width: '400',
					responsivePriority: 1,
				},
				{
					targets: 1,
					width: '250',
				},
				{
					targets: 2,
					width: '150',
					orderable: false,
					responsivePriority: 2
				},
			]
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
				url: HOST_URL + "/stories/" + id,
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
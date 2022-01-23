"use strict";

var KTDatatableJson = function() {

    var grid = function() {
        var datatable = $('#kt_datatable').KTDatatable({
            data: {
                type: 'remote',
                source: HOST_URL + '/datatables/users',
                pageSize: 10,
				serverPaging: true,
				serverFiltering: true,
				serverSorting: true,
				saveState: true
            },
            layout: {
                scroll: false,
                footer: false
            },
            sortable: true,
            pagination: true,
            search: {
                input: $('#kt_datatable_search_query'),
                key: 'nama'
            },
            columns: [
                {
					field: 'nama',
					title: 'User',
					width: 250,
					autoHide: false,
                    template: function(data) {

						var output = '';
						let img = HOST_URL + '/media/users/default.jpg';
						if (data.image_profile !== '' && data.image_profile !== null) {
                            img = IMG_PROFILE_URL + data.uid + '/' + data.image_profile;
						}
						let user_img = 'background-image:url(\'' + img + '\')';

						output = '<div class="d-flex align-items-center">\
							<div class="symbol symbol-40 flex-shrink-0">\
								<div class="symbol-label" style="' + user_img + '"></div>\
							</div>\
							<div class="ml-2">\
								<div class="text-dark-75 font-weight-bold line-height-sm">' + data.nama + '</div>\
								<a href="javascript:void(0);" class="font-size-sm text-dark-50 text-hover-primary">' +
								data.email + '</a>\
							</div>\
						</div>';

						return output;
					},
                },
				{
                    field: 'nik',
                    title: 'NIK',
                    width: 100,
                },
				{
					field: 'aktif',
					title: 'Active',
					template: function(row) {
						var status = {
							1: {'title': 'Yes', 'class': ' label-light-success'},
							0: {'title': 'No', 'class': ' label-light-danger'},
						};
						return '<span class="label font-weight-bold label-lg ' + status[row.aktif].class + ' label-inline">' + status[row.aktif].title + '</span>';
					},
				},
				{
                    field: 'action',
                    title: 'Action',
					sortable: false,
					overflow: 'visible'
                },
            ]

        });

		datatable.sort('nama', 'asc');

        $('#kt_datatable_search_status').on('change', function() {
			datatable.search($(this).val().toLowerCase(), 'aktif');
		});

		$('#kt_datatable_search_status').selectpicker();
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
	let msg = 'Do you want to to delete this data now ? <br/>This action cannot be undone.';
	Swal.fire({
        title: 'Delete User',
        html: msg,
		icon: 'warning',
		width: '550px',
		buttonsStyling: false,
		confirmButtonText: "<i class='flaticon2-check-mark'></i> Yes, i'am sure!",
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
				url: HOST_URL + "/users/" + id,
				cache: false,
				data: {
					_method: 'DELETE',
					id: id
				},
				success: function(data) {
					Swal.fire(
						"Success!",
						"User successfully deleted",
						"success"
					);
					$('div.flash-message').html(data);
					setTimeout(function() {
						$('.alertnotif').fadeOut('slow');
					}, 3000);
					parent.$('#kt_datatable').DataTable().ajax.reload();
				},
				error: function (xhr, ajaxOptions, thrownError) {
					Swal.fire(
						"Failed!",
						xhr.status + ' | ' + thrownError,
						"error"
					)
				},
			});
			event.preventDefault();
        }
    });
	return false;
}

"use strict";
var datatable;
var KTDatatableJson = function() {
    var grid = function() {
		datatable = $('#kt_datatable').DataTable({
			responsive: true,
			dom: `<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
			lengthMenu: [10, 25, 50, 100],
			pageLength: 10,
			processing: true,
			serverSide: true,
			ajax: {
				url: HOST_URL + '/datatables/lock/article',
				type: 'POST',
				data: function ( d ) {
					d.source = window.parent.$('input[name="source"]:checked').val();
				}
			},
			order: [[ 2, 'desc' ]],
			columns: [
				{data: 'id'},
				{data: 'title', name: 'title'},
				{data: 'publish_date', name: 'publish_date'},
				{data: 'category_id', name: 'category.category_id'},
			],
			columnDefs: [
				{
					targets: 0,
					responsivePriority: 1,
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
					targets: 1,
					width: '500',
					responsivePriority: 1,
				},
				{
					targets: 2,
					render: function(data, type, full, meta) {
						if(data == '' || data == null){
							return 0;
						}
						return moment(data).format('DD MMM YYYY HH:mm:ss');
					}
				},
				{
					targets: 3,
					render: function(data, type, full, meta) {
						const colors = ["label-light-success", "label-light-danger", "label-light-primary", "label-light-warning", "label-light-info"];
						var keys = [
							['5', '43', '194', '258'],
							['197', '222', '272'],
							['382', '406', '413', '526', '527', '528', '530', '547'],
							['390', '392', '551'],
							['186', '624']
						];
						let output = {};
						for(var i = 0; i < 5; i++) {
							for(var j = 0; j < keys[i].length; j++) {
								output[keys[i][j]] = colors[i];
							}
						}
						
						return '<span class="label label-lg font-weight-bold ' + output[full.parent_id] + ' label-inline">' + full.category_name + '</span>';
					}
				}
			],
			drawCallback: function() {
				$('.check').on('click', function() {
					datatable.$('tr.selected-1').removeClass('selected-1');
					$('#btn-attach').hide();
					if ($(this).prop('checked')) {
						$(this).closest('tr').addClass('selected-1');
						$('#btn-attach').show();
					} else {
						$(this).closest('tr').removeClass('selected-1')
					}
					$(".check").not(this).prop('checked', false);
				});
			},
		});

		var filter = function() {
			var val = $.fn.dataTable.util.escapeRegex($(this).val());
			datatable.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
		};

		$('#kt_search').on('click', function(e) {
			$('#btn-attach').hide();
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
				datatable.column(i).search(val ? val : '', false, false);
			});
			datatable.table().draw();
		});
		
		$('#kt_reset').on('click', function(e) {
			$('#btn-attach').hide();
			e.preventDefault();
			$("#category_id").val('').trigger('change');
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
	$('#category_id').select2({
		placeholder: "Choose Category",
		allowClear: true,
		matcher: parent.modelMatcher,
	});
	
	$('#source-title').html(window.parent.$('input[name="source"]:checked').val());
});

window.attach = function()
{
	const row = datatable.rows('.selected-1').data()[0];
	parent.setForm(row);
	parent.$.fancybox.close();
}
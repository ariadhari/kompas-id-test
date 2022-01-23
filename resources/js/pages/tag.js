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
				url: HOST_URL + '/datatables/tag',
				type: 'POST',
			},
			order: [[ 1, 'desc' ]],
			columns: [
				{data: 'tag'},
				{data: 'lastgenerated'},
				{data: 'keyword'},
				{data: 'description'},
				{data: 'is_xml'},
				{data: 'link'},
				{data: 'action'},
			],
			columnDefs: [
				{
					targets: 0,
					width: '250',
					responsivePriority: 1,
				},
				{
					targets: 1,
					width: '250',
				},
				{
					width: '250',
					targets: 2,
					render: function(data, type, row, meta) {
						if (typeof row.keyword === 'undefined' || row.keyword === null || row.keyword === '') {
							return '<span data-type="address" data-val="" data-pk="' + row.tag_id +'" data-title="Enter Keyword & Description" class="font-weight-bold text-danger txtkeyword" style="font-size:11px"><i class="fas fa-pencil-ruler icon-sm text-danger"></i> Set Keyword</span>';
						}
						return '<span data-type="address" data-val="' + row.keyword +'" data-pk="' + row.tag_id +'" data-title="Enter Keyword & Description" class="txtkeyword">' + row.keyword + '</span>';
					},
					responsivePriority: 1,
				},
				{
					width: '400',
					targets: 3,
					render: function(data, type, row, meta) {
						if (typeof row.description === 'undefined' || row.description === null || row.keyword === '') {
							return '<span data-type="address" data-val="" data-pk="' + row.tag_id +'" data-title="Enter Keyword & Description" class="font-weight-bold text-danger txtdescription" style="font-size:11px"><i class="fas fa-pencil-ruler icon-sm text-danger"></i> Set Description</span>';
						}
						return '<span data-type="address" data-val="' + row.description +'" data-pk="' + row.tag_id +'" data-title="Enter Keyword & Description" class="txtdescription">' + row.description + '</span>';
					},
					responsivePriority: 1,
				},
				{
					width: '75',
					targets: 4,
					render: function(data, type, row, meta) {
						var status = {
							1: {'title': 'Yes', 'class': 'label-light-success'},
							0: {'title': 'No', 'class': 'label-light-danger'},
						};
						if (typeof status[row.is_xml] === 'undefined') {
							return data;
						}

						return '<span class="label label-lg font-weight-bold ' + status[row.is_xml].class + ' label-inline">' + status[row.is_xml].title + '</span>';
					},
				},
				{
					targets: 6,
					width: '200',
					title: 'Actions',
					orderable: false,
					className: "text-nowrap"
				}
			],
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
	}

	$('#kt_datatable').editable({
        showbuttons: 'bottom',
		selector:'span.txtkeyword',
		clear: false,
		type: 'POST',
		url: HOST_URL + '/ajax/tag/store-meta',
        validate: function(value, pk) {
			console.log($(this).html());
            if(value.keyword == '') 
				return 'Keyword is required!'; 
			if(value.description == '') 
				return 'Description is required!'; 
        },
		success: function(response, newValue) {
			datatable.table().draw();
		},  
    }); 
	
	$('#kt_datatable').editable({
        showbuttons: 'bottom',
		selector:'span.txtdescription',
		clear: false,
		type: 'POST',
		url: HOST_URL + '/ajax/tag/store-meta',
		validate: function(value, pk) {
            if(value.keyword == '') 
				return 'Keyword is required!'; 
			if(value.description == '') 
				return 'Description is required!'; 
        },
		success: function(response, newValue) {
			datatable.table().draw();
		}, 
    });

    return {
        init: function() {
            grid();
        }
    };
}();

(function ($) {
    "use strict";
	
    var Input = function (options) {
        this.init('address', options, Input.defaults);
    };
	
    $.fn.editableutils.inherit(Input, $.fn.editabletypes.abstractinput);

    $.extend(Input.prototype, {   
        render: function() {
           this.$input = this.$tpl.find('input, textarea');
        },
       
		value2html: function(value, element) {
            if(!value) {
                $(element).empty();
                return; 
            }
		
			if(value.keyword) {
				var html = $('<div>').text(value.keyword).html();
				$(element).closest('tr').find('.txtkeyword').removeClass('font-italic')
					.removeClass('text-danger')
						.css("font-size", "")
							.html(html);
			}
			if(value.description) {
				var html = $('<div>').text(value.description).html();
				$(element).closest('tr').find('.txtdescription').removeClass('font-italic')
					.removeClass('text-danger')
						.css("font-size", "")
							.html(html);
			}
        },
          
        html2value: function(html) {
			var elem = this.options.scope;
			return {
				keyword: $(elem).closest('tr').find('span.txtkeyword').attr('data-val'), 
				description: $(elem).closest('tr').find('span.txtdescription').attr('data-val'), 
			};  
        },
      
		value2str: function(value) {	
			var str = '';
			if(value) {
				for(var k in value) {
					str = str + k + ':' + value[k] + ';';  
				}
			}
			return str;
		}, 
     
		str2value: function(str) {
			return str;
		},                
              
		value2input: function(value) {
			if(!value) {
				return;
			}
			this.$input.filter('[name="keyword"]').val(value.keyword);
			this.$input.filter('[name="description"]').val(value.description);
		},       
            
		input2value: function(value) { 
			return {
				keyword: this.$input.filter('[name="keyword"]').val(), 
				description: this.$input.filter('[name="description"]').val(), 
			};
		},        
            
		activate: function() {
			this.$input.filter('[name="keyword"]').focus();
		},  
        
		autosubmit: function() {
			this.$input.keydown(function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
			});
		}       
    });

    Input.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
        tpl: window.templates,
        inputclass: ''
    });

    $.fn.editabletypes.address = Input;

}(window.jQuery));

jQuery(document).ready(function() {
    KTDatatableJson.init();
});

window.templates = function () {
	return `<div style="margin-bottom:10px">
                <input type="text" name="keyword" class="form-control" placeholder="Keyword" style="width:100%" required>
			</div>
			<div>
                <textarea name="description" class="form-control" placeholder="Description" rows="4" style="width:100%" required></textarea>
			</div>`;
}

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
				url: HOST_URL + "/tag/" + id,
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

window.setHotTopic = function (id)
{
	let msg = 'Do you want to set this data as hot topic ?';
	Swal.fire({
        title: 'Set as Hot Topic',
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
				url: HOST_URL + "/ajax/tag/set-hot-topic",
				cache: false,
				data: {
					id: id 
				},
				success: function(data) {
					console.log(data.msg);
					Swal.fire(
						data.title,
						data.msg,
						data.status
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
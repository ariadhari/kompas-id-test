"use strict";
var datatable;
var uid = $('meta[data-for-external-file]').data('forExternalFile');

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
  				url: HOST_URL + '/datatables/users/article',
  				type: 'POST',
  				data: {
  				   param: uid,
  				},
  			},
  			order: [[ 1, 'desc' ]],
  			columns: [
  				{data: 'post_title'},
  				{data: 'post_date', name: 'posts.post_date'},
  				{data: 'post_hits'},
  				{data: 'post_status'},
  				{data: 'post_status_xml'},
  				{data: 'category_id', name: 'category.category_id'},
  				{data: 'post_feature'},
  				{data: 'post_is_premium'},
  				{data: 'post_live'},
  				{data: 'post_series'},
  				{data: 'post_is_longform'},
  				{data: 'post_kolom'},
  				{data: 'post_id'},
  				{data: 'action'},
  			],
  			columnDefs: [
  				{
  					targets: 0,
  					width: '400',
  					responsivePriority: 1,
  					render: function(data, type, full, meta) {
  						var liveLabel = '<span style="color:red">Live! </span>';
  						var premiumLabel = '';
  						if(full.post_is_premium == 1){
  							premiumLabel = '<small style="color:red;">*Premium</small> ';
  						}

  						if (full.post_image_type == 3) {
  							if (full.post_live == 0){
  								return premiumLabel + data + '<br><small style="color:#6c6c6c;">Video</small>';
  							}else{
  								return liveLabel + premiumLabel + data + '<br><small style="color:#6c6c6c;">Video</small>';
  							}
  						}else if (typeof full.post_subtitle == 'undefined' || full.post_subtitle === null || full.post_subtitle === '' && (full.post_series_order == 0)) {
  							if (full.post_live == 0) {
  								return premiumLabel + data;
  							}else {
  								return liveLabel + data;
  							}
  						}else if (full.post_series_order != 0 && (typeof full.post_subtitle == 'undefined' || full.post_subtitle === null || full.post_subtitle === '')){
  							return premiumLabel + data + '<br /> <small style="color:#6c6c6c;">' + ' Serie ' + full.post_series_order + ': ' + full.post_series_title + '</small>';
  						}else if (full.post_series_order == 0 && full.post_subtitle != ''){
  							return premiumLabel + full.post_subtitle + ' ' + data;
  						}else if (full.post_series_order != 0 && full.post_subtitle != '') {
  							return premiumLabel + full.post_subtitle + ' ' + data + '<br /><small style="color:#6c6c6c;">' + ' Serie ' + full.post_series_order + ': ' + full.post_series_title + '</small>';
  						}

  						return data;
  					}
  				},
  				{
  					targets: 2,
  					render: function(data, type, full, meta) {
  						if(data == '' || data == null){
  							return 0;
  						}
  						return data;
  					}
  				},
  				{
  					width: '75px',
  					targets: 3,
  					render: function(data, type, full, meta) {
  						var status = {
  							publish: {'title': 'Pending', 'class': 'label-light-primary'},
  							draft: {'title': 'Draft', 'class': 'label-light-danger'},
  							publish: {'title': 'Publish', 'class': 'label-light-success'},
  							revision: {'title': 'Revision', 'class': 'label-light-info'}
  						};

  						if (typeof status[data] === 'undefined') {
  							return data;
  						}

  						return '<span class="label label-lg font-weight-bold ' + status[data].class + ' label-inline">' + status[data].title + '</span>';
  					},
  				},
  				{
  					width: '75px',
  					targets: 4,
  					render: function(data, type, full, meta) {
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
  					render: function(data, type, full, meta) {
  						return full.category_name;
  					}
  				},
  				{
  					targets: 6,
  					render: function(data, type, full, meta) {
  						switch(data) {
  							case 1:
  								return full.post_level == 1 ? "Headline Home" : "Headline Kanal";
  								break;
  							case 2:
  								return "Editor's Choice";
  								break;
  							case 3:
  								return 'Trending';
  								break;
  							case 4:
  								return 'Must Read';
  								break;
  							case 6:
  								return full.post_level == 1 ? "Breaking Home" : "Breaking Kanal";
  								break;
  							default :
  								return 'Breaking Kanal';
  						}
  					}
  				},
  				{
  					width: '75px',
  					targets: 7,
  					render: function(data, type, full, meta) {
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
  					width: '75px',
  					targets: 8,
  					render: function(data, type, full, meta) {
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
  					width: '75px',
  					targets: 9,
  					render: function(data, type, full, meta) {
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
  					width: '75px',
  					targets: 10,
  					render: function(data, type, full, meta) {
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
  					width: '75px',
  					targets: 11,
  					render: function(data, type, full, meta) {
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
  					targets: 13,
  					width: '100',
  					title: 'Actions',
  					orderable: false,
  					responsivePriority: 2
  				}
  			],
  		});

  		var filter = function() {
  			var val = $.fn.dataTable.util.escapeRegex($(this).val());
  			datatable.column($(this).data('col-index')).search(val ? val : '', false, false).draw();
  		};

		$('#kt_datatable').on('xhr.dt', function ( e, settings, json, xhr ) {
			document.querySelector('.article').innerHTML = json.summary_post.article.toLocaleString();
			document.querySelector('.publish').innerHTML = json.summary_post.publish.toLocaleString();
			document.querySelector('.live').innerHTML = json.summary_post.live.toLocaleString();
			document.querySelector('.premium').innerHTML = json.summary_post.premium.toLocaleString();
			document.querySelector('.series').innerHTML = json.summary_post.series.toLocaleString();
			document.querySelector('.longform').innerHTML = json.summary_post.longform.toLocaleString();
		})

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

  		$('#kt_datepicker').datepicker({
  			todayHighlight: true,
  			format: "yyyy-mm-dd",
  			templates: {
  				leftArrow: '<i class="la la-angle-left"></i>',
  				rightArrow: '<i class="la la-angle-right"></i>',
  			},
  		});
		
		$('#category').select2();
		
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

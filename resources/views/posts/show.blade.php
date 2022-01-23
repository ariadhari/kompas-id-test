@extends('layouts.app')

@section('title')
Posts - View Record
@endsection

@section('styles')
<link rel="stylesheet" href="{{ asset('plugins/fancybox/jquery.fancybox.css') }}">
@endsection

@section('breadcrumb')
<div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
    <div class="d-flex align-items-center flex-wrap mr-2">
        <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">Posts</h5>
    </div>
</div>
@endsection

@section('content')
<div class="card card-custom">
    <div class="card-header">
        <h3 class="card-title">View Post</h3>
    </div>
    <form autocomplete="off">
        @csrf
        <div class="card-body">
            @include('posts._form')
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-lg-12">
                    <button type="button" onclick="window.location='{{ route('posts.index') }}'"
                        class="btn btn-light-primary font-weight-bold">Back</button>
                </div>
            </div>
        </div>
    </form>

</div>
@endsection

@prepend('scripts')
<script src="{{ asset('plugins/jquery-validation/jquery.validate.min.js') }}"></script>
<script src="{{ asset('plugins/jquery-validation/additional-methods.min.js') }}"></script>
<script src="{{ asset('plugins/tinymce/tinymce.min.js') }}"></script>
<script src="{{ asset('plugins/fancybox/jquery.fancybox.min.js') }}"></script>
<script src="{{ asset('js/pages/post_form.js') }}"></script>
<script>
	$("form :input").not( "#goback" ).attr("disabled","disabled");
	$('.fancybox').click(function(e) {
		e.preventDefault();
	});
</script>
@endprepend
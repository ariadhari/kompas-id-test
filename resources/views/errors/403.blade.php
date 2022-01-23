@extends('layouts.errors')

@section('styles')
<link href="{{ asset('css/pages/error/error-4.css') }}" rel="stylesheet" type="text/css" />
@endsection

@section('title') Forbidden - CMS Bisnis.com @endsection

@section('content')
<div class="d-flex flex-column flex-root">
    <div class="error error-4 d-flex flex-row-fluid bgi-size-cover bgi-position-center"
        style="background-image: url({{ asset('media/error/bg4.jpg') }});">
        <div
            class="d-flex flex-column flex-row-fluid align-items-center align-items-md-start justify-content-md-center text-center text-md-left px-10 px-md-30 py-10 py-md-0 line-height-xs">
            <h1 class="error-title text-success font-weight-boldest line-height-sm">403</h1>
            <p class="error-subtitle text-success font-weight-boldest mb-10">ERROR</p>
            <p class="display-4 text-danger font-weight-boldest mt-md-0 line-height-md">You do not have access to this
                page<br /> Back to the <a href="{{ route('home') }}">homepage</a></p>
        </div>
    </div>
</div>
@endsection
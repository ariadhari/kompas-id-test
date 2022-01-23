@extends('layouts.errors')

@section('styles')
<link href="{{ asset('css/pages/error/error-3.css') }}" rel="stylesheet" type="text/css" />
@endsection

@section('title') Internal Server Error - CMS Bisnis.com @endsection

@section('content')
<div class="d-flex flex-column flex-root">
    <div class="error error-6 d-flex flex-row-fluid bgi-size-cover bgi-position-center" style="background-image: url({{ asset('media/error/bg6.jpg') }});">
        <div class="d-flex flex-column flex-row-fluid text-center">
            <h1 class="error-title font-weight-boldest text-white mb-12" style="margin-top: 12rem;">Oops...</h1>
            <p class="display-4 font-weight-bold text-white">Looks like something went wrong.We're working on it</p>
        </div>
    </div>
</div>
@endsection
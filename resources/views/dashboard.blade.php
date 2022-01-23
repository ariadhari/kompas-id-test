@extends('layouts.app')

@section('breadcrumb')
<div class="container-fluid d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
    <div class="d-flex align-items-center flex-wrap mr-2">
        <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">Dashboard</h5>
    </div>
</div>
@endsection

@section('content')
<div class="row">
	<div class="col-lg-6 col-xl-12 mb-5">
		<div class="card card-custom wave mb-8 mb-lg-0">
			<div class="card-body">
				<div class="d-flex align-items-center p-5">
					<div class="d-flex flex-column">
						<a href="#" class="text-dark text-hover-primary font-weight-bold font-size-h4 mb-3">Get Started</a>
						<div class="text-dark-75">Welcome <strong> {{ session()->get('auth.name') }}</strong></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="col-xl-12">
		<div class="card card-custom card-stretch gutter-b">
			<div class="card-header h-auto border-0">
				<div class="card-title py-5">
					<h3 class="card-label">
						<span class="d-block text-dark font-weight-bolder">User Stat</span>
						<span class="d-block text-muted mt-2 font-size-sm">in {{ date('F Y') }} </span>
					</h3>
				</div>
			</div>

			<div class="card-body pt-2">
				<div class="row">
					<div class="col-12 d-flex flex-column">
						<div class="bg-light-warning p-8 rounded-xl flex-grow-1">
							<div class="d-flex">
								<div class="col-sm-2" style="display:flex; max-width:14.5%">
									<div class="symbol symbol-circle symbol-white symbol-30 flex-shrink-0 mr-3">
										<div class="symbol-label">
											<i class="flaticon2-paper text-info"></i>
										</div>
									</div>
									<div>
										<div class="font-size-sm font-weight-bold">{{ $countuser ? number_format($countuser->total_post) : 0 }}</div>
										<div class="font-size-sm text-muted">All Article</div>
									</div>
								</div>

								<div class="col-sm-2" style="display:flex; max-width:14.5%">
									<div class="symbol symbol-circle symbol-white symbol-30 flex-shrink-0 mr-3">
										<div class="symbol-label">
											<i class="flaticon-paper-plane text-success"></i>
										</div>
									</div>
									<div>
										<div class="font-size-sm font-weight-bold">{{ $countuser ? number_format($countuser->publish) : 0 }}</div>
										<div class="font-size-sm text-muted">Publish</div>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	{{-- <div class="col-xl-12">
		<div class="card card-custom gutter-b">
			<div class="card-header h-auto border-0">
				<div class="card-title py-5">
					<h3 class="card-label">
						<span class="d-block text-dark font-weight-bolder">Popular News</span>
						<span class="d-block text-muted mt-2 font-size-sm">24-hour news popular</span>
					</h3>
				</div>
			</div>

			<div class="card-body">
				<div class="tab-content m-0 pt-5">
					@foreach($popular as $k => $row)
						<div class="tab-pane {{ $loop->first ? 'active' : '' }}" id="tab{{ $k }}" role="tabpanel">
							<div class="card card-custom card-stretch gutter-b">
								<div class="card-header h-auto border-0">
									<div class="card-title py-5">
										<h3 class="card-label">
											<span class="d-block text-dark font-weight-bolder">{{ strtoupper($row->name) }}</span>
											<span class="d-block text-muted mt-2 font-size-sm">24-hour news popular in {{ strtolower($row->name) }}</span>
										</h3>
									</div>
								</div>
								<div class="card-body pt-0">
									@if(isset($row->article))
										@if($row->article->count() > 0)
											@foreach($row->article as $post)
											<div class="d-flex align-items-center mb-4 bg-light rounded p-5">
												<div class="d-flex flex-column flex-grow-1 mr-2">
													<a href="{{ Helper::generateUrlPost($post) }}" target="_blank" class="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1">{{ $post->post_title }}</a>
													<span class="text-muted font-weight-bold">{{ $post->author_name }}</span>
												</div>
												<span class="font-weight-bolder text-danger py-1 font-size-lg">{{ number_format($post->hits) }} hits</span>
											</div>
											@endforeach
										@else
											<div class="d-flex align-items-center mb-4 bg-light rounded p-5">
												<div class="d-flex flex-column flex-grow-1 mr-2">
													<a href="javascript:void(0)" class="font-weight-bold text-center  text-dark-75 font-size-lg mb-1">Nothing yet!</a>
												</div>
											</div>
										@endif
									@else
										<div class="d-flex align-items-center mb-4 bg-light rounded p-5">
											<div class="d-flex flex-column flex-grow-1 mr-2">
												<a href="javascript:void(0)" class="font-weight-bold text-center text-dark-75 font-size-lg mb-1">Nothing yet!</a>
											</div>
										</div>
									@endif
								</div>
							</div>
						</div>
					@endforeach
				</div>
			</div>
		</div>
	</div> --}}

</div>
@endsection

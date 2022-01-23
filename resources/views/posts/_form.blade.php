<div class="mb-3">
    <div class="mb-2">
        <div class="form-group row">
            <div class="col-lg-12">
                <label for="post_date">Date <span class="text-danger">*</span></label>
                <div class="input-group date @error('tanggal_terbit') is-invalid @enderror" id="post_date_datetimepicker"
                    data-target-input="nearest">
                    <input type="text" id="post_date" name="tanggal_terbit"
                        class="form-control form-control-solid datetimepicker-input" placeholder="Publish Date"
                        data-toggle="datetimepicker" data-target="#post_date_datetimepicker"
                        value="{{ old('post_date', $post->post_date ?? date('Y-m-d H:i:s')) }}" />
                    <div class="input-group-append" data-target="#post_date_datetimepicker"
                        data-toggle="datetimepicker">
                        <span class="input-group-text">
                            <i class="ki ki-calendar"></i>
                        </span>
                    </div>
                </div>
                @error('post_date')
                <div class="fv-plugins-message-container">
                    <div id="title-error" class="fv-help-block">
                        {{ $message }}
                    </div>
                </div>
                @enderror
            </div>
        </div>
        <div class="form-group row">
            <div class="col-lg-12">
                <label for="title">Judul <span class="text-danger">*</span></label>
                <input type="text" id="post_title" name="judul"
                    class="form-control @error('judul') is-invalid @enderror" placeholder="Judul"
                    value="{{ old('judul', $post->judul ?? null) }}" />
                <input type="hidden" id="state" name="state" value="{{ $state }}" />
                <input type="hidden" id="post_id" name="post_id" value="{{ $post->id ?? null }}" />
                <input type="hidden" id="post_date_old" name="post_date_old" value="{{ $post->tanggal_terbit ?? null }}" />
                @error('judul')
                <div class="fv-plugins-message-container">
                    <div id="title-error" class="fv-help-block">
                        {{ $message }}
                    </div>
                </div>
                @enderror
            </div>
        </div>
        <div class="form-group row">
            <div class="col-lg-12">
                <label for="post_content">Body <span class="text-danger">*</span></label>
                <textarea name="body" id="post_content"
                    class="form-control @error('body') is-invalid @enderror">{{ old('body', html_entity_decode($post->body ?? null) ?? null) }}</textarea>
                @error('post_content')
                <div class="fv-plugins-message-container">
                    <div id="title-error" class="fv-help-block">
                        {{ $message }}
                    </div>
                </div>
                @enderror
            </div>
        </div>
        <div class="form-group row">
            <div class="col-lg-6">
                <label for="post_author">Author <span class="text-danger">*</span></label>
                <select class="form-control select2 @error('author_id') is-invalid @enderror" id="post_author"
                    name="author_id">
                    <option value="">Select Author</option>
                    @foreach ($users as $user)
                    <option value="{{ $user['id'] }}" {{ ((old("author_id", $post->author_id ?? null) ==
                        $user['id']) ?? []) ? "selected" : ""}}>
                        {{ $user['nama'] }}</option>
                    @endforeach
                </select>
                @error('post_author')
                <div class="fv-plugins-message-container">
                    <div id="title-error" class="fv-help-block">
                        {{ $message }}
                    </div>
                </div>
                @enderror
            </div>
        </div>
    </div>
</div>

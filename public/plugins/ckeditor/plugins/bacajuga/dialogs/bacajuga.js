CKEDITOR.dialog.add( 'bacajugaDialog', function( editor ) {
    return {
        title: 'Baca Juga',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-detail',
                label: 'Detail',
                elements: [
                    {
                        type: 'text',
                        id: 'title',
                        label: 'Title',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Title field cannot be empty." )
                    },
                    {
                        type: 'text',
                        id: 'url',
                        label: 'URL',
                        validate: function() {
                            let value = this.getValue();
                            if ( !value ) {
                                alert( 'URL cannot be empty.' );
                                return false;
                            }

                            regexp =  /^(http:\/\/www.|https:\/\/www.|http:\/\/|https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
                            if (!regexp.test(value))
                            {
                                alert( 'URL invalid (contoh : http://www.google.com).' );
                            return false;
                            }

                        }
                        
                    }
                ]
            }
        ],
        onOk: function() {
            var dialog = this;

            editor.insertHtml('<a class="plus-baca-juga" href="'+dialog.getValueOf( 'tab-detail', 'url' )+'">'+dialog.getValueOf( 'tab-detail', 'title' )+'</a>');
        }
    };
});
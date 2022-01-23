CKEDITOR.dialog.add( 'keynoteDialog', function( editor ) {
    return {
        title: 'Keynote',
        minWidth: 400,
        minHeight: 200,
        contents: [
            {
                id: 'tab-detail',
                label: 'Detail',
                elements: [
                    {
                        type: 'textarea',
                        id: 'note',
                        label: 'Note',
                        validate: CKEDITOR.dialog.validate.notEmpty( "Note field cannot be empty." )
                    },
                    {
                        type: 'radio',
                        id: 'position',
                        label: 'Position',
                        items: [ [ 'Left', 'left' ], [ 'Right', 'right' ] ],
                        default: 'left'
                    }
                ]
            }
        ],
        onOk: function() {
            var dialog = this;
            editor.insertHtml('<blockquote class="plus-keynote-'+dialog.getValueOf( 'tab-detail', 'position' )+'"><p class="plus-keynote-'+dialog.getValueOf( 'tab-detail', 'position' )+'">'+dialog.getValueOf( 'tab-detail', 'note' )+'</p></blockquote>');
        }
    };
});
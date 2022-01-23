CKEDITOR.plugins.add( 'keynote', {
    icons: 'keynote',
    init: function( editor ) {
        editor.addCommand( 'keynote', new CKEDITOR.dialogCommand( 'keynoteDialog' ) );
        editor.ui.addButton( 'keynote', {
            label: 'Keynote',
            command: 'keynote',
            toolbar: 'insert'
        });

        CKEDITOR.dialog.add( 'keynoteDialog', this.path + 'dialogs/keynote.js' );
    }
});
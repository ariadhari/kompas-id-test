CKEDITOR.plugins.add( 'bacajuga', {
    icons: 'bacajuga',
    init: function( editor ) {
        editor.addCommand( 'bacajuga', new CKEDITOR.dialogCommand( 'bacajugaDialog' ) );
        editor.ui.addButton( 'bacajuga', {
            label: 'Baca Juga',
            command: 'bacajuga',
            toolbar: 'insert'
        });

        CKEDITOR.dialog.add( 'bacajugaDialog', this.path + 'dialogs/bacajuga.js' );
    }
});
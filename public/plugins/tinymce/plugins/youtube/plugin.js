tinymce.PluginManager.add("youtube", function (editor, url) {
    // Add a button that opens a window
    var icon_url = HOST_URL  + "/media/tinymce/social/youtube.png";
    editor.addButton("youtube", {
      text: false,
      icon: true,
      image: icon_url,
      tooltip: "Embed Youtube",
      onclick: function () {
        // Open window
        editor.windowManager.open({
          title: "Youtube Embed",
          body: [
            {
              type: "textbox",
              size: 50,
              height: "100px",
              name: "youtube",
              label: "Youtube Embed Code",
            },
          ],
          onsubmit: function (e) {
            // Insert content when the window form is submitted
            console.log(e.data.youtube);
            var embedCode1 = e.data.youtube;
            tinyMCE.activeEditor.insertContent(embedCode1);
            editor.windowManager.close();
          },
        });
      },
    });
  });
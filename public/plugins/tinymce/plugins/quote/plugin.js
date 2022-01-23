tinymce.PluginManager.add("quote", function (editor, url) {
    // Add a button that opens a window
    editor.addButton("quote", {
      text: "Insert quote",
      icon: false,
      tooltip: "Insert quote",
      onclick: function () {
        // Open window
        editor.windowManager.open({
          title: "Insert quote",
          body: [
            {
              type: "textbox",
              name: "quote",
              size: 100,
              label: "Quote",
              multiline: true,
              style: "width:400px; height:100px;",
            },
          ],
          onsubmit: function (e) {
            e.preventDefault();
            var isNotValid = false;
            var map = {
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#039;",
            };

            if (e.data.quote.trim() == "") {
              isNotValid = true;
              editor.windowManager.alert("Quote harus diisi.");
            }

            if (isNotValid == false) {
              var output =
                '<p class="big-orange"><span>"</span><br />' +
                e.data.quote +
                '"</p>';
              // Insert content when the window form is submitted
              editor.insertContent(output);
              editor.windowManager.close();
            }
          },
        });
      },
    });
  });
tinymce.PluginManager.add("bacajuga", function (editor, url) {
  // Add a button that opens a window
  editor.addButton("bacajuga", {
    text: "Insert Baca Juga",
    icon: false,
    tooltip: "Insert Baca Juga",
    onclick: function () {
      // Open window
      editor.windowManager.open({
        title: "Insert Baca Juga",
        body: [
          { type: "textbox", name: "title", size: 50, label: "Title" },
          { type: "textbox", name: "url", size: 50, label: "URL" },
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

          if (e.data.url.trim() == "" || e.data.title.trim() == "") {
            isNotValid = true;
            editor.windowManager.alert("Error : URL dan title harus diisi.");
          }

          //var checkUrl = e.data.url.match(/^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g);
          var checkUrl = e.data.url.match(
            "^(http://www.|https://www.|http://|https://)[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$"
          );

          if (e.data.url.trim() != "" && checkUrl == null) {
            isNotValid = true;
            editor.windowManager.alert(
              "URL invalid (contoh : http://www.google.com)."
            );
          }

          if (isNotValid == false) {
            var output =
              '<div class="baca-juga"><table><tr><th>Baca Juga : <span> <a href="' +
              e.data.url +
              '?utm_source=Desktop&utm_medium=Artikel&utm_campaign=BacaJuga"  target="_blank" title="' +
              e.data.title.replace(/[&<>"']/g, function (m) {
                return map[m];
              }) +
              '">' +
              e.data.title +
              "</a> </span></th></tr></table></div>";
            // Insert content when the window form is submitted
            editor.insertContent(output);
            editor.windowManager.close();
          }
        },
      });
    },
  });
});
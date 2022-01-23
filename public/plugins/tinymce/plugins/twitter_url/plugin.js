tinymce.PluginManager.add("twitter_url", function (editor, url) {
    var icon_url = HOST_URL  + "/media/tinymce/social/twitter.png";

    editor.on("init", function (args) {
      editor_id = args.target.id;
    });
    editor.addButton("twitter_url", {
      text: false,
      icon: true,
      image: icon_url,
      tooltip: "Embed Twitter",

      onclick: function () {
        editor.windowManager.open({
          title: "Twitter URL",

          body: [
            {
              type: "textbox",
              size: 40,
              height: "100px",
              name: "twitter",
              label: "Tweet Link",
            },
          ],
          onsubmit: function (e) {
            var tweetEmbedCode = e.data.twitter;

            $.ajax({
              url:
                "https://publish.twitter.com/oembed?maxwidth=840&maxheight=1000&url=" +
                tweetEmbedCode,
              dataType: "jsonp",
              async: false,
              success: function (data) {
                console.log(data);
                tinyMCE.activeEditor.insertContent(
                  '<div class="div_border" contenteditable="false">' +
                    data.html +
                    "</div>"
                );
              },
              error: function (jqXHR, exception) {
                var msg = "";
                if (jqXHR.status === 0) {
                  msg = "Not connect.\n Verify Network.";
                } else if (jqXHR.status == 404) {
                  msg = "Requested page not found. [404]";
                } else if (jqXHR.status == 500) {
                  msg = "Internal Server Error [500].";
                } else if (exception === "parsererror") {
                  msg = "Requested JSON parse failed.";
                } else if (exception === "timeout") {
                  msg = "Time out error.";
                } else if (exception === "abort") {
                  msg = "Ajax request aborted.";
                } else {
                  msg = "Uncaught Error.\n" + jqXHR.responseText;
                }
                alert(msg);
              },
            });
            setTimeout(function () {
              iframe.contentWindow.twttr.widgets.load();
            }, 1000);
          },
        });
      },
    });
  });
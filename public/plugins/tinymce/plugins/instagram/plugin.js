tinymce.PluginManager.add("instagram", function (editor, url) {
    // Add a button that opens a window
    var icon_url = HOST_URL  + "/media/tinymce/social/instagram.png";
    editor.addButton("instagram", {
      text: false,
      icon: true,
      image: icon_url,
      tooltip: "Embed Instagram",
      onclick: function () {
        // Open window
        editor.windowManager.open({
          title: "Instagram Embed",
          body: [
            {
              type: "textbox",
              size: 40,
              height: "100px",
              name: "instagram",
              label: "Embed Code",
            },
          ],
          onsubmit: function (e) {
            // Insert content when the window form is submitted
            console.log(e.data.instagram);
            var embedCode = e.data.instagram;
            var script = embedCode.match(/<script.*<\/script>/)[0];
            var scriptSrc = script.match(/".*\.js/)[0].split('"')[1];

            var sc = document.createElement("script");
            sc.setAttribute("src", scriptSrc);
            sc.setAttribute("type", "text/javascript");

            var iframe = document.getElementById(editor_id + "_ifr");
            var iframeHead = iframe.contentWindow.document.getElementsByTagName(
              "head"
            )[0];

            embedCode1 = embedCode.replace(
              "//platform.instagram.com/en_US/embeds.js",
              "https://platform.instagram.com/en_US/embeds.js"
            );

            tinyMCE.activeEditor.insertContent(embedCode1);
            iframeHead.appendChild(sc);
            setTimeout(function () {
              iframe.contentWindow.instgrm.Embeds.process();
            }, 1000);
          },
        });
      },
    });
  });
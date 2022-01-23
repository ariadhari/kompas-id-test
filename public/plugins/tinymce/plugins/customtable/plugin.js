var tbl2col =
    "<table>" +
    "<thead>" +
    "<tr>" +
    '<th class="thead_title" colspan="2">Lorem Ipsum Sit Dolor Amet</th>' +
    "</tr>" +
    "<tr>" +
    '<th class="thead_column">Title</th>' +
    '<th class="thead_column">Title</th>' +
    "</tr>" +
    "</thead>" +
    "<tbody>" +
    "<tr>" +
    "<td></td>" +
    "<td></td>" +
    "</tr>" +
    "<tr>" +
    "<td></td>" +
    "<td></td>" +
    "</tr>" +
    "<tr>" +
    "<td></td>" +
    "<td></td>" +
    "</tr>" +
    "</tbody>" +
    "</table>";
  var tbl3col =
    "<table>" +
    "<thead>" +
    "<tr>" +
    '<th class="thead_title" colspan="3">Lorem Ipsum Sit Dolor Amet</th>' +
    "</tr>" +
    "<tr>" +
    '<th class="thead_column">Title</th>' +
    '<th class="thead_column">Title</th>' +
    '<th class="thead_column">Title</th>' +
    "</tr>" +
    "</thead>" +
    "<tbody>" +
    "<tr>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "</tr>" +
    "<tr>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "</tr>" +
    "<tr>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "</tr>" +
    "</tbody>" +
    "</table>";
  var tbl4col =
    "<table>" +
    "<thead>" +
    "<tr>" +
    '<th class="thead_title" colspan="4">Lorem Ipsum Sit Dolor Amet</th>' +
    "</tr>" +
    "<tr>" +
    '<th class="thead_column">Title</th>' +
    '<th class="thead_column">Title</th>' +
    '<th class="thead_column">Title</th>' +
    '<th class="thead_column">Title</th>' +
    "</tr>" +
    "</thead>" +
    "<tbody>" +
    "<tr>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "</tr>" +
    "<tr>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "</tr>" +
    "<tr>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "</tr>" +
    "</tbody>" +
    "</table>";
  var tbl5col =
    "<table>" +
    "<thead>" +
    "<tr>" +
    '<th class="thead_title" colspan="5">Lorem Ipsum Sit Dolor Amet</th>' +
    "</tr>" +
    "<tr>" +
    '<th class="thead_column">Title</th>' +
    '<th class="thead_column">Title</th>' +
    '<th class="thead_column">Title</th>' +
    '<th class="thead_column">Title</th>' +
    '<th class="thead_column">Title</th>' +
    "</tr>" +
    "</thead>" +
    "<tbody>" +
    "<tr>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "</tr>" +
    "<tr>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "</tr>" +
    "<tr>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "<td></td>" +
    "</tr>" +
    "</tbody>" +
    "</table>";
    
tinymce.PluginManager.add("customtable", function (editor, url) {
    editor.addButton("customtable", {
      type: "menubutton",
      text: "Tabel",
      icon: false,
      menu: [
        {
          text: "2 Kolom",
          onclick: function () {
            editor.insertContent(tbl2col);
          },
        },
        {
          text: "3 Kolom",
          onclick: function () {
            editor.insertContent(tbl3col);
          },
        },
        {
          text: "4 Kolom",
          onclick: function () {
            editor.insertContent(tbl4col);
          },
        },
        {
          text: "5 Kolom",
          onclick: function () {
            editor.insertContent(tbl5col);
          },
        },
      ],
    });
  });
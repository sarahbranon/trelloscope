var onAuthorize = function() {
  updateLoggedIn();
  $("#output").empty();

  Trello.members.get("me", function(member){
    $("#fullName").text(member.fullName);

    var $boards = $("<div id='boards'>")
      .text("Loading Boards...")
      .appendTo("#output");

    // Output a list of all of the member's boards
    Trello.get("members/me/boards?fields=name,url", function(boards) {
      $boards.empty();
      $.each(boards, function(ix, board) {
        $("<a href= '#'>")
        .addClass("board")
        .text(board.name)
        .data("boardId", board.id)
        .click(function(e) {
          showBoard($(this));
          e.preventDefault();
        })
        .appendTo($boards);
      });
    });
  });
};

var showBoard = function($boardLink) {
  var boardId = $boardLink.data("boardId"),
      $boards = $("#boards");
  Trello.get("boards/"+boardId, function(board){
    $boards.empty();
    $("<div>")
    .text("Congrats, you've loaded "+board.name)
    .appendTo($boards);
  });
};

var updateLoggedIn = function() {
  var isLoggedIn = Trello.authorized();
  $("#loggedout").toggle(!isLoggedIn);
  $("#loggedin").toggle(isLoggedIn);
};

var logout = function() {
  Trello.deauthorize();
  updateLoggedIn();
};

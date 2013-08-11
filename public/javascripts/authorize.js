var updateLoggedIn = function() {
  var isLoggedIn = Trello.authorized();
  $("#loggedout").toggle(!isLoggedIn);
  $("#loggedin").toggle(isLoggedIn);
};

var logout = function() {
  Trello.deauthorize();
  updateLoggedIn();
};

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
      boardName = $boardLink.text(),
      $boards = $("#boards");

  $boards.empty().text("Loading "+boardName+"...");

  Trello.get("boards/"+boardId+"/actions?filter=createCard", function(creations){
    $boards.empty();
    $.each(creations, function(ix, creation) {
      var $creation = $("<div>").addClass("creation");
      $("<div>").addClass("date")
      .html("Date: "+creation.date)
      .appendTo($creation);
      $("<div>").addClass("cardName")
      .html("Card Name:"+creation.data.card.name)
      .appendTo($creation);
      // .data("boardId", board.id)
      // .click(function(e) {
      //   showBoard($(this));
      //   e.preventDefault();
      // })
      $creation.appendTo($boards);
    });
  });
};


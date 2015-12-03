function promoteIdea() {
  $('#latest-ideas').delegate('.glyphicon-thumbs-up', 'click', function() {
    var $idea = $(this).closest('.idea');
    if ($idea.attr('data-quality') !== "genius") {
      $.ajax({
        url: 'api/v1/ideas/' + $idea.attr('data-id') + '.json',
        type: 'PATCH',
        data: {'idea': {'quality': 'promote'}},
        success: function() {
          getIdea($idea);
        }
      })
    }
  })
}

function demoteIdea() {
  $('#latest-ideas').delegate('.glyphicon-thumbs-down', 'click', function() {
    var $idea = $(this).closest('.idea');
    if ($idea.attr('data-quality') !== "swill") {
      $.ajax({
        url: 'api/v1/ideas/' + $idea.attr('data-id') + '.json',
        type: 'PATCH',
        data: {'idea': {'quality': 'demote'}},
        success: function() {
          getIdea($idea);
        }
      })
    }
  })
}

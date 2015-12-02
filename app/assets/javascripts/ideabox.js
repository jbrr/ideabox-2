$(document).ready(function() {
  getIdeas();
  createIdea();
  deleteIdea();
  promoteIdea();
  demoteIdea();
});

function getIdeas() {
  $.getJSON('api/v1/ideas.json')
    .then(function(ideas){
      $.each(ideas, function(index, idea){
        renderIdea(idea)
    });
  });
}

function renderIdea(idea) {
  $("#latest-ideas").prepend(
    "<div class='idea' data-id='"
    + idea.id
    + "' data-quality='"
    + idea.quality
    + "'><h5>"
    + idea.title
    + "</h5><p>"
    + truncateBody(idea.body)
    + "</p><p class='quality'>Quality: "
    + idea.quality
    + "</p><button class='glyphicon glyphicon-thumbs-up'></button> "
    + "<button class='glyphicon glyphicon-thumbs-down'></button><br>"
    + "<button id='delete-idea' class='btn btn-default btn-xs'>Delete</button></div>"
  )
}

function truncateBody(body) {
  if (body.length > 100) {
    return $.trim(body).substring(0, 100)
      .split(" ").slice(0, -1).join(" ") + "...";
  } else {
    return body;
  }
}

function createIdea() {
  $('#create-idea').on('click', function(){
    var ideaTitle  = $('#idea-title').val()
    var ideaBody   = $('#idea-body').val()
    var ideaParams = {
      idea: {
        title: ideaTitle,
        body: ideaBody
      }
    }

    $('#idea-title').val('');
    $('#idea-body').val('');

    $.post("api/v1/ideas.json", ideaParams, $(this).serialize())
      .done(renderIdea);
  });
}

function deleteIdea() {
  $('#latest-ideas').delegate('#delete-idea', 'click', function() {
    var $idea = $(this).closest('.idea');

    $.ajax({
      type: 'DELETE',
      url: 'api/v1/ideas/' + $idea.attr('data-id') + '.json',
      success: function() {
        renderIdea;
      }
    });
  });
}

function promoteIdea() {
  $('#latest-ideas').delegate('.glyphicon-thumbs-up', 'click', function() {
    var $idea = $(this).closest('.idea');
    if ($idea.attr('data-quality') !== "genius") {
      $.ajax({
        url: 'api/v1/ideas/' + $idea.attr('data-id') + '.json',
        type: 'PATCH',
        data: {'idea': {'quality': 'promote'}},
        success: function() {
          renderIdea;
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
          renderIdea;
        }
      })
    }
  })
}

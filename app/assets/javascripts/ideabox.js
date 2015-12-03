$(document).ready(function() {
  getIdeas();
  createIdea();
  deleteIdea();
  promoteIdea();
  demoteIdea();
  searchIdeas();
  prepopulate();
});

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
      success: function(response) {
        $idea.remove();
      }
    });
  });
}

function getIdea($idea) {
  $.getJSON('api/v1/ideas/' + $idea.attr('data-id') + '.json')
    .then(function(response) {
      var $quality = $idea.find('.quality');
      $quality.html('Quality: ' + response.quality);
      $idea.attr('data-quality', response.quality);
  });
}

function searchIdeas() {
  $("#filter").keyup(function(){
		var filter = $(this).val();
		$("#latest-ideas .idea").each(function(){
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).fadeOut();
			} else {
				$(this).show();
			}
		});
	});
}

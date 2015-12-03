require "test_helper"

class UserCanChangeQualityOfIdeaTest < ActionDispatch::IntegrationTest  
  test "user can promote idea" do
    visit "/"
    first(".glyphicon-thumbs-up").click
    assert page.has_content?("Plausible")

    first(".glyphicon-thumbs-up").click
    assert page.has_content?("Genius")
  end

  test "user can demote idea" do
    visit "/"
    first(".glyphicon-thumbs-up").click
    first(".glyphicon-thumbs-up").click
    first(".glyphicon-thumbs-down").click
    assert page.has_content?("Plausible")

    first(".glyphicon-thumbs-down").click
    assert page.all(".idea").first.has_content?("Swill")
  end
end

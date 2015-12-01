require "test_helper"

class UserCanDeleteIdeaTest < ActionDispatch::IntegrationTest
  test "user deletes an idea" do
    visit "/"
    first("#delete-idea").click
    refute page.has_content?("Later Idea")
  end
end

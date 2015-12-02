require "test_helper"

class UserCanDeleteIdeaTest < ActionDispatch::IntegrationTest
  def teardown
    Capybara.reset_sessions!
  end

  test "user deletes an idea" do
    visit "/"
    first("#delete-idea").click
    refute page.has_content?("Later Idea")
  end
end

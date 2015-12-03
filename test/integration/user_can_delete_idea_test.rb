require "test_helper"

class UserCanDeleteIdeaTest < ActionDispatch::IntegrationTest
  def teardown
    Capybara.reset_sessions!
  end

  test "user deletes an idea" do
    visit "/"
    fill_in("idea-title", with: "New Idea")
    fill_in("idea-body", with: "New Body")
    click_on("Create Idea")
    assert page.has_content?("New Idea")
    assert page.has_content?("New Body")

    first("#delete-idea").click
    save_and_open_page
    refute page.has_content?("New Idea")
  end
end

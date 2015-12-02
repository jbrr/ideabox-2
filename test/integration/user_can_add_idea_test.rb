require "test_helper"

class UserCanAddIdeaTest < ActionDispatch::IntegrationTest
  def teardown
    Capybara.reset_sessions!
  end
  
  test "user can add idea" do
    visit "/"
    fill_in("idea-title", with: "New Idea")
    fill_in("idea-body", with: "New Body")
    click_on("Create Idea")
    assert page.has_content?("New Idea")
    assert page.has_content?("New Body")
  end
end

require "test_helper"

class UserCanAddIdeaTest < ActionDispatch::IntegrationTest
  include Capybara::DSL

  def setup
    Capybara.app = Ideabox2::Application
    Capybara.current_driver = :selenium
    Capybara.default_max_wait_time = 5
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

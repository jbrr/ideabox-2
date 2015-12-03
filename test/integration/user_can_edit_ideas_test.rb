require "test_helper"

class UserCanEditIdeasTest < ActionDispatch::IntegrationTest
  test "user can edit title" do
    visit "/"
    title = first(:xpath, "//h5[@contenteditable='true']")
    title.set("Hello")
    title.native.send_keys(:return)
    assert page.has_content?("Hello")
  end

  test "user can edit body" do
    visit "/"
    body = first(:xpath, "//p[@contenteditable='true']")
    body.set("New body")
    body.native.send_keys(:return)
    assert page.has_content?("New body")
  end
end

require "test_helper"

class UserCanChangeQualityOfIdeaTest < ActionDispatch::IntegrationTest
  test "user can promote idea" do
    visit "/"
    first("#promote-idea").click
    assert page.has_content?("plausible")

    first("#promote-idea").click
    assert page.has_content?("genius")
  end

  test "user can demote idea" do
    visit "/"
    first("promote-idea").click
    first("promote-idea").click
    first("#demote-idea").click
    assert page.has_content?("plausible")

    first("#demote-idea").click
    assert page.all(".idea").first.has_content?("swill")
  end
end

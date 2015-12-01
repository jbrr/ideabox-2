class IdeasController < ApplicationController
  def index
    @ideas = Idea.all.sort_by(&:created_at).reverse
  end
end

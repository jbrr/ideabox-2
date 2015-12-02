class Api::V1::IdeasController < ApplicationController
  respond_to :json

  def index
    respond_with Idea.all
  end

  def show
    respond_with Idea.find(params[:id])
  end

  def create
    respond_with Idea.create(idea_params), location: nil
  end

  def destroy
    respond_with Idea.destroy(params[:id])
  end

  def update
    idea = Idea.find(params[:id])
    if params[:idea][:quality]
      update_quality(idea)
    else
      respond_with idea.update(idea_params), location: nil
    end
    idea.save
  end

  private

  def idea_params
    params.require(:idea).permit(:title, :body, :quality)
  end

  def update_quality(idea)
    if params[:idea][:quality] == "promote"
      respond_with idea[:quality] += 1, location: nil
    else
      respond_with idea[:quality] -= 1, location: nil
    end
    idea.save
  end
end

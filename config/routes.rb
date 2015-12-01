Rails.application.routes.draw do
  root "ideas#index"

  namespace :api do
    namespace :v1 do
      resources :ideas, except: [:show]
    end
  end
end

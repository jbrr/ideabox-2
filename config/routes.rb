Rails.application.routes.draw do
  root "ideas#index"
  
  namespace :api do
    namespace :v1 do
      resources :ideas, except: [:index, :show]
    end
  end
end

Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }
  
  namespace :auth do
    resources :sessions, only: %i[index]
  end
  # 予定一覧
  get '/calendar_events', to: 'calendar_events#index'
  # 予定作成
  post '/calendar_events', to: 'calendar_events#create'
  # 予定更新
  put '/calendar_events/:id', to: 'calendar_events#update'
  # 予定削除
  delete '/calendar_events/:id', to: 'calendar_events#destroy'
end

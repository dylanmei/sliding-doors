$LOAD_PATH.unshift File.join(File.dirname(__FILE__), 'app')
require 'application'

run Sinatra::Application

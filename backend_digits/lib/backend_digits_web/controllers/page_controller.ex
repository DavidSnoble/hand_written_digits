defmodule BackendDigitsWeb.PageController do
  use BackendDigitsWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end

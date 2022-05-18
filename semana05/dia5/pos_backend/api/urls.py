from django.urls import path
from . import views

urlpatterns = [
    path('', views.IndexView.as_view()),

    ##agregamos url de los serialziers

    path('categoria',views.CategoriaView.as_view()),

    #mesa
    path('mesa',views.MesaView.as_view()),
    
    #plato
    path('plato',views.PlatoView.as_view()),

    #categoriaplatos
       path('categoria/<int:categoria_id>/platos',views.CategoriaPlatosView.as_view()),

    #pedido

    path('pedido',views.PedidoView.as_view()),
    
]

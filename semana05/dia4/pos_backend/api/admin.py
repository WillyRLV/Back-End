from django.contrib import admin

# Register your models here.

from . models import Mesa, Categoria, Pedido, PedidoPlato , Plato

admin.site.register(Mesa)
admin.site.register(Categoria)
admin.site.register(Plato)
admin.site.register(Pedido)
admin.site.register(PedidoPlato)



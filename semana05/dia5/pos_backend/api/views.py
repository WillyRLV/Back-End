from rest_framework.views import APIView
from rest_framework.response import Response

##autenticacion
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# from rest_framework.permissions import IsAuthenticated


##importamos los models

from .models import(Categoria,Mesa, Pedido,Plato)

##impoprtamos serializer
from .serializers import (CategoriaPlatosSerializer, CategoriaSerializer, MesaSerializer, PedidoSerializerGET, PlatoSerializer ,PedidoSerializerPOST)

class IndexView(APIView):

    # authentication_classes=[SessionAuthentication,BasicAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self,request): 
        context = {
            'ok':True,
            'message':'this server is enable!'
        }

        return Response(context)
        
#creamos unas clases de los serializers
#categoria
class CategoriaView(APIView):
    def get(self,request):
        dataCategoria = Categoria.objects.all()
        serCategoria = CategoriaSerializer(dataCategoria,many=True)

        context = {
            'ok':True,
            'content':serCategoria.data
        }

        return Response(context)

#mesa
class MesaView(APIView):
    def get(self,request):
        dataMesa = Mesa.objects.all()
        serMesa = MesaSerializer(dataMesa,many=True)

        context = {
            'ok':True,
            'content':serMesa.data
        }

        return Response(context)

#plato
class PlatoView(APIView):
    def get(self,request):
        dataPlato = Plato.objects.all()
        serPlato = PlatoSerializer(dataPlato,many=True)

        context = {
            'ok':True,
            'content':serPlato.data
        }

        return Response(context)
        

##cateogira platos serializers

class CategoriaPlatosView(APIView):
    def get(self,request,categoria_id):
        dataCategoria = Categoria.objects.get(pk=categoria_id)
        serCategoriaPlatos = CategoriaPlatosSerializer(dataCategoria)
        context={
            'ok':True,
            'content':serCategoriaPlatos.data
        }

        return Response(context)



class PedidoView(APIView):
    def get(self, request):
        dataPedido = Pedido.objects.all()
        serPedido = PedidoSerializerGET(dataPedido,many=True)

        context = {
            'ok':True,
            'pedidos':serPedido.data
        }
        return Response(context)
    
    def post(self,request):
        serPedido = PedidoSerializerPOST(data=request.data)
        serPedido.is_valid(raise_exception=True) ##raise_exception =  esta excepción da como resultado una respuesta con el código de estado HTTP "400 Bad Request".
        serPedido.save()

        context = {
            'ok':True,
            'content':serPedido.data
        }
        return Response(context)

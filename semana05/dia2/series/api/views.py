from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Series
from .serializers import SerieSerializer

class IndexView(APIView):

    def get(self,request):
        context = {'mensaje':'servidor activo'}
        return Response(context)

#vista para lista de series
class SeriesView(APIView):
    
    def get(self,request):
        dataSeries = Series.objects.all()
        serSeries = SerieSerializer(dataSeries,many=True)
        return Response(serSeries.data)
    
    def post(self,request):
        serSerie = SerieSerializer(data=request.data)
        serSerie.is_valid(raise_exception=True)
        serSerie.save()

        return Response(serSerie.data)

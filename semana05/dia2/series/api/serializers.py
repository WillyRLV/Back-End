from rest_framework import serializers

from .models import Series

class SerieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Series
        fields = '__all__'
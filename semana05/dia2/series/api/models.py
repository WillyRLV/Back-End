
from django.db import models

# Create your models here.


class Series(models.Model):
    
    HORROR = 'horror'
    COMEDY = 'comedy'
    ACTION = 'action'
    DRAMA = 'drama'

    CATEGORIA_CHOICES = ( 
    (HORROR , 'horror'),
    (COMEDY , 'comedy'),
    (ACTION , 'action'),
    (DRAMA , 'drama')
    )

    name= models.CharField(max_length=100)
    release_date = models.DateField()
    rating = models.IntegerField(default=0)
    category = models.CharField(max_length=10,choices=CATEGORIA_CHOICES)

    def __str__(self):
        return self.name
        
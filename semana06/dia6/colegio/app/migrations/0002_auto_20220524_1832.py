# Generated by Django 3.2 on 2022-05-24 23:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='blog',
            name='url',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AlterField(
            model_name='blog',
            name='name',
            field=models.CharField(default='', max_length=100),
        ),
    ]

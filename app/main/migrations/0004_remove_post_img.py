# Generated by Django 5.1.3 on 2024-11-09 17:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_post_delete_vkpost'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='img',
        ),
    ]

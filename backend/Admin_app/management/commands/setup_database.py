from django.core.management.base import BaseCommand
from django.core.management import call_command
from ..database_setup import create_database


class Command(BaseCommand):
    def handle(self, *args, **options):
        create_database()
        call_command('makemigrations')
        call_command('migrate')
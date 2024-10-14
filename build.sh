set -o errexit # exit on error

pip install -r requirements.txt

python manage.py collectstatic --no-input
python manage.py setup_database
python manage.py migrate
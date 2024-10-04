import mysql.connector
from django.conf import settings


def create_database():
    db_config = settings.DATABASES['default']
    try:
        cnx = mysql.connector.connect(
            user='root',
            
            host='localhost'
        )
        cursor = cnx.cursor()

        # Create database
        query = f"CREATE DATABASE IF NOT EXISTS {db_config['NAME']};"
        cursor.execute(query)
        cnx.commit()

        # Create user
        query = f"CREATE USER IF NOT EXISTS '{db_config['USER']}'@'localhost' IDENTIFIED BY '{db_config['PASSWORD']}';"
        cursor.execute(query)
        cnx.commit()

        # Grant privileges
        query = f"GRANT ALL PRIVILEGES ON {db_config['NAME']}.* TO '{db_config['USER']}'@'localhost';"
        cursor.execute(query)
        cnx.commit()

    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        cnx.close()
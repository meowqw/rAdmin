#!/usr/bin/python3
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/rAdmin/")

from admin import app as application
application.secret_key = 'secret'
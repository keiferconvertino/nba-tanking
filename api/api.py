from flask import Flask, g
import sqlite3
import time
import os
import sys
app = Flask(__name__)

DATABASE = 'nba.db'

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(os.path.abspath(DATABASE))

    def make_dicts(cursor, row):
        return dict((cursor.description[idx][0], value)
                    for idx, value in enumerate(row))

    db.row_factory = make_dicts

    return db


def query_db(query, args=()):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return rv


@app.route('/time')
def get_current_time():
    res = query_db('SELECT PLAYER_NAME FROM PLAYER_STATS ORDER BY RANDOM() LIMIT 1')
    return res[0]
    return {'time': time.time()}

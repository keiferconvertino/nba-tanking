from flask import Flask, g
import sqlite3
from flask.json import jsonify
import os
import random

app = Flask(__name__)

DATABASE = 'nba.db'

lottery_balls = [140, 140, 140, 125, 105, 90, 75, 60, 45, 30, 20, 15, 10, 5]
lottery_odds = [0 for i in range(len(lottery_balls))]
lottery_odds[0] = lottery_balls[0]

for i in range(1, len(lottery_balls)):
    lottery_odds[i] = lottery_odds[i-1] + lottery_balls[i]


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


@app.route('/test')
def get_test():
    res = query_db('SELECT PLAYER_NAME, PTS, GP FROM PLAYER_STATS ORDER BY RANDOM() LIMIT 1')
    return jsonify(res)

@app.route('/playoff_teams')
def get_teams():
    query = 'SELECT TeamCity, WinPCT, Record FROM TEAM_STATS WHERE PlayoffRank <= 8 ORDER BY WinPCT'
    res = query_db(query)
    return jsonify(res)

@app.route('/lottery_teams')
def get_lottery_teams():
    query = 'SELECT TeamCity, WinPCT, Record FROM TEAM_STATS WHERE PlayoffRank > 8 ORDER BY WinPCT'
    res = query_db(query)
    return jsonify(res)

@app.route('/tank_leaders')
def get_tank_leaders():
    query = 'SELECT PLAYER_NAME, TEAM_ABBREVIATION, PLUS_MINUS * MIN AS TANK_RANK FROM PLAYER_STATS ORDER BY TANK_RANK ASC LIMIT 10'
    res = query_db(query)
    return jsonify(res)

@app.route('/simulate')
def simulate_lottery():
    query = 'SELECT TeamCity, WinPCT, Record FROM TEAM_STATS WHERE PlayoffRank > 8 ORDER BY WinPCT'
    lottery_teams = query_db(query)
    rank = {}

    for i, team in enumerate(lottery_teams):
        rank[i] = team

    picks_made = []
    while len(picks_made) < 4:
        ball = random.randint(0, 1000)
        for i, odds in enumerate(lottery_odds):
            if odds > ball:
                if i not in picks_made:
                    picks_made.append(i)
                break

    res = [rank[pick] for pick in picks_made]

    for i in range(len(lottery_teams)):
        if i not in picks_made:
            res.append(rank[i])

    return jsonify(res)

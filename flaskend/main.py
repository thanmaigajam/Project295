import pandas as pd
import requests
from flask import Flask,request
from flask_pymongo import PyMongo
from flask_restful import Api, Resource, abort, reqparse
import json
import time

from werkzeug.datastructures import Authorization
app = Flask(__name__)
api = Api(app)

with open("config.json") as config_file:
    config_data = json.load(config_file)

CLIENT_ID = config_data['reddit']['clientid']
SECRET_KEY = config_data['reddit']['secretkey']
auth = requests.auth.HTTPBasicAuth(CLIENT_ID, SECRET_KEY)

head= {'User-Agent': 'MyAPI/0.0.1'}

data = {
    "grant_type" : config_data['reddit']['grant_type'],
    "username": config_data['reddit']['username'],
    "password": config_data['reddit']['password']
}
head= {'User-Agent': 'MyAPI/0.0.1'}

@app.route('/getreviews_reddit/')
def get_redditreviews():
    res = requests.post('https://www.reddit.com/api/v1/access_token', auth=auth, data=data, headers=head)
    TOKEN = 'bearer ' + res.json()['access_token']
    headers = {'Authorization': TOKEN,'User-Agent': 'MyAPI/0.0.1' }
    print("request - limit",request.args.get('limitval'))
    res1 = requests.get('https://oauth.reddit.com/r/starbucks/hot?limit='+request.args.get('limitval'), headers=headers)
    df = pd.DataFrame()
    for post in res1.json()['data']['children']:
        df = df.append({
            'subeddit':post['data']['subreddit'],
            'title':post['data']['title'],
            'selftext':post['data']['selftext'],
            'upvote_ratio':post['data']['upvote_ratio'],
            'ups':post['data']['ups'],
            'downs':post['data']['downs'],
            'num_comments':post['data']['num_comments'],
            'created_utc':post['data']['created_utc'], #Check the date
            'subreddit_subscribers':post['data']['subreddit_subscribers'], 
        }, ignore_index = True)
    print(df)

    client = PyMongo(app,uri = config_data['mongodb_config'])
    db = client.db
    print(db)
    # db = client
    review_data = {"name":"Prasanna","review":"Starbucks is amazing"}
    try:
        dbres = db.twitterreviews.insert_one(review_data)
        for attr in dir(dbres):
            print(attr)
    except Exception as ex:
        print(ex)
    return {"data":"success sent to database"} 


@app.route('/getreviews_yelp/')
def getreviews_yelp():
    headers = {
        'Authorization' : 'bearer '+ config_data['yelp']['token']
    }
    params = {
        'term' : request.args.get('term'),
        'location' : request.args.get('location')
    }
    print(request.args.get('term'))
    print(request.args.get('location'))
    url = 'https://api.yelp.com/v3/businesses/search?term='+params['term']+'&location='+params['location']
    print(url)
    result = requests.get(url,headers=headers)
    df_ids = pd.DataFrame()
    df_reviews = pd.DataFrame()
    for post in result.json()['businesses']:
        df_ids = df_ids.append({
            'id':post['id']
        },ignore_index=True)
    print(df_ids['id'].shape[0])
    for id_val in range(df_ids['id'].shape[0]):
        print(df_ids['id'][id_val])
        idval = df_ids['id'][id_val]
        time.sleep(1)
        url = 'https://api.yelp.com/v3/businesses/'+idval+'/reviews'
        result = requests.get(url,headers=headers)
        for post in result.json()['reviews']:
            df_reviews = df_reviews.append({
                'text':post['text'],
                'rating': post['rating']
            },ignore_index=True)

    return df_reviews.to_json()

@app.route('/getreviews_twitter/')
def getreviews_twitter():
    print(request.args.get("query"))
    print(request.args.get("tweet.fields"))
    print(request.args.get("max_results"))
    headers = {
      "User-Agent": config_data['twitter']['user_agent'],
      "authorization": 'Bearer '+config_data['twitter']['token']
    }
    params = {
    "query": "Starbucks",
    "tweet.fields": "author_id",
    "max_results": 10,
    }
    results = requests.get('https://api.twitter.com/2/tweets/search/recent',params,headers=headers)
    print(results.json())
    return results.json()

if __name__ == "__main__":
    app.run(debug=True)

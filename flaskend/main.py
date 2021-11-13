import pandas as pd
import requests
from flask import Flask,request
from flask_pymongo import PyMongo
from flask_restful import Api, Resource, abort, reqparse
import json
import time
from datetime import date
import certifi
import copy

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

import re
import time

import numpy as np
import pandas as pd
from pprint import pprint

# Gensim
import gensim
import gensim.corpora as corpora
from gensim.utils import simple_preprocess
from gensim.models import CoherenceModel
from gensim.models.wrappers import LdaMallet

# spacy for lemmatization
import spacy

# Plotting tools
import pyLDAvis
import pyLDAvis.gensim  # don't skip this
# import pyLDAvis.gensim_models as gensimvis
import matplotlib.pyplot as plt
# %matplotlib inline

# Enable logging for gensim - optional
import logging
logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.ERROR)

import warnings
warnings.filterwarnings("ignore",category=DeprecationWarning)

import nltk
# nltk.download('stopwords')
from nltk.corpus import stopwords

#  For Text Blob
from nltk.tokenize.treebank import TreebankWordDetokenizer

from textblob import TextBlob

STATES_ABBREVIATION_MAP = {
  "AL": "Alabama",
  "AK": "Alaska",
  "AZ": "Arizona",
  "AR": "Arkansas",
  "CA": "California",
  "CO": "Colorado",
  "CT": "Connecticut",
  "DE": "Delaware",
  "DC": "District Of Columbia",
  "FL": "Florida",
  "GA": "Georgia",
  "HI": "Hawaii",
  "ID": "Idaho",
  "IL": "Illinois",
  "IN": "Indiana",
  "IA": "Iowa",
  "KS": "Kansas",
  "KY": "Kentucky",
  "LA": "Louisiana",
  "ME": "Maine",
  "MD": "Maryland",
  "MA": "Massachusetts",
  "MI": "Michigan",
  "MN": "Minnesota",
  "MS": "Mississippi",
  "MO": "Missouri",
  "MT": "Montana",
  "NE": "Nebraska",
  "NV": "Nevada",
  "NH": "New Hampshire",
  "NJ": "New Jersey",
  "NM": "New Mexico",
  "NY": "New York",
  "NC": "North Carolina",
  "ND": "North Dakota",
  "OH": "Ohio",
  "OK": "Oklahoma",
  "OR": "Oregon",
  "PA": "Pennsylvania",
  "RI": "Rhode Island",
  "SC": "South Carolina",
  "SD": "South Dakota",
  "TN": "Tennessee",
  "TX": "Texas",
  "UT": "Utah",
  "VT": "Vermont",
  "VA": "Virginia",
  "WA": "Washington",
  "WV": "West Virginia",
  "WI": "Wisconsin",
  "WY": "Wyoming"
}

# topic_keywords = []
def deEmojify(text):
    regrex_pattern = re.compile(pattern = "["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
        u"\U0001f972-\U0001f972"
                           "]+", flags = re.UNICODE)
    return regrex_pattern.sub(r'',text)

def sent_to_words(sentences):
    for sentence in sentences:
        yield(gensim.utils.simple_preprocess(str(sentence), deacc=True))  # deacc=True removes punctuations

stop_words = stopwords.words('english')
stop_words.extend(['from', 'subject', 're', 'edu', 'use'])

# Define functions for stopwords, bigrams, trigrams and lemmatization
def remove_stopwords(texts):
    return [[word for word in simple_preprocess(str(doc)) if word not in stop_words] for doc in texts]

def make_bigrams(texts):
    return [bigram_mod[doc] for doc in texts]

# def make_trigrams(texts):
#     return [trigram_mod[bigram_mod[doc]] for doc in texts]
nlp = spacy.load('en', disable=['parser', 'ner'])
def lemmatization(texts, allowed_postags=['NOUN', 'ADJ', 'VERB', 'ADV']):
    """https://spacy.io/api/annotation"""
    texts_out = []
    for sent in texts:
        doc = nlp(" ".join(sent)) 
        texts_out.append([token.lemma_ for token in doc if token.pos_ in allowed_postags])
    return texts_out

def format_topics_sentences(ldamodel, corpus, texts):
    # Init output
    sent_topics_df = pd.DataFrame()
    topic_keywords = []
    # Get main topic in each document
    for i, row in enumerate(ldamodel[corpus]):
        row = sorted(row, key=lambda x: (x[1]), reverse=True)
        # Get the Dominant topic, Perc Contribution and Keywords for each document
        for j, (topic_num, prop_topic) in enumerate(row):
            if j == 0:  # => dominant topic
                wp = ldamodel.show_topic(topic_num)
                topic_keywords = ", ".join([word for word, prop in wp])
                sent_topics_df = sent_topics_df.append(pd.Series([int(topic_num), round(prop_topic,4), topic_keywords]), ignore_index=True)
            else:
                break
    sent_topics_df.columns = ['Dominant_Topic', 'Perc_Contribution', 'Topic_Keywords']

    # Add original text to the end of the output
    contents = pd.Series(texts)
    sent_topics_df = pd.concat([sent_topics_df, contents], axis=1)
    return sent_topics_df

# Get the polarity score using below function
def get_textBlob_score(sent):
    # This polarity score is between -1 to 1
    polarity = TextBlob(sent).sentiment.polarity
    return polarity
def get_donut_sentiment_counts(texblog_senti_scores):
    sentiments_three_textblob = []
    for each in texblog_senti_scores:
        if(each >0):
            a=1
        elif(each == 0):
            a=0
        else:
            a=-1
        sentiments_three_textblob.append(a)
    sentiments_three_textblob_df = pd.DataFrame(sentiments_three_textblob)
    return sentiments_three_textblob_df

def convert_utc_to_date(time_in_utc):
    return time.strftime('%Y-%m-%d', time.localtime(time_in_utc))

def convert_utc_to_date_list(utc_list):
    return [convert_utc_to_date(x) for x in utc_list]

def get_line_graph_polarity_dates_reddit(df_full):
    polarity_pos_utc = df_full.loc[df_full['polarity three'] == 1, 'created_utc'].to_list()
    polarity_neu_utc = df_full.loc[df_full['polarity three'] == 0, 'created_utc'].to_list()
    polarity_neg_utc = df_full.loc[df_full['polarity three'] == -1, 'created_utc'].to_list()
    polarity_wise_utc_dates = []
    polarity_wise_utc_dates.append(convert_utc_to_date_list(polarity_pos_utc))
    polarity_wise_utc_dates.append(convert_utc_to_date_list(polarity_pos_utc))
    polarity_wise_utc_dates.append(convert_utc_to_date_list(polarity_pos_utc))
    return polarity_wise_utc_dates


def processing(df_title, source, brand, location):
    print("df_title in processing")
    print(df_title.head())
    df_title.text[df_title.text.str.match(pat = '(https)|(http)|(www.)',na = False)]
    de_emotext = []
    for text in df_title.text:
        text = deEmojify(text)
        de_emotext.append(text)

    df_de_emotext = pd.DataFrame(de_emotext)

    list_sentences = de_emotext

    list_sentences_tokenized = list(sent_to_words(list_sentences))
    list_sentences_tokenized_copy = list(sent_to_words(list_sentences))

    # Build the bigram and trigram models

    start_time = time.time()

    bigram = gensim.models.Phrases(list_sentences_tokenized, min_count=5, threshold=100) # higher threshold fewer phrases.
    trigram = gensim.models.Phrases(bigram[list_sentences_tokenized], threshold=100)  

    # Faster way to get a sentence clubbed as a trigram/bigram
    bigram_mod = gensim.models.phrases.Phraser(bigram)
    trigram_mod = gensim.models.phrases.Phraser(trigram)

    # See trigram example
    print(trigram_mod[bigram_mod[list_sentences_tokenized[0]]])

    print("--- %s seconds ---" % (time.time() - start_time))

    # Remove Stop Words
    data_words_nostops = remove_stopwords(list_sentences_tokenized)
    data_words_nostops[:1]

    # Form Bigrams
    # data_words_bigrams = make_bigrams(data_words_nostops)
    data_words_bigrams = [bigram_mod[doc] for doc in data_words_nostops]
    data_words_bigrams[:1]

    start_time = time.time()

    nlp = spacy.load('en', disable=['parser', 'ner'])

    # # Do lemmatization keeping only noun, adj, vb, adv
    data_lemmatized = lemmatization(data_words_bigrams, allowed_postags=['NOUN', 'ADJ', 'VERB', 'ADV'])

    print(data_lemmatized[:1])
    print("--- %s seconds ---" % (time.time() - start_time))

    
    list_sentences_lemetised = []
    for i in range(len(data_lemmatized)):
        lem_sen = TreebankWordDetokenizer().detokenize(data_lemmatized[i])
        list_sentences_lemetised.append(lem_sen)

    # print("list_sentences_lemetised", list_sentences_lemetised)

    # Create Dictionary
    id2word = corpora.Dictionary(data_lemmatized)

    # Create Corpus
    texts = data_lemmatized

    # Term Document Frequency
    corpus = [id2word.doc2bow(text) for text in texts]

    # View
    print(corpus[:1])

    # Build LDA model
    lda_model = gensim.models.ldamodel.LdaModel(corpus=corpus,
                                            id2word=id2word,
                                            num_topics=3, 
                                            random_state=100,
                                            update_every=1,
                                            chunksize=100,
                                            passes=10,
                                            alpha='auto',
                                            per_word_topics=True)

    # Print the Keyword in the 10 topics
    pprint(lda_model.print_topics())
    doc_lda = lda_model[corpus]

    mallet_path = 'mallet-2.0.8/bin/mallet' # update this path

    ldamallet = LdaMallet(mallet_path, corpus=corpus, num_topics=5, id2word=id2word)
    # ldamallet = LdaMallet(path_to_mallet_binary, corpus=common_corpus, num_topics=20, id2word=common_dictionary)

    # Show Topics
    pprint(ldamallet.show_topics(formatted=False))

    # Compute Coherence Score
    coherence_model_ldamallet = CoherenceModel(model=ldamallet, texts=data_lemmatized, dictionary=id2word, coherence='c_v')
    coherence_ldamallet = coherence_model_ldamallet.get_coherence()
    print('\nCoherence Score: ', coherence_ldamallet)
    # 0- quality of cooking, 1-good appliance, 2-functionalities 3-product design, 5-how likely to recommend

    df_topic_sents_keywords = format_topics_sentences(ldamallet, corpus, data_lemmatized)
    topics = df_topic_sents_keywords["Topic_Keywords"].unique().tolist()
    # Format
    df_dominant_topic = df_topic_sents_keywords.reset_index()
    df_dominant_topic.columns = ['Document_No', 'Dominant_Topic', 'Topic_Perc_Contrib', 'Keywords', 'Text']


    # Show
    # print(50*'*')
    # print(df_dominant_topic.head())
    # print(50*'*')

    # Prepare sentiment scores for all sentences from text blob
    texblog_senti_scores= []
    for sentence in list_sentences_lemetised:
        texblog_score = get_textBlob_score(sentence)
        texblog_senti_scores.append(texblog_score)

    df_full = df_title
    df_full['topics'] = df_dominant_topic['Dominant_Topic'].astype(float)
    df_full['sentiment_scores'] = np.resize(texblog_senti_scores,len(df_full))

    # print(50*'*')
    # print(df_full.tail(10))
    # print(50*'*')
    texblog_senti_scores
    sentiments_textblob = []
    for each in texblog_senti_scores:
        if(each >=0):
            a=1
        else:
            a=0
        sentiments_textblob.append(a)
    sentiments_three_textblob = []

    polarity_pos_neg_neu = get_donut_sentiment_counts(texblog_senti_scores)
    df_full['polarity three'] = np.resize(polarity_pos_neg_neu,len(df_full))

    donut_sentiment_counts = polarity_pos_neg_neu[0].value_counts()
    donut_sentiment_counts_dict = []
    for index, value in donut_sentiment_counts.items():
        temp_dict = {}
        temp_dict['polarity'] = index
        temp_dict['reviewCount'] = value
        donut_sentiment_counts_dict.append(temp_dict)

    df_full['sentiment'] = np.resize(sentiments_textblob,len(df_full))
    topic_wise_sentiment_counts = df_full.groupby(['topics'])['sentiment'].value_counts()
    topic_wise_sentiment_sum = df_full.groupby(['topics'])['sentiment'].sum()
    total_sentiment = df_full.groupby(['topics'])['sentiment'].count()


    topic_wise_sentiment_counts
    results = []
    ratings= []

    for i in range(5):
        value = (topic_wise_sentiment_counts[i][1])/(total_sentiment.loc[i])
        results.append(value)
        if (value >1):
            ratings.append(5)
        elif (value >0.9):
            ratings.append(4)
        elif (value >0.8):
            ratings.append(3)
        elif (value >0.5):
            ratings.append(2)
        else: ratings.append(1)

    print("ratings----------------------------------------")
    print(ratings)
    print(topics)
    topicWiseRatings = []
    for i in range(len(topics)):
        temp_dict = {}
        temp_dict['topic'] = topics[i]
        temp_dict['rating'] = ratings[i]
        topicWiseRatings.append(temp_dict) 
    # topicWiseRatings = dict(zip(topics, ratings))
    # print(50*'*')
    # print(topicWiseRatings)
    # print(50*'*')
    Most_positive_sentences = df_full.nlargest(5, 'sentiment_scores')['text']
    for i in range(len(Most_positive_sentences.index)):
        print(i,") ",df_full.iloc[Most_positive_sentences.index[i]]['text'])
    print("Most_positive_sentences --------------------------", Most_positive_sentences)

    Most_negative_sentences = df_full.nsmallest(5, 'sentiment_scores')['text']
    for i in range(len(Most_negative_sentences.index)):
        print(i,") ",df_full.iloc[Most_negative_sentences.index[i]]['text'])
    print("Most_negative_sentences --------------------------", Most_negative_sentences)

    # PYMONGO CONNECTION
    client = PyMongo(app,uri = config_data['mongodb_config'], tlsCAFile=certifi.where())
    db = client.db
    print(db)
    # db = client
    # Most_negative_sentences_list = Most_negative_sentences.tolist()
    state = ''
    review_data = {"brand": brand.lower(),
    "requestId": "3",
    "source" : source,
    "timeStamp" : str(date.today()),
    "negativeSentences": Most_negative_sentences.tolist(),
    "positiveSentences": Most_positive_sentences.tolist(),
    "topicWiseRatings": topicWiseRatings,
    "donutSentimentCounts": donut_sentiment_counts_dict
    }
    if("yelp" == source):
            review_data['state'] = location
            review_data['choroplethData'] = get_yelp_choropleth_map(df_title)

    if("reddit" == source):
        review_data['LineGraphDataPolarityDates'] = get_line_graph_polarity_dates_reddit(df_full)

    mongo_data = copy.deepcopy(review_data)
    insert_id = 0
    try:
        dbresRemove = db.twitterreviews.remove({"source": source})
        dbres = db.twitterreviews.insert_one(review_data)
        insert_id = dbres.inserted_id
        # for attr in dir(dbres):
        #     print("attr", attr)
    except Exception as ex:
        print(ex)
    print("insert_id ---------------------------", insert_id)
    return mongo_data, insert_id

def get_yelp_choropleth_map(yelp_df):
    client = PyMongo(app,uri = config_data['mongodb_config'], tlsCAFile=certifi.where())
    db = client.db
    choropleth_data = yelp_df['state'].value_counts()
    choropleth_data_dict = []
    for index, value in choropleth_data.items():
        temp_dict = {}
        temp_dict['country'] = STATES_ABBREVIATION_MAP[index]
        temp_dict['reviewCount'] = value
        choropleth_data_dict.append(temp_dict)
    return choropleth_data_dict

def getReditData(res1):
    df_title = pd.DataFrame()
    for post in res1['data']['children']:
        df_title = df_title.append({
            # 'subeddit':post['data']['subreddit'],
            'text':post['data']['title'],
            # 'selftext':post['data']['selftext'],
            # 'upvote_ratio':post['data']['upvote_ratio'],
            # 'ups':post['data']['ups'],
            # 'downs':post['data']['downs'],
            # 'num_comments':post['data']['num_comments'],
            'created_utc':post['data']['created_utc'], #Check the date
            # 'subreddit_subscribers':post['data']['subreddit_subscribers'], 
        }, ignore_index = True)
    return df_title

def getYelpData(result):
    headers = {
        'Authorization' : 'bearer '+ config_data['yelp']['token']
    }
    df_ids = pd.DataFrame()
    df_reviews = pd.DataFrame()
    for post in result['businesses']:
        df_ids = df_ids.append({
            'id':post['id'],
            'state':post['location']['state']
        },ignore_index=True)
    # print(df_ids['id'].shape[0])
    for id_val in range(df_ids['id'].shape[0]):
        print(df_ids['id'][id_val])
        print(df_ids['state'][id_val])
        idval = df_ids['id'][id_val]
        time.sleep(1)
        url = 'https://api.yelp.com/v3/businesses/'+idval+'/reviews'
        result = requests.get(url,headers=headers)
        for post in result.json()['reviews']:
            df_reviews = df_reviews.append({
                'text':post['text'],
                'state': df_ids['state'][id_val]
            },ignore_index=True)
    return df_reviews
    
def getTwitterData(results):
    df_tweet = pd.DataFrame()
    for post in results['data']:
        df_tweet = df_tweet.append({
            'text':post['text'], 
        }, ignore_index = True)
    print(df_tweet.head())
    return df_tweet

@app.route('/get_processed_data/')
def get_processed_data():
    params = {
        'brand' : request.args.get('brand'),
        'location' : request.args.get('location')
    }
    # data_reddit = requests.get("http://127.0.0.1:5000/getreviews_reddit?brand=" + params["brand"] + "&limitval=36")
    data_reddit = get_reddit_reviews(params)
    reddit_df = getReditData(data_reddit)

    # data_yelp = requests.get("http://127.0.0.1:5000/getreviews_yelp?brand=" + params["brand"] + "&location=" + params["location"])
    data_yelp = get_reviews_yelp(params)
    yelp_df = getYelpData(data_yelp)
 
    # data_twitter = requests.get("http://127.0.0.1:5000/getreviews_twitter?brand=" + params["brand"] + "&tweet.fields=author_id&max_results=10")
    data_twitter = get_reviews_twitter(params['brand'])
    twitter_df = getTwitterData(data_twitter)

    frames = [reddit_df, yelp_df, twitter_df]
    combined_data_df = pd.concat(frames)

    inserted_mongo_doc, inserted_id = processing(combined_data_df, "all", params['brand'], '')

    return {"message":"success sent to database",
    # "data" :inserted_mongo_doc
    }

@app.route('/get_processed_data_twitter/')
def get_processed_data_twitter():
    params = {
        'brand' : request.args.get('brand'),
        # 'location' : request.args.get('location')
    }
    # data_twitter = requests.get("http://127.0.0.1:5000/getreviews_twitter?query=" + params["brand"] + "&tweet.fields=author_id&max_results=10")
    data_twitter = get_reviews_twitter(params['brand'])
    twitter_df = getTwitterData(data_twitter)
    inserted_mongo_doc, inserted_id = processing(twitter_df, "twitter", params['brand'], '')
    return {"message":"Twitter proccesing completed. Successly sent to database",
    # "data" : inserted_mongo_doc
    }

@app.route('/get_processed_data_yelp/')
def get_processed_data_yelp():
    params = {
        'brand' : request.args.get('brand'),
        'location' : request.args.get('location')
    }
    # data_yelp = requests.get('http://127.0.0.1:5000/getreviews_yelp?brand='+params['brand']+'&location='+params['location'])

    data_yelp = get_reviews_yelp(params)
    
    locations = ['arizona', 'california', 'newyork', 'chicago', 'texas', 'virginia']
    frames = []
    if('unitedstates' == params['location']):
        for state in locations:
            params['location'] = state
            data_yelp = get_reviews_yelp(params)
            frames.append(getYelpData(data_yelp))
        yelp_df = pd.concat(frames) 
    else:
        data_yelp = get_reviews_yelp(params)
        yelp_df = getYelpData(data_yelp)
    inserted_mongo_doc, inserted_id = processing(yelp_df, "yelp", params['brand'], params['location'])
    return {"message":"Yelp proccesing completed. Successly sent to database",
    # "data": inserted_mongo_doc
    }

@app.route('/get_processed_data_reddit/')
def get_processed_data_reddit():
    params = {
        'brand' : request.args.get('brand')
        # 'location' : request.args.get('location')
    }
    # data_reddit = requests.get("http://127.0.0.1:5000/getreviews_reddit?limitval=36")
    data_reddit = get_reddit_reviews(params)
    reddit_df = getReditData(data_reddit)
    inserted_mongo_doc, inserted_id = processing(reddit_df, "reddit", params['brand'], '')
    result = {"message":"Reddit proccesing completed. Successly sent to database",
    # "data" : inserted_mongo_doc
    }
    return result

# @app.route('/getreviews_reddit/')
def get_reddit_reviews(params):
    limitval =  '50'
    res = requests.post('https://www.reddit.com/api/v1/access_token', auth=auth, data=data, headers=head)
    TOKEN = 'bearer ' + res.json()['access_token']
    headers = {'Authorization': TOKEN,'User-Agent': 'MyAPI/0.0.1' }
    res1 = requests.get("https://oauth.reddit.com/r/"+ params['brand'] +"/hot?limit=" + limitval, headers=headers)
    return res1.json()
    # # PYMONGO CONNECTION
    # client = PyMongo(app,uri = config_data['mongodb_config'], tlsCAFile=certifi.where())
    # db = client.db
    # print(db)
    # # db = client
    # review_data = {"name":"Thanmai","review":"Starbucks is amazing"}
    # try:
    #     dbres = db.twitterreviews.insert_one(review_data)
    #     for attr in dir(dbres):
    #         print(attr)
    # except Exception as ex:
    #     print(ex)
    # return {"data":"success sent to database"} 


@app.route('/getreviews_yelp/')
def get_reviews_yelp(params):
# def get_reviews_yelp():
    # params = {
    #     'brand' : request.args.get('brand'),
    #     'location' : request.args.get('location')
    # }
    headers = {
        'Authorization' : 'bearer '+ config_data['yelp']['token']
    }
    # params = {
    #     'brand' : request.args.get('brand'),
    #     'location' : request.args.get('location')
    # }
    url = "https://api.yelp.com/v3/businesses/search?brand=" + params['brand'] + "&location=" + params['location']
    print(url)
    result = requests.get(url,headers=headers)
    return result.json()
    

# @app.route('/getreviews_twitter/')
def get_reviews_twitter(brand):
    headers = {
      "User-Agent": config_data['twitter']['user_agent'],
      "authorization": 'Bearer '+config_data['twitter']['token']
    }
    params = {
    "query": brand,
    "tweet.fields": "geo",
    "max_results": 100,
    }
    results = requests.get('https://api.twitter.com/2/tweets/search/recent',params,headers=headers)
    return results.json()

if __name__ == "__main__":
    app.run(debug=True)

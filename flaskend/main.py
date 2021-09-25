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
    return(sent_topics_df)

# Get the polarity score using below function
def get_textBlob_score(sent):
    # This polarity score is between -1 to 1
    polarity = TextBlob(sent).sentiment.polarity
    return polarity

def processing(df_title):
    print("df_title in processing")
    print(df_title.head())
    df_title.title[df_title.title.str.match(pat = '(https)|(http)|(www.)',na = False)]
    de_emotext = []
    for text in df_title.title:
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
    # Format
    df_dominant_topic = df_topic_sents_keywords.reset_index()
    df_dominant_topic.columns = ['Document_No', 'Dominant_Topic', 'Topic_Perc_Contrib', 'Keywords', 'Text']


    # Show
    print(50*'*')
    print(df_dominant_topic.head())
    print(50*'*')

    # Prepare sentiment scores for all sentences from text blob
    texblog_senti_scores= []
    for sentence in list_sentences_lemetised:
        texblog_score = get_textBlob_score(sentence)
        texblog_senti_scores.append(texblog_score)

    df_full = df_title
    df_full['topics'] = df_dominant_topic['Dominant_Topic'].astype(float)
    df_full['sentiment_scores'] = np.resize(texblog_senti_scores,len(df_full))

    print(50*'*')
    print(df_full.tail(10))
    print(50*'*')
    texblog_senti_scores
    sentiments_textblob = []
    for each in texblog_senti_scores:
        if(each >=0):
            a=1
        else:
            a=0
        sentiments_textblob.append(a)
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
    
    Most_positive_sentences = df_full.nlargest(5, 'sentiment_scores')['title']
    for i in range(len(Most_positive_sentences.index)):
        print(i,") ",df_full.iloc[Most_positive_sentences.index[i]]['title'])
    print("Most_positive_sentences --------------------------", Most_positive_sentences)

    Most_negative_sentences = df_full.nsmallest(5, 'sentiment_scores')['title']
    for i in range(len(Most_negative_sentences.index)):
        print(i,") ",df_full.iloc[Most_negative_sentences.index[i]]['title'])
    print("Most_negative_sentences --------------------------", Most_negative_sentences)

def getReditData(res1):
    df_title = pd.DataFrame()
    for post in res1.json()['data']['children']:
        df_title = df_title.append({
            # 'subeddit':post['data']['subreddit'],
            'title':post['data']['title'],
            # 'selftext':post['data']['selftext'],
            # 'upvote_ratio':post['data']['upvote_ratio'],
            # 'ups':post['data']['ups'],
            # 'downs':post['data']['downs'],
            # 'num_comments':post['data']['num_comments'],
            # 'created_utc':post['data']['created_utc'], #Check the date
            # 'subreddit_subscribers':post['data']['subreddit_subscribers'], 
        }, ignore_index = True)
    return df_title

def getYelpData(result):
    headers = {
        'Authorization' : 'bearer '+ config_data['yelp']['token']
    }
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
    return df_reviews
    

def getTwitterData(results):
    df_tweet = pd.DataFrame()
    for post in results.json()['data']:
        df_tweet = df_tweet.append({
            'test':post['text'], 
        }, ignore_index = True)
    print(df_tweet.head())
    return df_tweet

@app.route('/get_processed_data/')
def get_processed_data():
    data_reddit = requests.get("http://127.0.0.1:5000/getreviews_reddit?limitval=36")
    reddit_df = getReditData(data_reddit)

    data_yelp = requests.get("http://127.0.0.1:5000/getreviews_yelp?term=Starbucks&location=arizona")
    yelp_df = getYelpData(data_yelp)
 
    data_twitter = requests.get("http://127.0.0.1:5000/getreviews_twitter?query=Starbucks&tweet.fields=author_id&max_results=10")
    twitter_df = getTwitterData(data_twitter)

    frames = [df1, df2, df3]
    result = pd.concat(frames)

    return data_twitter.json()

@app.route('/getreviews_reddit/')
def get_redditreviews():
    res = requests.post('https://www.reddit.com/api/v1/access_token', auth=auth, data=data, headers=head)
    TOKEN = 'bearer ' + res.json()['access_token']
    headers = {'Authorization': TOKEN,'User-Agent': 'MyAPI/0.0.1' }
    res1 = requests.get('https://oauth.reddit.com/r/starbucks/hot?limit='+request.args.get('limitval'), headers=headers)
    return res1.json()
     

# # PYMONGO CONNECTION
#     client = PyMongo(app,uri = config_data['mongodb_config'])
#     db = client.db
#     print(db)
#     # db = client
#     review_data = {"name":"Prasanna","review":"Starbucks is amazing"}
#     try:
#         dbres = db.twitterreviews.insert_one(review_data)
#         for attr in dir(dbres):
#             print(attr)
#     except Exception as ex:
#         print(ex)
#     return {"data":"success sent to database"} 

    


@app.route('/getreviews_yelp/')
def getreviews_yelp():
    headers = {
        'Authorization' : 'bearer '+ config_data['yelp']['token']
    }
    params = {
        'term' : request.args.get('term'),
        'location' : request.args.get('location')
    }
    # print(request.args.get('term'))
    # print(request.args.get('location'))
    url = 'https://api.yelp.com/v3/businesses/search?term='+params['term']+'&location='+params['location']
    print(url)
    result = requests.get(url,headers=headers)
    return result.json()
    

@app.route('/getreviews_twitter/')
def getreviews_twitter():
    # print(request.args.get("query"))
    # print(request.args.get("tweet.fields"))
    # print(request.args.get("max_results"))
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
    return results.json()

if __name__ == "__main__":
    app.run(debug=True)
